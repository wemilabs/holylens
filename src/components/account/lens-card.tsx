import { Heart, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '../ui/card';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import Link from 'next/link';

interface LensCardProps {
	lens: {
		_id: string;
		title: string;
		description: string;
		author: {
			name: string;
		};
		publishedDate: string;
		tags: string[];
		coverImage_url?: string;
		readTime?: string;
		likes_count?: number;
		comments_count?: number;
		favorites_count?: number;
		views_count?: number;
	};
}

const lensCard = ({ lens }: LensCardProps) => {
	const {
		_id: id,
		title,
		description,
		author: { name: authorName },
		publishedDate,
		tags,
		coverImage_url,
		readTime,
		likes_count,
		comments_count,
		favorites_count,
		views_count,
	} = lens;

	return (
		<Card key={id}>
			<div className='md:flex'>
				<div className='md:w-1/3'>
					<Image
						src={coverImage_url?.replace('/f/', '/a/5n5vhs0v3c/') ?? ''}
						alt={title}
						width={400}
						height={200}
						className='object-cover w-full h-52 rounded-t-lg md:rounded-l-lg md:rounded-t-none'
					/>
				</div>
				<div className='md:w-2/3'>
					<CardHeader>
						<CardTitle>{lens.title}</CardTitle>
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
								<Heart className='mr-2 h-4 w-4' /> {likes_count}
							</Button>
							<Button variant='ghost' size='sm'>
								<MessageCircle className='mr-2 h-4 w-4' /> {comments_count}
							</Button>
						</div>

						<Link href={`/account/lenses/${id}`}>
							<Button variant='outline'>Read More</Button>
						</Link>
					</CardFooter>
				</div>
			</div>
		</Card>
	);
};

export default lensCard;
