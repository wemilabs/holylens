'use server';

import Lens from '@/lib/database/models/lens.model';
import connectToDatabase from '@/lib/database/mongoose';
// import { getUsers } from './user.actions';
import { revalidatePath } from 'next/cache';
import { handleError } from '../utils';

export async function getLenses(page: number = 1, limit: number = 10) {
	await connectToDatabase();
	// await getUsers();

	try {
		const skip = (page - 1) * limit;
		const lenses = await Lens.find({ isPublished: true })
			.sort({ publishedDate: -1 })
			.skip(skip)
			.limit(limit)
			.populate('author', 'name')
			.select(
				'title description content slug author publishedDate tags coverImage_url readTime'
			)
			.lean();

		revalidatePath('/lenses');
		return JSON.parse(JSON.stringify(lenses));
	} catch (error) {
		console.error('Error fetching lenses:', error);
		handleError(error);
		return [];
	}
}

export async function getCategories() {
	await connectToDatabase();

	try {
		const categories = await Lens.distinct('tags');
		return categories;
	} catch (error) {
		console.error('Error fetching categories:', error);
		handleError(error);
		return [];
	}
}

export async function getLensById(id: string) {
	await connectToDatabase();

	try {
		const lens = await Lens.findById(id)
			.populate('author', 'name')
			.select(
				'title description content slug author publishedDate tags coverImage_url readTime'
			)
			.lean();

		if (!lens) return null;
		revalidatePath(`/lenses/${id}`);
		return JSON.parse(JSON.stringify(lens));
	} catch (error) {
		console.error('Error fetching lens:', error);
		handleError(error);
		return null;
	}
}
