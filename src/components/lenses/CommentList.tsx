import { format } from 'date-fns';

interface Comment {
	_id: string;
	content: string;
	author: {
		name: string;
	};
	createdAt: string;
}

interface CommentListProps {
	comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
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
					<p>{comment.content}</p>
				</div>
			))}
			{comments.length === 0 ? (
				<p className='text-gray-500'>
					No comments yet. Be the first to comment!
				</p>
			) : null}
		</div>
	);
}
