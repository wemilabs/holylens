'use client';

import { testimonials } from '@/lib/constants';
import { motion as m } from 'framer-motion';
import { Quote } from 'lucide-react';
import Image from 'next/image';

export function Testimonials() {
	return (
		<section className='py-16 bg-white dark:bg-gray-900'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
				<h2 className='text-3xl font-bold text-center text-gray-900 dark:text-white mb-12'>
					What Our Readers Say
				</h2>
				<div className='grid gap-8 md:grid-cols-3'>
					{testimonials.map(({ title, author, quote, avatar }, index) => (
						<m.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className='bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md'
						>
							<Quote className='w-8 h-8 text-blue-500 mb-4' />
							<p className='text-gray-600 dark:text-gray-300 mb-4 italic'>
								{quote}
							</p>
							<div className='flex items-center'>
								<Image
									src={avatar as string}
									alt={author}
									width={50}
									height={50}
									className='size-11 rounded-full mr-4'
								/>
								<div>
									<p className='font-semibold text-gray-900 dark:text-white'>
										{author}
									</p>
									<p className='text-sm text-gray-500 dark:text-gray-400'>
										{title}
									</p>
								</div>
							</div>
						</m.div>
					))}
				</div>
			</div>
		</section>
	);
}
