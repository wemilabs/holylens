'use client';

import {
	createComment,
	getComments,
	likeComment,
	replyToComment,
	updateComment,
	updateReply,
	deleteComment,
	deleteReply,
} from '@/lib/actions/comment.action';
import { useAuth } from '@/lib/hooks/useAuth.hook';
import { format } from 'date-fns';
import DOMPurify from 'isomorphic-dompurify';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { CommentForm } from './comment-form';
import { CommentList } from './comment-list';

interface LensContentProps {
	lens: Lens;
}

export function LensContent({ lens }: LensContentProps) {
	const [comments, setComments] = useState<LensComment[]>([]);
	const { user } = useAuth();

	const {
		_id: id,
		title,
		publishedDate,
		coverImage_url,
		content,
		tags,
		author: { name: authorName },
	} = lens;
	const sanitizedContent = DOMPurify.sanitize(content);

	useEffect(() => {
		fetchComments();
	}, []);

	const fetchComments = async () => {
		try {
			const fetchedComments = await getComments(id);
			setComments(fetchedComments || []);
		} catch (error) {
			console.error('Error fetching comments:', error);
			setComments([]);
		}
	};

	const handleCommentSubmit = async (content: string) => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				throw new Error('No authentication token found');
			}
			const newComment = await createComment(id, content, token);
			setComments(prevComments => [newComment, ...prevComments]);
		} catch (error) {
			console.error('Error submitting comment:', error);
		}
	};

	const handleLikeComment = async (commentId: string) => {
		try {
			const token = localStorage.getItem('token');
			if (!token) throw new Error('No authentication token found');
			const updatedComment = await likeComment(commentId, token);
			setComments(prevComments =>
				prevComments.map(comment =>
					comment._id === commentId ? updatedComment : comment
				)
			);
		} catch (error) {
			console.error('Error liking comment:', error);
		}
	};

	const handleReplyComment = async (commentId: string, content: string) => {
		try {
			const token = localStorage.getItem('token');
			if (!token) throw new Error('No authentication token found');
			const updatedComment = await replyToComment(commentId, content, token);
			setComments(prevComments =>
				prevComments.map(comment =>
					comment._id === commentId ? updatedComment : comment
				)
			);
		} catch (error) {
			console.error('Error replying to comment:', error);
		}
	};

	const handleEditComment = async (commentId: string, content: string) => {
		try {
			const token = localStorage.getItem('token');
			if (!token) throw new Error('No authentication token found');
			const updatedComment = await updateComment(commentId, content, token);
			setComments(prevComments =>
				prevComments.map(comment =>
					comment._id === commentId ? updatedComment : comment
				)
			);
		} catch (error) {
			console.error('Error editing comment:', error);
		}
	};

	const handleEditReply = async (
		commentId: string,
		replyId: string,
		content: string
	) => {
		try {
			const token = localStorage.getItem('token');
			if (!token) throw new Error('No authentication token found');
			const updatedComment = await updateReply(
				commentId,
				replyId,
				content,
				token
			);
			setComments(prevComments =>
				prevComments.map(comment =>
					comment._id === commentId ? updatedComment : comment
				)
			);
		} catch (error) {
			console.error('Error editing reply:', error);
		}
	};

	const handleDeleteComment = async (commentId: string) => {
		try {
			const token = localStorage.getItem('token');
			if (!token) throw new Error('No authentication token found');
			await deleteComment(commentId, token);
			setComments(prevComments =>
				prevComments.filter(comment => comment._id !== commentId)
			);
		} catch (error) {
			console.error('Error deleting comment:', error);
		}
	};

	const handleDeleteReply = async (commentId: string, replyId: string) => {
		try {
			const token = localStorage.getItem('token');
			if (!token) throw new Error('No authentication token found');
			const updatedComment = await deleteReply(commentId, replyId, token);
			setComments(prevComments =>
				prevComments.map(comment =>
					comment._id === commentId ? updatedComment : comment
				)
			);
		} catch (error) {
			console.error('Error deleting reply:', error);
		}
	};

	return (
		<article className='max-w-3xl mx-auto'>
			<div className='mb-4'>
				<Button asChild variant='ghost' className='mb-4'>
					<Link href='/account' className='flex items-center'>
						<ArrowLeft className='mr-2 size-4' />
						Back
					</Link>
				</Button>
			</div>

			<h1 className='text-4xl font-bold mb-4'>{title}</h1>
			<div className='flex items-center mb-4 text-sm text-gray-600 dark:text-gray-400'>
				<span>By {authorName}</span>
				<span className='mx-2'>•</span>
				<time dateTime={publishedDate}>
					{format(new Date(publishedDate), 'MMMM d, yyyy')}
				</time>
			</div>
			{coverImage_url ? (
				<div className='mb-8'>
					<Image
						src={coverImage_url?.replace('/f/', '/a/5n5vhs0v3c/')}
						alt={title}
						width={800}
						height={400}
						priority
						className='rounded-lg object-cover w-full h-[400px]'
					/>
				</div>
			) : null}
			<div
				className='prose dark:prose-invert max-w-none mb-8'
				dangerouslySetInnerHTML={{ __html: sanitizedContent }}
			/>
			<div className='flex flex-wrap gap-2 mt-4'>
				{tags.map(tag => (
					<span
						key={tag}
						className='bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-sm'
					>
						{tag}
					</span>
				))}
			</div>

			<div className='mt-12'>
				<h2 className='text-2xl font-bold mb-4'>Comments</h2>
				{user ? (
					<CommentForm onSubmit={handleCommentSubmit} />
				) : (
					<p className='mb-4'>
						Please{' '}
						<Link
							href='/api/auth/sign-in'
							className='text-primary hover:underline'
						>
							sign in
						</Link>{' '}
						to leave a comment.
					</p>
				)}
				<CommentList
					comments={comments}
					onLike={handleLikeComment}
					onReply={handleReplyComment}
					onEditComment={handleEditComment}
					onEditReply={handleEditReply}
					onDeleteComment={handleDeleteComment}
					onDeleteReply={handleDeleteReply}
					currentUser={user}
				/>
			</div>

			<div className='mt-12'>
				<Button asChild variant='outline'>
					<Link href='/account' className='flex items-center'>
						<ArrowLeft className='mr-2 size-4' />
						Back
					</Link>
				</Button>
			</div>
		</article>
	);
}
