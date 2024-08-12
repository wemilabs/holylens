'use server';

import dbConnect from '@/lib/dbConnect';
import Lenses from '@/models/lenses.model';
import { getUsers } from './users.actions';

export async function getLenses() {
	await dbConnect();
	await getUsers();

	try {
		const lenses = await Lenses.find({})
			.populate('author')
			.sort({ createdAt: -1 })
			.lean()
			.exec();
		if (lenses.length === 0) {
			return { success: false, message: 'No lenses found' };
		}
		return { success: true, data: lenses };
	} catch (error: any) {
		console.error('Error fetching lenses:', error);
		return { success: false, error: (error as Error).message };
	}
}
