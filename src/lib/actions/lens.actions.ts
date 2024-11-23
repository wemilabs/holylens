'use server';

import Lens from '@/lib/database/models/lens.model';
import connectToDatabase from '@/lib/database/mongoose';
import { getUsers } from './user.actions';
import { revalidatePath } from 'next/cache';
import { handleError } from '../utils';

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
	await getUsers();

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
			.select(
				'title description content slug author publishedDate tags coverImage_url readTime likes_count comments_count favorites_count views_count isPublished'
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

// New function to handle revalidation
export async function revalidateLenses() {
	revalidatePath('/lenses');
}

// Get a specific lens by ID
export async function getLensBySlug(slug: string) {
	await connectToDatabase();

	try {
		const lens = await Lens.findOne({ slug })
			.populate('author', 'name')
			.select(
				'title description content slug author publishedDate tags coverImage_url readTime likes_count comments_count favorites_count views_count isPublished'
			)
			.lean();

		if (!lens) return null;
		// revalidatePath(`/lenses/${id}`);
		return JSON.parse(JSON.stringify(lens));
	} catch (error) {
		console.error('Error fetching lens:', error);
		handleError(error);
		return null;
	}
}

// New function to handle revalidation for a specific lens
export async function revalidateLensById(id: string) {
	revalidatePath(`/lenses/${id}`);
}
