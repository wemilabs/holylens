'use client';

import { footerLinks } from '@/lib/constants';
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
					{footerLinks.map(({ label, href }) => (
						<m.div
							key={label}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Link
								href={href}
								className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300'
							>
								{label}
							</Link>
						</m.div>
					))}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
