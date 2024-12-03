import { ArrowRight, Bookmark, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { CommentsPopup } from './comments-popup';

interface LensCardProps {
	lens: Lens;
}

const LensCard = ({ lens }: LensCardProps) => {
	const {
		_id: id,
		title,
		description,
		author: { name: authorName },
		publishedDate,
		tags,
		slug,
		coverImage_url,
		readTime,
		likes,
		comments,
		favorites_count,
		views_count,
	} = lens;

	const calculateTotalCommentCount = (comments: LensComment[]): number => {
		return comments.reduce((total, comment) => {
			return total + 1 + (comment.replies?.length || 0);
		}, 0);
	};

	const totalCommentCount = calculateTotalCommentCount(comments);

	return (
		<Card key={id}>
			<div className='md:flex'>
				<div className='md:w-1/3'>
					<Image
						src={
							coverImage_url?.replace('/f/', '/a/5n5vhs0v3c/') ||
							'https://utfs.io/a/5n5vhs0v3c/fXNe0o275jNhLMaMgPyr1U0RfETg7K8AuPGp5hqYH3dx6cCt'
						}
						alt={title}
						width={400}
						height={200}
						className='object-cover w-full h-56 md:min-h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none'
					/>
				</div>
				<div className='md:w-2/3'>
					<CardHeader>
						<div className='flex justify-between items-center'>
							<CardTitle>{title}</CardTitle>
							<Button variant='ghost' size='sm'>
								<Bookmark className='size-5' />
							</Button>
						</div>
						<CardDescription>By {authorName}</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='flex flex-wrap gap-2'>
							{tags.map(tag => (
								<Badge key={tag} variant='secondary'>
									{tag}
								</Badge>
							))}
						</div>
					</CardContent>

					<CardFooter className='flex justify-between'>
						<div className='flex items-center space-x-4'>
							<Button variant='ghost' size='sm'>
								<Heart className='mr-2 size-4' /> {likes?.length ?? 0}
							</Button>
							<CommentsPopup lensId={id} commentsCount={totalCommentCount} />
						</div>

						<Link href={`/account/lenses/${slug}`}>
							<Button variant='outline'>
								Read More <ArrowRight className='ml-2 size-4' />
							</Button>
						</Link>
					</CardFooter>
				</div>
			</div>
		</Card>
	);
};

export default LensCard;
