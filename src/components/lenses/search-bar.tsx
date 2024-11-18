'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useCallback } from 'react';

interface SearchBarProps {
	initialSearchTerm: string;
}

const SearchBar = ({ initialSearchTerm }: SearchBarProps) => {
	const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
	const router = useRouter();
	const searchParams = useSearchParams();

	const updateURL = useCallback(
		(newSearchTerm: string) => {
			const current = new URLSearchParams(Array.from(searchParams.entries()));
			if (newSearchTerm) {
				current.set('search', newSearchTerm);
			} else {
				current.delete('search');
			}
			const search = current.toString();
			const query = search ? `?${search}` : '';
			router.push(`/lenses${query}`);
		},
		[searchParams, router]
	);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		updateURL(searchTerm);
	};

	const handleClearSearch = () => {
		setSearchTerm('');
		updateURL('');
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	return (
		<form onSubmit={handleSearch} className='flex max-w-md mx-auto mb-8'>
			<Input
				type='text'
				value={searchTerm}
				onChange={handleInputChange}
				placeholder='Search lenses...'
				className='rounded-r-none focus:ring-0 focus:border-input'
			/>
			<Button type='submit' className='rounded-l-none'>
				<Search className='size-4' />
			</Button>
			{searchTerm ? (
				<Button
					type='button'
					variant='outline'
					onClick={handleClearSearch}
					className='rounded-l-none'
				>
					<X className='size-4' />
				</Button>
			) : null}
		</form>
	);
};

export default SearchBar;
