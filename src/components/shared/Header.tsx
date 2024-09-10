'use client';

import { navLinks } from '@/lib/constants';
import { motion as m } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<header
			className={`py-6 px-4 sm:px-6 lg:px-8 transition-all duration-300 fixed top-0 left-0 right-0 z-50 ${
				isScrolled
					? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md'
					: 'bg-white dark:bg-gray-900'
			}`}
		>
			<div className='max-w-7xl mx-auto flex justify-between items-center'>
				<Link
					href='/'
					className='text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-300'
				>
					HolyLens
				</Link>

				<nav className='hidden sm:flex space-x-6'>
					{navLinks.map(item => (
						<m.div
							key={item.name}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Link
								href={item.link}
								className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300'
							>
								{item.name}
							</Link>
						</m.div>
					))}
				</nav>

				<ThemeToggle />
			</div>
		</header>
	);
};

export default Header;
