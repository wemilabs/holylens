'use client';

import { motion as m } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const HeroBanner = () => {
	return (
		<m.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center'
		>
			<h1 className='text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300'>
				Illuminating Perspectives
			</h1>
			<p className='text-xl text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300'>
				Explore thought-provoking articles on spirituality, philosophy, and
				personal growth.
			</p>
			<m.div
				transition={{ duration: 0.3 }}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				<Link href={'/lenses'}>
					<Button className='bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300'>
						Start Reading
					</Button>
				</Link>
			</m.div>
		</m.section>
	);
};

export default HeroBanner;
