'use client';

import { Button } from '@/components/ui/button';
import { navItems } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth.hook';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery.hook';
import { motion as m } from 'framer-motion';
import { LogIn, LogOut, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SignInModal, SignUpModal } from './AuthModals';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false),
		[isSignInModalOpen, setIsSignInModalOpen] = useState(false),
		[isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
	const isMobile = useMediaQuery('(max-width: 768px)');
	const { user, signOut } = useAuth();

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

	const handleSwitchToSignUp = () => {
		setIsSignInModalOpen(false);
		setIsSignUpModalOpen(true);
	};

	const handleSwitchToSignIn = () => {
		setIsSignUpModalOpen(false);
		setIsSignInModalOpen(true);
	};

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

					<nav className='hidden md:flex space-x-6'>
						{navItems.map(({ label, href }) => (
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

					<div className={!isMobile ? 'flex items-center space-x-4' : ''}>
						{!isMobile ? (
							user ? (
								<m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
									<Button variant='ghost' onClick={signOut}>
										<LogOut className='size-4 mr-2' />
										Logout
									</Button>
								</m.div>
							) : (
								<>
									<m.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<Button
											variant='ghost'
											onClick={() => setIsSignInModalOpen(true)}
										>
											Sign In
										</Button>
									</m.div>
									<m.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<Button onClick={() => setIsSignUpModalOpen(true)}>
											Join Us
										</Button>
									</m.div>
								</>
							)
						) : null}

						<ThemeToggle />
					</div>
				</div>
			</header>

			{isMobile ? (
				<nav className='fixed bottom-1 left-0 right-0 bg-white/35 dark:bg-gray-900/70 shadow-lg z-50 rounded-full backdrop-blur-md'>
					<div className='flex justify-around items-center h-16'>
						{navItems.map(item => (
							<Link
								key={item.label}
								href={item.href}
								className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300'
							>
								<item.icon size={20} />
							</Link>
						))}
						{!user ? (
							<>
								<button
									onClick={() => setIsSignInModalOpen(true)}
									className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300'
								>
									<LogIn className='size-6' />
								</button>
								<button
									onClick={() => setIsSignUpModalOpen(true)}
									className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300'
								>
									<UserPlus className='size-6' />
								</button>
							</>
						) : (
							<m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
								<Button variant='ghost' onClick={signOut}>
									<LogOut className='size-4 mr-2' />
									Logout
								</Button>
							</m.div>
						)}
					</div>
				</nav>
			) : null}

			<SignInModal
				isOpen={isSignInModalOpen}
				onClose={() => setIsSignInModalOpen(false)}
				onSwitchToSignUp={handleSwitchToSignUp}
			/>
			<SignUpModal
				isOpen={isSignUpModalOpen}
				onClose={() => setIsSignUpModalOpen(false)}
				onSwitchToSignIn={handleSwitchToSignIn}
			/>
		</>
	);
};

export default Header;
