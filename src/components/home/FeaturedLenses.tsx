'use client';

import { motion as m } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import M1 from '../../../public/77c6986c-be42-45e7-a035-0b27b3d68ea7.webp';
import M2 from '../../../public/3bc134a5-822a-4288-a088-7852ac6db54b.webp';
import M3 from '../../../public/68d4b805-ad42-4628-9279-0e221a268b5b.webp';

const lenses = [
	{
		title: 'The Power of Mindfulness',
		description:
			'Discover how mindfulness can transform your daily life and bring inner peace.',
		image: M1,
	},
	{
		title: 'Exploring Eastern Philosophy',
		description:
			'Dive into the rich traditions of Eastern philosophy and their relevance today.',
		image: M2,
	},
	{
		title: 'The Art of Meditation',
		description:
			'Learn various meditation techniques to calm your mind and enhance focus.',
		image: M3,
	},
];

export function FeaturedLenses() {
	return (
		<section className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
			<h2 className='text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center transition-colors duration-300'>
				Featured Lenses
			</h2>
			<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
				{lenses.map((lens, i) => (
					<m.div
						key={i}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						whileHover={{ scale: 1.05 }}
					>
						<div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm transition-colors duration-300'>
							<Image
								src={lens.image}
								alt={lens.title}
								width={800}
								height={450}
								className='w-full h-48 object-cover rounded-md mb-4'
							/>
							<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300'>
								{lens.title}
							</h3>
							<p className='text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300'>
								{lens.description}
							</p>
							<m.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
								<Link
									href='#'
									className='text-gray-900 dark:text-white hover:underline transition-colors duration-300'
								>
									Read more →
								</Link>
							</m.div>
						</div>
					</m.div>
				))}
			</div>
		</section>
	);
}
