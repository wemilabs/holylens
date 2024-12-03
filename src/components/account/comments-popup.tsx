'use client';

import { useState, useEffect, Suspense } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageCircle, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { getComments } from '@/lib/actions/comment.action';

interface CommentsPopupProps {
	lensId: string;
	commentsCount: number;
}

export function CommentsPopup({ lensId, commentsCount }: CommentsPopupProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [comments, setComments] = useState<LensComment[]>([]);
	// const [commentsCount, setCommentsCount] = useState(initialCommentsCount);

	useEffect(() => {
		if (isOpen) {
			fetchComments();
		}
	}, [isOpen, lensId]);

	const fetchComments = async () => {
		try {
			const fetchedComments = await getComments(lensId);
			setComments(fetchedComments);
			// setCommentsCount(fetchedComments.length);
		} catch (error) {
			console.error('Error fetching comments:', error);
		}
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const getAvatarFallback = (name: string) => {
		return name ? name.charAt(0).toUpperCase() : '?';
	};

	const renderComment = (comment: LensComment) => (
		<div key={comment._id} className='mb-4'>
			<div className='flex items-start space-x-4'>
				<Avatar>
					<AvatarImage src={comment.author.avatar} alt={comment.author.name} />
					<AvatarFallback>
						{getAvatarFallback(comment.author.name)}
					</AvatarFallback>
				</Avatar>
				<div className='flex-1'>
					<div className='flex items-center justify-between'>
						<h4 className='font-semibold'>{comment.author.name}</h4>
						<span className='text-sm text-gray-500'>
							{formatDate(comment.createdAt)}
						</span>
					</div>
					<p className='mt-1'>{comment.content}</p>
					<div className='mt-2 flex items-center space-x-2'>
						<Button variant='ghost' size='sm'>
							<Heart className='mr-2 size-4' />
							{comment.likes.length}
						</Button>
						<Button variant='ghost' size='sm'>
							Reply
						</Button>
					</div>
				</div>
			</div>
			{comment.replies.map(reply => (
				<div key={reply._id} className='ml-8 mt-2'>
					<div className='flex items-start space-x-4'>
						<Avatar>
							<AvatarFallback>
								{getAvatarFallback(reply.author.name)}
							</AvatarFallback>
						</Avatar>
						<div className='flex-1'>
							<div className='flex items-center justify-between'>
								<h5 className='font-semibold'>{reply.author.name}</h5>
								<span className='text-sm text-gray-500'>
									{formatDate(reply.createdAt)}
								</span>
							</div>
							<p className='mt-1'>{reply.content}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant='ghost' size='sm'>
					<MessageCircle className='mr-2 size-4' /> {commentsCount}
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Comments ({commentsCount})</DialogTitle>
				</DialogHeader>
				<div className='mt-4 max-h-[60vh] overflow-y-auto'>
					<Suspense fallback={<div>Loading...</div>}>
						{comments.map(comment => (
							<div key={comment._id}>
								{renderComment(comment)}
								<Separator className='my-4' />
							</div>
						))}
					</Suspense>
				</div>
			</DialogContent>
		</Dialog>
	);
}
