import { Card, CardContent } from '@/components/ui/card';
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
	};
}

export function LensCard({ lens }: LensCardProps) {
	return (
		<Card className='shadow-md overflow-hidden'>
			<Image
				src={lens.coverImage_url ?? ''}
				alt={lens.title}
				width={800}
				height={400}
				className='w-full h-48 object-cover'
			/>
			<CardContent className='p-6'>
				<div className='flex flex-wrap gap-2 mb-2'>
					{lens.tags.map(tag => (
						<span
							key={tag}
							className='text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full '
						>
							{tag}
						</span>
					))}
				</div>
				<div className='flex justify-between items-center mb-2'>
					<span className='text-sm text-gray-500 dark:text-gray-400'>
						{lens.readTime ?? '5 min read'}
					</span>
				</div>
				<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
					{lens.title}
				</h2>
				<p className='text-gray-600 dark:text-gray-300 mb-4'>
					{lens.description.replace(/<[^>]*>/g, '').slice(0, 100)}...
				</p>
				<Link
					href={`/lenses/${lens._id}`}
					className='text-blue-600 dark:text-blue-400 hover:underline'
				>
					Read more
				</Link>
			</CardContent>
		</Card>
	);
}
