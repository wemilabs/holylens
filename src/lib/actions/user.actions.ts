'use server';

import User, { IUser } from '@/lib/database/models/user.model';
import connectToDatabase from '@/lib/database/mongoose';
import { parseJsonData } from '@/lib/utils';

export async function getUsers() {
	try {
		await connectToDatabase();
		const users = await User.find({}).sort({ createdAt: -1 }).lean().exec();
		if (users.length === 0)
			throw new Error('No users found. Please create a user first.');

		return parseJsonData(users) as IUser[];
	} catch (error: any) {
		console.error('Error fetching users:', error);
		return { success: false, error: (error as Error).message };
	}
}
