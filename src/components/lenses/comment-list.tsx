'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Heart, MessageCircle, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface CommentListProps {
	comments: LensComment[];
	onLike: (commentId: string) => Promise<void>;
	onReply: (commentId: string, content: string) => Promise<void>;
	onEditComment: (commentId: string, content: string) => Promise<void>;
	onEditReply: (
		commentId: string,
		replyId: string,
		content: string
	) => Promise<void>;
	onDeleteComment: (commentId: string) => Promise<void>;
	onDeleteReply: (commentId: string, replyId: string) => Promise<void>;
	currentUser: { _id: string; name?: string } | null;
}

export function CommentList({
	comments,
	onLike,
	onReply,
	onEditComment,
	onEditReply,
	onDeleteComment,
	onDeleteReply,
	currentUser,
}: CommentListProps) {
	const [expandedReplies, setExpandedReplies] = useState<{
		[key: string]: boolean;
	}>({});
	const [replyContent, setReplyContent] = useState<{ [key: string]: string }>(
		{}
	);
	const [editingComment, setEditingComment] = useState<string | null>(null);
	const [editingReply, setEditingReply] = useState<{
		commentId: string;
		replyId: string;
	} | null>(null);
	const [editContent, setEditContent] = useState<string>('');

	const handleLike = async (commentId: string) => {
		try {
			await onLike(commentId);
		} catch (error) {
			console.error('Error liking comment:', error);
		}
	};

	const handleReply = async (commentId: string) => {
		try {
			await onReply(commentId, replyContent[commentId]);
			setReplyContent({ ...replyContent, [commentId]: '' });
			setExpandedReplies({ ...expandedReplies, [commentId]: true });
		} catch (error) {
			console.error('Error replying to comment:', error);
		}
	};

	const handleEditComment = async (commentId: string) => {
		try {
			await onEditComment(commentId, editContent);
			setEditingComment(null);
			setEditContent('');
		} catch (error) {
			console.error('Error editing comment:', error);
		}
	};

	const handleEditReply = async (commentId: string, replyId: string) => {
		try {
			await onEditReply(commentId, replyId, editContent);
			setEditingReply(null);
			setEditContent('');
		} catch (error) {
			console.error('Error editing reply:', error);
		}
	};

	if (!Array.isArray(comments) || comments.length === 0) {
		return (
			<p className='text-gray-500'>No comments yet. Be the first to comment!</p>
		);
	}

	return (
		<div className='space-y-4'>
			{comments.map(comment => (
				<div
					key={comment._id}
					className='bg-gray-100 dark:bg-gray-800 p-4 rounded-lg'
				>
					<div className='flex justify-between items-start mb-2'>
						<span className='font-semibold'>{comment.author.name}</span>
						<span className='text-sm text-gray-500'>
							{format(new Date(comment.createdAt), 'MMM d, yyyy HH:mm')}
						</span>
					</div>
					{editingComment === comment._id ? (
						<div className='mb-2'>
							<Textarea
								value={editContent}
								onChange={e => setEditContent(e.target.value)}
								className='mb-2'
							/>
							<div className='flex space-x-2'>
								<Button
									onClick={() => handleEditComment(comment._id)}
									disabled={!editContent}
								>
									Save
								</Button>
								<Button
									variant='outline'
									onClick={() => setEditingComment(null)}
								>
									Cancel
								</Button>
							</div>
						</div>
					) : (
						<p className='mb-2'>{comment.content}</p>
					)}
					<div className='flex items-center space-x-4 mb-2'>
						<Button
							variant='ghost'
							size='sm'
							onClick={() => handleLike(comment._id)}
							className={`flex items-center ${
								currentUser &&
								comment.likes &&
								Array.isArray(comment.likes) &&
								comment.likes.some(like => like._id === currentUser?._id)
									? 'text-red-500'
									: ''
							}`}
						>
							<Heart className='mr-1 size-4' />
							{comment.likes && Array.isArray(comment.likes)
								? comment.likes.length
								: 0}
						</Button>
						<Button
							variant='ghost'
							size='sm'
							onClick={() =>
								setExpandedReplies({
									...expandedReplies,
									[comment._id]: !expandedReplies[comment._id],
								})
							}
							className='flex items-center'
						>
							<MessageCircle className='mr-1 size-4' />
							{comment.replies && Array.isArray(comment.replies)
								? comment.replies.length
								: 0}
						</Button>
						{currentUser &&
							currentUser?._id === comment.author?._id &&
							editingComment !== comment._id && (
								<>
									<Button
										variant='ghost'
										size='sm'
										onClick={() => {
											setEditingComment(comment._id);
											setEditContent(comment.content);
										}}
										className='flex items-center'
									>
										<Edit2 className='mr-1 size-4' />
										Edit
									</Button>
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button
												variant='ghost'
												size='sm'
												className='flex items-center text-red-500'
											>
												<Trash2 className='mr-1 size-4' />
												Delete
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent aria-describedby={undefined}>
											<AlertDialogHeader>
												<AlertDialogTitle>Are you sure?</AlertDialogTitle>
												<AlertDialogDescription>
													This action cannot be undone. This will permanently
													delete your comment and all its replies.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction
													onClick={() => onDeleteComment(comment._id)}
												>
													Delete
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</>
							)}
					</div>
					{expandedReplies[comment._id] &&
						comment.replies &&
						Array.isArray(comment.replies) && (
							<div className='ml-4 mt-2 space-y-2'>
								{comment.replies.map(reply => (
									<div
										key={reply._id}
										className='bg-gray-200 dark:bg-gray-700 p-2 rounded'
									>
										<div className='flex justify-between items-start mb-1'>
											<span className='font-semibold text-sm'>
												{reply.author.name}
											</span>
											<span className='text-xs text-gray-500'>
												{format(new Date(reply.createdAt), 'MMM d, yyyy HH:mm')}
											</span>
										</div>
										{editingReply &&
										editingReply.commentId === comment._id &&
										editingReply.replyId === reply._id ? (
											<div className='mb-2'>
												<Textarea
													value={editContent}
													onChange={e => setEditContent(e.target.value)}
													className='mb-2'
												/>
												<div className='flex space-x-2'>
													<Button
														onClick={() =>
															handleEditReply(comment._id, reply._id)
														}
														disabled={!editContent}
													>
														Save
													</Button>
													<Button
														variant='outline'
														onClick={() => setEditingReply(null)}
													>
														Cancel
													</Button>
												</div>
											</div>
										) : (
											<p className='text-sm'>{reply.content}</p>
										)}
										{currentUser &&
											currentUser?._id === reply.author?._id &&
											!editingReply && (
												<div className='flex space-x-2 mt-1'>
													<Button
														variant='ghost'
														size='sm'
														onClick={() => {
															setEditingReply({
																commentId: comment._id,
																replyId: reply._id,
															});
															setEditContent(reply.content);
														}}
														className='flex items-center'
													>
														<Edit2 className='mr-1 h-3 w-3' />
														Edit
													</Button>
													<AlertDialog>
														<AlertDialogTrigger asChild>
															<Button
																variant='ghost'
																size='sm'
																className='flex items-center text-red-500'
															>
																<Trash2 className='mr-1 h-3 w-3' />
																Delete
															</Button>
														</AlertDialogTrigger>
														<AlertDialogContent>
															<AlertDialogHeader>
																<AlertDialogTitle>
																	Are you sure?
																</AlertDialogTitle>
																<AlertDialogDescription>
																	This action cannot be undone. This will
																	permanently delete your reply.
																</AlertDialogDescription>
															</AlertDialogHeader>
															<AlertDialogFooter>
																<AlertDialogCancel>Cancel</AlertDialogCancel>
																<AlertDialogAction
																	onClick={() =>
																		onDeleteReply(comment._id, reply._id)
																	}
																>
																	Delete
																</AlertDialogAction>
															</AlertDialogFooter>
														</AlertDialogContent>
													</AlertDialog>
												</div>
											)}
									</div>
								))}
								{currentUser ? (
									<div className='mt-2'>
										<Textarea
											value={replyContent[comment._id] || ''}
											onChange={e =>
												setReplyContent({
													...replyContent,
													[comment._id]: e.target.value,
												})
											}
											placeholder='Write a reply...'
											className='mb-2'
										/>
										<Button
											onClick={() => handleReply(comment._id)}
											disabled={!replyContent[comment._id]}
										>
											Reply
										</Button>
									</div>
								) : null}
							</div>
						)}
				</div>
			))}
		</div>
	);
}
