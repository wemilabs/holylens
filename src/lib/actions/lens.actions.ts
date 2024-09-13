'use server';

import Lens, { ILens } from '@/lib/database/models/lens.model';
import connectToDatabase from '@/lib/database/mongoose';
import { handleError, parseJsonData } from '@/lib/utils';
import { getUsers } from './user.actions';

export async function getLenses(): Promise<ILens[] | undefined> {
	try {
		await connectToDatabase();
		await getUsers();

		const lenses = await Lens.find({})
			.populate('author')
			.sort({ createdAt: -1 })
			.lean()
			.exec();
		if (lenses.length === 0)
			throw new Error('No lenses found. Please create a lens first.');

		return parseJsonData(lenses) as ILens[];
	} catch (error: any) {
		console.error('Error fetching lenses:', error);
		handleError(error);
		return undefined;
	}
}

export async function getLensById(id: string): Promise<ILens | undefined> {
	try {
		await connectToDatabase();
		const lens = await Lens.findById(id).populate('author').lean().exec();
		if (!lens) throw new Error('Lens not found');

		return parseJsonData(lens) as ILens;
	} catch (error) {
		console.error('Error getting lens by id:', error);
		handleError(error);
		return undefined;
	}
}
