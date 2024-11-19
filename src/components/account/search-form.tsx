'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { clearURLParam } from '@/lib/utils';

export default function SearchForm() {
	const [searchTerm, setSearchTerm] = useState('');
	const router = useRouter();

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		router.push(`/account?search=${searchTerm}`);
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
		<form onSubmit={handleSearch} className='relative'>
			<Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400' />
			<Input
				type='search'
				placeholder='Search...'
				value={searchTerm}
				onChange={handleInputChange}
				className='pl-8 w-full'
			/>
		</form>
	);
}
