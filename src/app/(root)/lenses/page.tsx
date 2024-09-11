// import LensesList from '@/components/LensesList';
// import { getLenses } from '@/lib/actions/lenses.actions';

// export default async function LensesPage() {
// 	const data = (await getLenses()) as Lens[];

// 	return <LensesList data={data} />;
// }

'use client';

import { motion as m } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

const categories = [
	'Spirituality',
	'Philosophy',
	'Personal Growth',
	'Meditation',
	'Mindfulness',
	'Eastern Wisdom',
	'Science & Spirituality',
	'Compassion',
	'Ancient Philosophy',
];

const lenses = [
	{
		title: 'The Power of Mindfulness in Daily Life',
		excerpt:
			'Discover how practicing mindfulness can transform your everyday experiences and lead to greater peace and clarity.',
		image:
			'https://ik.imagekit.io/vercel/v0/blog/mindfulness-daily.jpg?tr=w-800,h-400,fo-auto',
		categories: ['Mindfulness', 'Personal Growth'],
		readTime: '5 min read',
	},
	{
		title: "Understanding Eastern Philosophy: A Beginner's Guide",
		excerpt:
			'Explore the fundamental concepts of Eastern philosophy and how they can be applied to modern life.',
		image:
			'https://ik.imagekit.io/vercel/v0/blog/eastern-philosophy.jpg?tr=w-800,h-400,fo-auto',
		categories: ['Philosophy', 'Eastern Wisdom'],
		readTime: '8 min read',
	},
	{
		title: 'The Art of Meditation: Techniques for Beginners',
		excerpt:
			'Learn simple yet effective meditation techniques that can help you start your journey towards inner peace.',
		image:
			'https://ik.imagekit.io/vercel/v0/blog/meditation-techniques.jpg?tr=w-800,h-400,fo-auto',
		categories: ['Meditation', 'Mindfulness'],
		readTime: '6 min read',
	},
	{
		title: 'Exploring the Connection Between Spirituality and Science',
		excerpt:
			'Delve into the fascinating intersection of spiritual practices and scientific research.',
		image:
			'https://ik.imagekit.io/vercel/v0/blog/spirituality-science.jpg?tr=w-800,h-400,fo-auto',
		categories: ['Spirituality', 'Science & Spirituality'],
		readTime: '7 min read',
	},
	{
		title: 'The Role of Compassion in Personal Growth',
		excerpt:
			'Understand how cultivating compassion for yourself and others can lead to profound personal development.',
		image:
			'https://ik.imagekit.io/vercel/v0/blog/compassion-growth.jpg?tr=w-800,h-400,fo-auto',
		categories: ['Personal Growth', 'Compassion'],
		readTime: '5 min read',
	},
	{
		title: 'Ancient Wisdom for Modern Times: Applying Stoic Philosophy',
		excerpt:
			'Discover how the principles of Stoicism can help you navigate the challenges of contemporary life.',
		image:
			'https://ik.imagekit.io/vercel/v0/blog/stoic-philosophy.jpg?tr=w-800,h-400,fo-auto',
		categories: ['Philosophy', 'Ancient Philosophy', 'Personal Growth'],
		readTime: '6 min read',
	},
];

export default function LensesPage() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	const filteredLenses = lenses.filter(lens => {
		const matchesSearch =
			lens.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			lens.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategories =
			selectedCategories.length === 0 ||
			selectedCategories.some(cat => lens.categories.includes(cat));
		return matchesSearch && matchesCategories;
	});

	const toggleCategory = (category: string) => {
		setSelectedCategories(prev =>
			prev.includes(category)
				? prev.filter(c => c !== category)
				: [...prev, category]
		);
	};

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
			<m.h1
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center'
			>
				Lenses
			</m.h1>

			<div className='flex flex-col md:flex-row gap-8'>
				<m.aside
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className='w-full md:w-64 flex-shrink-0'
				>
					<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
						Categories
					</h2>
					<div className='space-y-2'>
						{categories.map(category => (
							<button
								key={category}
								onClick={() => toggleCategory(category)}
								className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
									selectedCategories.includes(category)
										? 'bg-blue-600 text-white'
										: 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
								}`}
							>
								{category}
							</button>
						))}
					</div>
				</m.aside>

				<div className='flex-grow'>
					<m.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className='mb-8'
					>
						<div className='flex max-w-md mx-auto'>
							<Input
								type='text'
								placeholder='Search lenses...'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								className='rounded-r-none focus:ring-0 focus:border-gray-300 dark:focus:border-gray-600'
							/>
							<Button
								className='rounded-l-none'
								onClick={() => setSearchTerm('')}
							>
								{searchTerm ? (
									<X className='h-4 w-4' />
								) : (
									<Search className='h-4 w-4' />
								)}
							</Button>
						</div>
					</m.div>

					<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
						{filteredLenses.map((lens, index) => (
							<m.article
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className='bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden'
							>
								<Image
									src={lens.image}
									alt={lens.title}
									width={800}
									height={400}
									className='w-full h-48 object-cover'
								/>
								<div className='p-6'>
									<div className='flex flex-wrap gap-2 mb-2'>
										{lens.categories.map(category => (
											<span
												key={category}
												className='text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full'
											>
												{category}
											</span>
										))}
									</div>
									<div className='flex justify-between items-center mb-2'>
										<span className='text-sm text-gray-500 dark:text-gray-400'>
											{lens.readTime}
										</span>
									</div>
									<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
										{lens.title}
									</h2>
									<p className='text-gray-600 dark:text-gray-300 mb-4'>
										{lens.excerpt}
									</p>
									<Link
										href='#'
										className='text-blue-600 dark:text-blue-400 hover:underline'
									>
										Read more
									</Link>
								</div>
							</m.article>
						))}
					</div>

					{filteredLenses.length === 0 && (
						<m.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5 }}
							className='text-center text-gray-600 dark:text-gray-300 mt-8'
						>
							No lenses found matching your criteria.
						</m.p>
					)}

					{filteredLenses.length > 0 && (
						<m.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.6 }}
							className='mt-12 text-center'
						>
							<Button>Load More</Button>
						</m.div>
					)}
				</div>
			</div>
		</div>
	);
}
