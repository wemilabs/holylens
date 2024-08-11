'use server';

import dbConnect from '@/lib/dbConnect';
import Users from '@/models/users.model';

export async function getUsers() {
	await dbConnect();

	try {
		const users = await Users.find({}).lean().exec();
		if (users.length === 0) {
			return { success: false, message: 'No users found' };
		}
		return { success: true, data: users };
	} catch (error: any) {
		console.error('Error fetching users:', error);
		return { success: false, error: (error as Error).message };
	}
}
