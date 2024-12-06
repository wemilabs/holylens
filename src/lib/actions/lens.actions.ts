'use server';

import Lens from '@/lib/database/models/lens.model';
import User from '@/lib/database/models/user.model';
import connectToDatabase from '@/lib/database/mongoose';
import jwt from 'jsonwebtoken';

const verifyToken = (token: string) => {
	try {
		return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
	} catch (error) {
		return null;
	}
};

// Get all categories
export async function getCategories() {
	await connectToDatabase();
	try {
		const categories = await Lens.distinct('tags');
		return categories;
	} catch (error) {
		console.error('Error fetching categories:', error);
		throw new Error('Failed to fetch categories');
	}
}

// Get all lenses
export async function getLenses(
	selectedCategories: string[] = [],
	page: number = 1,
	limit: number = 3,
	searchTerm: string = ''
) {
	await connectToDatabase();

	try {
		let query: any = { isPublished: true };
		if (selectedCategories.length > 0) {
			query.tags = { $in: selectedCategories };
		}
		if (searchTerm) {
			query.$or = [
				{ title: { $regex: searchTerm, $options: 'i' } },
				{ content: { $regex: searchTerm, $options: 'i' } },
				{ tags: { $in: searchTerm.split(',') } },
			];
		}

		const skip = (page - 1) * limit;

		const lenses = await Lens.find(query)
			.sort({ publishedDate: -1 })
			.skip(skip)
			.limit(limit)
			.populate('author', 'name')
			.populate({
				path: 'comments',
				populate: {
					path: 'replies',
					model: 'Comment',
				},
			})
			.select(
				'title description content slug author publishedDate tags coverImage_url readTime likes favorites_count views_count isPublished'
			)
			.lean();

		const totalLenses = await Lens.countDocuments(query);

		return {
			lenses: JSON.parse(JSON.stringify(lenses)),
			totalPages: Math.ceil(totalLenses / limit),
			currentPage: page,
		};
	} catch (error) {
		console.error('Error fetching lenses:', error);
		throw new Error('Failed to fetch lenses');
	}
}

// Get a specific lens by ID
export async function getLensBySlug(slug: string) {
	await connectToDatabase();

	try {
		const lens = await Lens.findOne({ slug })
			.populate('author', 'name')
			.populate('comments')
			.select(
				'title description content slug author publishedDate tags coverImage_url readTime likes favorites_count views_count isPublished'
			)
			.lean();

		if (!lens) return null;
		// revalidatePath(`/lenses/${id}`);
		return JSON.parse(JSON.stringify(lens));
	} catch (error) {
		console.error('Error fetching lens:', error);
		return null;
	}
}

export async function likeOrDislikeLens(lensId: string, token: string | null) {
	if (!token) throw new Error('Unauthorized');

	const decodedToken = verifyToken(token);
	if (!decodedToken) {
		throw new Error('Invalid token');
	}

	await connectToDatabase();

	try {
		const lens = await Lens.findById(lensId);
		if (!lens) {
			throw new Error('Lens not found');
		}

		const userIndex = lens.likes.indexOf(decodedToken.userId);
		if (userIndex > -1) {
			lens.likes.splice(userIndex, 1);
		} else {
			lens.likes.push(decodedToken.userId);
		}

		await lens.save();

		const updatedLens = await Lens.findById(lensId)
			.populate('author', 'name')
			.populate('comments')
			.select(
				'title description content slug author publishedDate tags coverImage_url readTime likes favorites_count views_count isPublished'
			)
			.lean();

		return JSON.parse(JSON.stringify(updatedLens));
	} catch (error) {
		console.error('Error liking lens:', error);
		throw new Error('Failed to like lens');
	}
}

export async function bookmarkLens(lensId: string, token: string | null) {
	if (!token) throw new Error('Unauthorized');

	const decodedToken = verifyToken(token);
	if (!decodedToken) {
		throw new Error('Invalid token');
	}

	await connectToDatabase();

	try {
		const lens = await Lens.findById(lensId);
		if (!lens) {
			throw new Error('Lens not found');
		}

		const userIndex = lens.bookmarks.indexOf(decodedToken.userId);
		if (userIndex > -1) {
			lens.bookmarks.splice(userIndex, 1);
		} else {
			lens.bookmarks.push(decodedToken.userId);
		}

		await lens.save();

		const updatedLens = await Lens.findById(lensId)
			.populate('author', 'name')
			.populate('comments')
			.select(
				'title description content slug author publishedDate tags coverImage_url readTime likes favorites_count views_count isPublished'
			)
			.lean();

		return JSON.parse(JSON.stringify(updatedLens));
	} catch (error) {
		console.error('Error bookmarking lens:', error);
		throw new Error('Failed to bookmark lens');
	}
}
