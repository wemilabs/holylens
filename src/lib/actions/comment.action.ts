'use server';

import Comment from '@/lib/database/models/comment.model';
import Lens from '@/lib/database/models/lens.model';
import User from '@/lib/database/models/user.model';
import connectToDatabase from '@/lib/database/mongoose';
import jwt from 'jsonwebtoken';
// import { expirePath } from 'next/cache';

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
			.populate('author', 'name avatar')
			.populate('likes', 'name')
			.populate('replies.author', 'name')
			.sort({ createdAt: -1 })
			.lean();

		return JSON.parse(JSON.stringify(comments));
	} catch (error: any) {
		console.error('Error fetching comments:', error);
		return [];
	}
}

export async function createComment(
	lensId: string,
	content: string,
	token: string | null
) {
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

		// expirePath(`/lenses/${lensId}`);
		return JSON.parse(JSON.stringify(populatedComment));
	} catch (error) {
		console.error('Error creating comment:', error);
		throw new Error('Failed to create comment');
	}
}

export async function likeComment(commentId: string, token: string | null) {
	if (!token) throw new Error('Unauthorized');

	const decodedToken = verifyToken(token);
	if (!decodedToken) {
		throw new Error('Invalid token');
	}

	await connectToDatabase();

	try {
		const comment = await Comment.findById(commentId);
		if (!comment) {
			throw new Error('Comment not found');
		}

		const userIndex = comment.likes.indexOf(decodedToken.userId);
		if (userIndex > -1) {
			comment.likes.splice(userIndex, 1);
		} else {
			comment.likes.push(decodedToken.userId);
		}

		await comment.save();

		const updatedComment = await Comment.findById(commentId)
			.populate('author', 'name')
			.populate('likes', 'name')
			.populate('replies.author', 'name')
			.lean();

		// expirePath(`/lenses/${comment.article}`);
		return JSON.parse(JSON.stringify(updatedComment));
	} catch (error) {
		console.error('Error liking comment:', error);
		throw new Error('Failed to like comment');
	}
}

export async function replyToComment(
	commentId: string,
	content: string,
	token: string | null
) {
	if (!token) throw new Error('Unauthorized');

	const decodedToken = verifyToken(token);
	if (!decodedToken) {
		throw new Error('Invalid token');
	}

	await connectToDatabase();

	try {
		const comment = await Comment.findById(commentId);
		if (!comment) {
			throw new Error('Comment not found');
		}

		comment.replies.push({
			content,
			author: decodedToken.userId,
		});

		await comment.save();

		const updatedComment = await Comment.findById(commentId)
			.populate('author', 'name')
			.populate('likes', 'name')
			.populate('replies.author', 'name')
			.lean();

		// expirePath(`/lenses/${comment.article}`);
		return JSON.parse(JSON.stringify(updatedComment));
	} catch (error) {
		console.error('Error replying to comment:', error);
		throw new Error('Failed to reply to comment');
	}
}

export async function updateComment(
	commentId: string,
	content: string,
	token: string | null
) {
	if (!token) throw new Error('Unauthorized');

	const decodedToken = verifyToken(token);
	if (!decodedToken) {
		throw new Error('Invalid token');
	}

	await connectToDatabase();

	try {
		const comment = await Comment.findById(commentId);
		if (!comment) {
			throw new Error('Comment not found');
		}

		// Check if the user is the author of the comment
		if (comment.author.toString() !== decodedToken.userId) {
			throw new Error('You are not authorized to edit this comment');
		}

		comment.content = content;
		await comment.save();

		const updatedComment = await Comment.findById(commentId)
			.populate('author', 'name')
			.populate('likes', 'name')
			.populate('replies.author', 'name')
			.lean();

		// expirePath(`/lenses/${comment.article}`);
		return JSON.parse(JSON.stringify(updatedComment));
	} catch (error) {
		console.error('Error updating comment:', error);
		throw new Error('Failed to update comment');
	}
}

export async function updateReply(
	commentId: string,
	replyId: string,
	content: string,
	token: string | null
) {
	if (!token) throw new Error('Unauthorized');

	const decodedToken = verifyToken(token);
	if (!decodedToken) {
		throw new Error('Invalid token');
	}

	await connectToDatabase();

	try {
		const comment = await Comment.findById(commentId);
		if (!comment) {
			throw new Error('Comment not found');
		}

		const reply = comment.replies.id(replyId);
		if (!reply) {
			throw new Error('Reply not found');
		}

		if (reply.author.toString() !== decodedToken.userId) {
			throw new Error('You are not authorized to edit this reply');
		}

		reply.content = content;
		await comment.save();

		const updatedComment = await Comment.findById(commentId)
			.populate('author', 'name')
			.populate('likes', 'name')
			.populate('replies.author', 'name')
			.lean();

		// expirePath(`/lenses/${comment.article}`);
		return JSON.parse(JSON.stringify(updatedComment));
	} catch (error) {
		console.error('Error updating reply:', error);
		throw new Error('Failed to update reply');
	}
}

export async function deleteComment(commentId: string, token: string | null) {
	if (!token) throw new Error('Unauthorized');

	const decodedToken = verifyToken(token);
	if (!decodedToken) {
		throw new Error('Invalid token');
	}

	await connectToDatabase();

	try {
		const comment = await Comment.findById(commentId);
		if (!comment) {
			throw new Error('Comment not found');
		}

		if (comment.author.toString() !== decodedToken.userId) {
			throw new Error('You are not authorized to delete this comment');
		}

		await Comment.findByIdAndDelete(commentId);

		await Lens.findByIdAndUpdate(comment.article, {
			$pull: { comments: commentId },
		});

		await User.findByIdAndUpdate(decodedToken.userId, {
			$pull: { comments: commentId },
		});

		// expirePath(`/lenses/${comment.article}`);
		return { success: true, message: 'Comment deleted successfully' };
	} catch (error) {
		console.error('Error deleting comment:', error);
		throw new Error('Failed to delete comment');
	}
}

export async function deleteReply(
	commentId: string,
	replyId: string,
	token: string | null
) {
	if (!token) throw new Error('Unauthorized');

	const decodedToken = verifyToken(token);
	if (!decodedToken) {
		throw new Error('Invalid token');
	}

	await connectToDatabase();

	try {
		const comment = await Comment.findById(commentId);
		if (!comment) {
			throw new Error('Comment not found');
		}

		const reply = comment.replies.id(replyId);
		if (!reply) {
			throw new Error('Reply not found');
		}

		if (reply.author.toString() !== decodedToken.userId) {
			throw new Error('You are not authorized to delete this reply');
		}

		comment.replies.pull({ _id: replyId });
		await comment.save();

		const updatedComment = await Comment.findById(commentId)
			.populate('author', 'name')
			.populate('likes', 'name')
			.populate('replies.author', 'name')
			.lean();

		// expirePath(`/lenses/${comment.article}`);
		return JSON.parse(JSON.stringify(updatedComment));
	} catch (error) {
		console.error('Error deleting reply:', error);
		throw new Error('Failed to delete reply');
	}
}
