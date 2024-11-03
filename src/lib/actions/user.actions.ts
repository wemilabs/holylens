'use server';

import User from '@/lib/database/models/user.model';
import connectToDatabase from '@/lib/database/mongoose';

export async function getUsers() {
	await connectToDatabase();

	try {
		const users = await User.find({}).sort({ createdAt: -1 }).lean().exec();
		if (users.length === 0)
			throw new Error('No users found. Please create a user first.');

		return JSON.parse(JSON.stringify(users));
	} catch (error: any) {
		console.error('Error fetching users:', error);
		return { success: false, error: (error as Error).message };
	}
}
