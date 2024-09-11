'use client';

import { navLinks } from '@/lib/constants';
import { motion as m } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { SignInModal } from './SignInModal';
import { Button } from '@/components/ui/button';

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false),
		[isSignInModalOpen, setIsSignInModalOpen] = useState(false);

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
		<>
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
						{navLinks.map(({ label, href }) => (
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
					</nav>

					<div className='flex items-center space-x-4'>
						<m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Button
								variant='ghost'
								onClick={() => setIsSignInModalOpen(true)}
							>
								Sign In
							</Button>
						</m.div>
						<m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Link href='/auth/sign-up'>
								<Button>Sign Up</Button>
							</Link>
						</m.div>

						<ThemeToggle />
					</div>
				</div>
			</header>
			<SignInModal
				isOpen={isSignInModalOpen}
				onClose={() => setIsSignInModalOpen(false)}
			/>
		</>
	);
};

export default Header;
