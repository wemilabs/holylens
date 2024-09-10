'use server';

import Users from '@/lib/database/models/users.model';
import connectToDatabase from '@/lib/database/mongoose';

export async function getUsers() {
	try {
		await connectToDatabase();
		const users = await Users.find({}).sort({ createdAt: -1 }).lean().exec();
		if (users.length === 0) {
			return { success: false, message: 'No users found' };
		}
		return { success: true, data: users };
	} catch (error: any) {
		console.error('Error fetching users:', error);
		return { success: false, error: (error as Error).message };
	}
}
