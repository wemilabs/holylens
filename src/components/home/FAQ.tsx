'use client';

import { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqs } from '@/lib/constants';

export function FAQ() {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const toggleQuestion = (index: number) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	return (
		<section className='py-16 bg-gray-50 dark:bg-gray-800'>
			<div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
				<h2 className='text-3xl font-bold text-center text-gray-900 dark:text-white mb-8'>
					Frequently Asked Questions
				</h2>
				<div className='space-y-4'>
					{faqs.map((faq, index) => (
						<m.div
							key={index}
							initial={false}
							animate={{
								backgroundColor:
									activeIndex === index
										? 'rgba(59, 130, 246, 0.1)'
										: 'rgba(255, 255, 255, 0)',
							}}
							className='border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden'
						>
							<button
								className='flex justify-between items-center w-full px-4 py-4 text-left'
								onClick={() => toggleQuestion(index)}
							>
								<span className='font-medium text-gray-900 dark:text-white'>
									{faq.question}
								</span>
								<ChevronDown
									className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
										activeIndex === index ? 'transform rotate-180' : ''
									}`}
								/>
							</button>
							<AnimatePresence>
								{activeIndex === index && (
									<m.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: 'auto', opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.3 }}
									>
										<p className='px-4 py-4 text-gray-600 dark:text-gray-300'>
											{faq.answer}
										</p>
									</m.div>
								)}
							</AnimatePresence>
						</m.div>
					))}
				</div>
			</div>
		</section>
	);
}
