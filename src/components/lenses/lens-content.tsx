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
import { ArrowLeft, Heart, BookmarkCheck, Bookmark } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { CommentForm } from './comment-form';
import { CommentList } from './comment-list';
import { toast } from 'sonner';
import { likeLens } from '@/lib/actions/lens.actions';

interface LensContentProps {
	lens: Lens;
}

const token: string | null = localStorage.getItem('token');

export function LensContent({ lens }: LensContentProps) {
	const [comments, setComments] = useState<LensComment[]>([]),
		// [isLiked, setIsLiked] = useState(false),
		[isBookmarked, setIsBookmarked] = useState(false);
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

	function verifyUserAuth(token: string | null) {
		if (!token) toast.error('You must be signed in to perform this action');
		return;
	}

	const handleCommentSubmit = async (content: string) => {
		try {
			verifyUserAuth(token);
			const newComment = await createComment(id, content, token);
			setComments(prevComments => [newComment, ...prevComments]);
		} catch (error) {
			console.error('Error submitting comment:', error);
		}
	};

	const handleLikeComment = async (commentId: string) => {
		try {
			verifyUserAuth(token);
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
			verifyUserAuth(token);
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
			verifyUserAuth(token);
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

	console.log('1 - ', token);
	console.log('2 - ', Array.isArray(lens.likes));
	console.log('3 - ', user?.id);
	console.log(
		'4 -',
		lens.likes.find(like => like._id === user?.id)
	);

	const handleEditReply = async (
		commentId: string,
		replyId: string,
		content: string
	) => {
		try {
			verifyUserAuth(token);
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
			verifyUserAuth(token);
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
			verifyUserAuth(token);
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

	const handleLikeLens = async (lensId: string) => {
		try {
			verifyUserAuth(token);
			await likeLens(lensId, token);
			// setIsLiked(prevState => !prevState);
		} catch (error) {
			console.error('Error liking lens:', error);
		}
	};

	const handleBookmarkLens = async () => {
		if (!user) {
			toast.error('Please sign in to bookmark this lens');
			return;
		}
		// Here you would typically call an API to bookmark the lens
		// For now, we'll just toggle the state
		setIsBookmarked(!isBookmarked);
		toast.success(isBookmarked ? 'Bookmark removed' : 'Lens bookmarked');
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
			<div className='flex items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-400'>
				<div className='flex items-center'>
					<span>By {authorName}</span>
					<span className='mx-2'>•</span>
					<time dateTime={publishedDate}>
						{format(new Date(publishedDate), 'MMMM d, yyyy')}
					</time>
				</div>
				<div className='flex items-center space-x-4'>
					<Button
						variant='ghost'
						size='sm'
						onClick={() => handleLikeLens(id)}
						// aria-label={isLiked ? 'Unlike lens' : 'Like lens'}
						// className={
						// 	token &&
						// 	Array.isArray(lens.likes) &&
						// 	lens.likes.some(like => like._id === user?.id)
						// 		? 'text-red-500'
						// 		: ''
						// }
					>
						<Heart className='mr-2 size-5' />
					</Button>
					<Button
						variant='ghost'
						size='sm'
						onClick={handleBookmarkLens}
						aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark lens'}
						className={isBookmarked ? 'text-blue-500' : ''}
					>
						<Bookmark className='mr-2 size-5' />
					</Button>
				</div>
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

			<div className='flex items-center space-x-4'>
				<Button variant='ghost' size='sm'>
					<Heart className='mr-2 size-5' />
				</Button>
				<Button variant='ghost' size='sm'>
					<BookmarkCheck className='mr-2 size-5' />
				</Button>
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
