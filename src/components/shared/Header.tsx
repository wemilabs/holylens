'use client';

import { navLinks } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Logo from './Logo';
import Overlay from './Overlay';
import ThemeToggle from './ThemeToggle';

/**
 * Functional component for the header section of the website.
 *
 * @return {JSX.Element} The header section JSX element
 */
const Header = (): JSX.Element => {
	// STATE
	const [isScrolled, setIsScrolled] = useState<boolean>(false),
		[isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);

	// EFFECT
	useEffect(() => {
		const handleScroll = () => {
			const scrolling = window.scrollY > 0;
			setIsScrolled(scrolling);
		};

		document.addEventListener('scroll', handleScroll);

		// Cleanup
		return () => {
			document.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<header
			className={`flex items-center justify-between px-6 md:px-10 py-2 md:py-6 sticky top-0 left-0 z-30 ${
				isScrolled ? 'shadow-md' : 'shadow-none'
			} transition-shadow duration-300 w-full bg-opacity-90 border-b border-b-transparent backdrop-filter backdrop-blur-md`}
		>
			<Link href='/'>
				<Logo />
			</Link>

			<nav className='hidden md:flex'>
				<ul className='flex items-center justify-center gap-x-3 lg:gap-x-8 font-normal'>
					{navLinks.map((lnk: any) => (
						<li key={lnk.name}>
							<Link href={lnk.link}>{lnk.name}</Link>
						</li>
					))}
					<li>
						<ThemeToggle />
					</li>
					<li>
						<button
							type='button'
							onClick={() =>
								setIsOverlayOpen(prevIsOverlayOpen => !prevIsOverlayOpen)
							}
							className='rounded-full px-4 py-2 bg-secondary transition-colors duration-300 hover:bg-secondaryHover text-sm text-white'
						>
							Log In
						</button>
					</li>
				</ul>
			</nav>

			<div className='md:hidden flex items-center justify-center gap-x-2'>
				<ThemeToggle />

				<button
					type='button'
					onClick={() =>
						setIsOverlayOpen(prevIsOverlayOpen => !prevIsOverlayOpen)
					}
					className='rounded-full px-4 py-2 bg-secondary transition-colors duration-300 hover:bg-secondaryHover text-sm text-white'
				>
					Log In
				</button>
			</div>

			{isOverlayOpen ? (
				<>
					{createPortal(
						<>
							<Overlay
								onClose={() =>
									setIsOverlayOpen(prevIsOverlayOpen => !prevIsOverlayOpen)
								}
							/>

							<div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300 ease-in-out'>
								<div
									className='w-7 h-7 rounded mt-2 mr-2 float-right transition-all duration-300 ease-in-out hover:bg-red-600'
									onClick={() =>
										setIsOverlayOpen(prevIsOverlayOpen => !prevIsOverlayOpen)
									}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className='w-6 h-6 text-gray-600 hover:text-white transition-all duration-300 ease-in-out relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M6 18L18 6M6 6l12 12'
										/>
									</svg>
								</div>

								<div className='bg-white py-8 px-6 shadow rounded-lg sm:px-10'>
									<h1 className='text-xl font-medium text-gray-700 text-center'>
										Join the HolyLens community
									</h1>
								</div>
							</div>
						</>,
						document.body
					)}
				</>
			) : null}
		</header>
	);
};

export default Header;
