'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion as m } from 'framer-motion';

export function Newsletter() {
	return (
		<section className='bg-gray-100 dark:bg-gray-700 py-16 transition-colors duration-300'>
			<div className='max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
				<h2 className='text-3xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300'>
					Stay Inspired
				</h2>
				<p className='text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300'>
					Subscribe to our newsletter for weekly insights and inspiration.
				</p>
				<form className='flex gap-2'>
					<Input
						type='email'
						placeholder='Enter your email'
						className='flex-grow dark:bg-gray-800 dark:text-white dark:border-gray-600 transition-colors duration-300'
					/>
					<m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						<Button
							type='submit'
							className='bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300'
						>
							Subscribe
						</Button>
					</m.div>
				</form>
			</div>
		</section>
	);
}
