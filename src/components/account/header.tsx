'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Bell, ChevronDown /*, LoaderCircle*/ } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '../shared/theme-toggle';
import { useAuth } from '@/lib/hooks/useAuth.hook';
import { useRouter } from 'next/navigation';
import { clearURLParam } from '@/lib/utils';

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false),
		// [isLoading, setIsLoading] = useState(false),
		[searchTerm, setSearchTerm] = useState('');
	const { user, signOut } = useAuth();
	const router = useRouter();

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

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		// setIsLoading(true);
		router.push(`/account?search=${searchTerm}`);
		// setIsLoading(false);
	};

	const handleClearSearch = () => {
		setSearchTerm('');
		router.replace(clearURLParam('search')); // Update the URL without reloading the page
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		if (e.target.value === '') {
			handleClearSearch(); // Call clear function if input is empty
		}
	};

	return (
		<header
			className={`shadow-sm transition-all duration-300 fixed top-0 left-0 right-0 z-50 ${
				isScrolled
					? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md'
					: 'bg-white dark:bg-gray-900'
			}`}
		>
			<div className='container mx-auto px-4 py-4'>
				<div className='flex items-center justify-between'>
					<Link href='/account' className='text-2xl font-bold text-primary'>
						HolyLens
					</Link>
					<div className='flex items-center space-x-4'>
						<form onSubmit={handleSearch} className='relative hidden md:block'>
							{/* {isLoading ? (
								<LoaderCircle className='absolute left-2 top-2 text-gray-400 animate-spin' />
							) : (
								<Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400' />
							)} */}
							<Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400' />
							<Input
								type='search'
								placeholder='Search...'
								value={searchTerm}
								onChange={handleInputChange}
								className='pl-8 w-64'
							/>
							<Input type='submit' className='hidden' />
						</form>
						<Button variant='ghost' size='icon'>
							<Bell className='size-5' />
						</Button>
						<ThemeToggle />
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='ghost' className='flex items-center space-x-2'>
									<Avatar className='size-8'>
										<AvatarImage src={'/placeholder.svg'} alt={user?.name} />
										<AvatarFallback>{user?.name?.[0]}</AvatarFallback>
									</Avatar>
									<span className='hidden md:inline'>{user?.name}</span>
									<ChevronDown className='size-4' />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<DropdownMenuItem>Profile</DropdownMenuItem>
								<DropdownMenuItem>Settings</DropdownMenuItem>
								<DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
