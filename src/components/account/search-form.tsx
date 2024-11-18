'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function SearchForm() {
	const [searchTerm, setSearchTerm] = useState('');

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(`Searching for "${searchTerm}"`);
		// Implement search logic here
	};

	return (
		<form onSubmit={handleSearch} className='relative'>
			<Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400' />
			<Input
				type='search'
				placeholder='Search...'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				className='pl-8 w-full'
			/>
		</form>
	);
}
