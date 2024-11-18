'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth.hook';
import Link from 'next/link';
import { ThemeToggle } from '../shared/theme-toggle';

const Header = () => {
	const { user, signOut } = useAuth();

	return (
		<header className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm'>
			<div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center'>
				<Link
					href={'/dashboard'}
					className='text-2xl font-bold text-brand-700 dark:text-brand-300'
				>
					HolyLens
				</Link>

				<div className='flex items-center space-x-4'>
					<Avatar className='h-8 w-8'>
						<AvatarImage src={user?.avatar} alt={user?.name} />
						<AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
					</Avatar>

					<span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
						{user?.name ?? 'Guest'}
					</span>

					<ThemeToggle />

					<Button variant='outline' size='sm' onClick={signOut}>
						Logout
					</Button>
				</div>
			</div>
		</header>
	);
};

export default Header;
