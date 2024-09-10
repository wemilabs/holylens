'use client';

import { motion as m } from 'framer-motion';
import Link from 'next/link';

const Footer = () => {
	return (
		<footer className='bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8 transition-colors duration-300'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center'>
				<p className='text-gray-600 dark:text-gray-300 transition-colors duration-300'>
					© 2024 HolyLens. All rights reserved.
				</p>
				<div className='flex space-x-6'>
					{['Privacy Policy', 'Terms of Service'].map(item => (
						<m.div
							key={item}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Link
								href='#'
								className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300'
							>
								{item}
							</Link>
						</m.div>
					))}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
