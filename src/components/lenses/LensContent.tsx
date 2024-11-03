'use client';

import { createComment, getComments } from '@/lib/actions/comment.action';
import { useAuth } from '@/lib/hooks/useAuth.hook';
import { format } from 'date-fns';
import DOMPurify from 'isomorphic-dompurify';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { CommentForm } from './CommentForm';

interface LensContentProps {
	lens: {
		_id: string;
		title: string;
		content: string;
		author: {
			name: string;
		};
		publishedDate: string;
		tags: string[];
		coverImage?: string;
	};
}

interface Comment {
	_id: string;
	content: string;
	author: {
		name: string;
	};
	createdAt: string;
}

export function LensContent({ lens }: LensContentProps) {
	const [comments, setComments] = useState<Comment[]>([]);
	const { user } = useAuth();
	const sanitizedContent = DOMPurify.sanitize(lens.content);

	useEffect(() => {
		fetchComments();
	}, []);

	const fetchComments = async () => {
		try {
			const fetchedComments = await getComments(lens._id);
			setComments(fetchedComments);
		} catch (error) {
			console.error('Error fetching comments:', error);
		}
	};

	const handleCommentSubmit = async (content: string) => {
		try {
			const newComment = await createComment(lens._id, content);
			setComments([newComment, ...comments]);
		} catch (error) {
			console.error('Error submitting comment:', error);
		}
	};

	return (
		<article className='max-w-3xl mx-auto'>
			<div className='mb-8'>
				<Button asChild variant='ghost' className='mb-4'>
					<Link href='/lenses' className='flex items-center'>
						<ArrowLeft className='mr-2 size-4' />
						Back to Articles
					</Link>
				</Button>
			</div>

			<h1 className='text-4xl font-bold mb-4'>{lens.title}</h1>
			<div className='flex items-center mb-4 text-sm text-gray-600 dark:text-gray-400'>
				<span>By {lens.author.name}</span>
				<span className='mx-2'>•</span>
				<time dateTime={lens.publishedDate}>
					{format(new Date(lens.publishedDate), 'MMMM d, yyyy')}
				</time>
			</div>
			{lens.coverImage ? (
				<div className='mb-8'>
					<Image
						src={lens.coverImage}
						alt={lens.title}
						width={800}
						height={400}
						className='rounded-lg object-cover w-full h-[400px]'
					/>
				</div>
			) : null}
			<div
				className='prose dark:prose-invert max-w-none mb-8'
				dangerouslySetInnerHTML={{ __html: sanitizedContent }}
			/>
			<div className='flex flex-wrap gap-2 mt-4'>
				{lens.tags.map(tag => (
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
				{/* <CommentList comments={comments} /> */}
			</div>

			<div className='mt-12'>
				<Button asChild variant='outline'>
					<Link href='/lenses' className='flex items-center'>
						<ArrowLeft className='mr-2 size-4' />
						Back to Articles
					</Link>
				</Button>
			</div>
		</article>
	);
}
