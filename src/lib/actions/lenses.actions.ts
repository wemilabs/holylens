'use server';

import Lenses from '@/lib/database/models/lenses.model';
import connectToDatabase from '@/lib/database/mongoose';
import { handleError } from '@/lib/utils';
import { getUsers } from './users.actions';

export async function getLenses(): Promise<Lens[] | undefined> {
	try {
		await connectToDatabase();
		await getUsers();

		const lenses = await Lenses.find({})
			.populate('author')
			.sort({ createdAt: -1 })
			.lean()
			.exec();
		if (lenses.length === 0)
			throw new Error('No lenses found. Please create a lens first.');

		return JSON.parse(JSON.stringify(lenses));
	} catch (error: any) {
		console.error('Error fetching lenses:', error);
		handleError(error);
		return undefined;
	}
}

export async function getLensById(id: string): Promise<Lens | undefined> {
	try {
		await connectToDatabase();
		const lens = await Lenses.findById(id).populate('author').lean().exec();
		if (!lens) throw new Error('Lens not found');

		return JSON.parse(JSON.stringify(lens));
	} catch (error) {
		console.error('Error getting lens by id:', error);
		handleError(error);
		return undefined;
	}
}
