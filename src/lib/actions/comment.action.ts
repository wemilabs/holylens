'use server';

import Comment from '@/lib/database/models/comment.model';
import Lens from '@/lib/database/models/lens.model';
import User from '@/lib/database/models/user.model';
import connectToDatabase from '@/lib/database/mongoose';
import jwt from 'jsonwebtoken';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

const verifyToken = (token: string) => {
	try {
		return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
	} catch (error) {
		return null;
	}
};

export async function getComments(lensId: string) {
	await connectToDatabase();
	try {
		const comments = await Comment.find({ article: lensId })
			.populate('author', 'name')
			.sort({ createdAt: -1 })
			.lean()
			.exec();
		if (comments.length === 0)
			throw new Error('No comments found. Please create a comment first.');

		return JSON.parse(JSON.stringify(comments));
	} catch (error: any) {
		console.error('Error fetching comments:', error);
		return { success: false, error: (error as Error).message };
	}
}

export async function createComment(lensId: string, content: string) {
	const headersList = await headers();
	const token = headersList.get('Authorization')?.split(' ')[1];

	if (!token) throw new Error('Unauthorized');

	const decodedToken = verifyToken(token);
	if (!decodedToken) {
		throw new Error('Invalid token');
	}

	await connectToDatabase();

	try {
		// Verify that the user exists
		const user = await User.findById(decodedToken.userId);
		if (!user) {
			throw new Error('User not found');
		}

		const comment = new Comment({
			content,
			author: decodedToken.userId,
			article: lensId,
		});

		await comment.save();

		await Lens.findByIdAndUpdate(lensId, {
			$push: { comments: comment._id },
		});

		// Update the user's comments (we can track comments made by users)
		await User.findByIdAndUpdate(user._id, {
			$push: { comments: comment._id },
		});

		const populatedComment = await Comment.findById(comment._id)
			.populate('author', 'name')
			.lean();

		revalidatePath(`/lenses/${lensId}`);
		return JSON.parse(JSON.stringify(populatedComment));
	} catch (error) {
		console.error('Error creating comment:', error);
		throw new Error('Failed to create comment');
	}
}
