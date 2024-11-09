'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

interface SearchBarProps {
	initialSearchTerm: string;
}

const SearchBar = ({ initialSearchTerm }: SearchBarProps) => {
	const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	// const initialSearchTerm = searchParams.get('search') || '';
	// const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

	// const [optimisticSearchTerm, setOptimisticSearchTerm] = useOptimistic(
	// 	searchTerm,
	// 	(state, newSearchTerm: string) => newSearchTerm
	// );

	// const updateSearchParams = useCallback(
	// 	(newSearchTerm: string) => {
	// 		const params = new URLSearchParams(searchParams);
	// 		if (newSearchTerm) {
	// 			params.set('search', newSearchTerm);
	// 		} else {
	// 			params.delete('search');
	// 		}
	// 		return params.toString();
	// 	},
	// 	[searchParams]
	// );

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		const current = new URLSearchParams(Array.from(searchParams.entries()));
		if (searchTerm) {
			current.set('search', searchTerm);
		} else {
			current.delete('search');
		}
		const search = current.toString();
		const query = search ? `?${search}` : '';
		router.push(`/lenses${query}`);
	};
	// const handleSearch = useCallback(() => {
	// 	const newParams = updateSearchParams(searchTerm);
	// 	startTransition(() => {
	// 		setOptimisticSearchTerm(searchTerm);
	// 		router.push(`/lenses${newParams ? `?${newParams}` : ''}`);
	// 	});
	// }, [searchTerm, updateSearchParams, router]);

	// const handleClear = useCallback(() => {
	// 	setSearchTerm('');
	// 	startTransition(() => {
	// 		setOptimisticSearchTerm('');
	// 		const newParams = updateSearchParams('');
	// 		router.push(`/lenses${newParams ? `?${newParams}` : ''}`);
	// 	});
	// }, [updateSearchParams, router]);

	// TODO: Make that once clicking the delete search button, it also affects directly the url

	return (
		<form onSubmit={handleSearch} className='flex max-w-md mx-auto mb-8'>
			<Input
				type='text'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				placeholder='Search lenses...'
				className='rounded-r-none focus:ring-0 focus:border-input'
				// onKeyPress={e => e.key === 'Enter' && handleSearch()}
			/>
			<Button
				type='submit'
				className='rounded-l-none'
				// disabled={isPending}
				// onClick={handleSearch}
			>
				<Search className='size-4' />
			</Button>
			{searchTerm ? (
				<Button
					type='button'
					variant='outline'
					onClick={() => setSearchTerm('')}
				>
					<X className='size-4' />
				</Button>
			) : null}
			{/* {optimisticSearchTerm && (
				<Button
					onClick={handleClear}
					disabled={isPending}
					className='rounded-r-md'
				>
					<X className='h-4 w-4' />
				</Button>
			)} */}
		</form>
	);
};

export default SearchBar;
