'use client';

// import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface CategorySelectorProps {
	categories: string[];
	selectedCategories: string[];
}

export default function CategorySelector({
	categories,
	selectedCategories,
}: CategorySelectorProps) {
	// const [activeCategory, setActiveCategory] = useState('All');
	const router = useRouter();
	const searchParams = useSearchParams();

	const toggleCategory = (category: string) => {
		const current = new URLSearchParams(Array.from(searchParams.entries()));
		const newCategories = selectedCategories.includes(category)
			? selectedCategories.filter(c => c !== category)
			: [...selectedCategories, category];

		newCategories.length > 0
			? current.set('categories', newCategories.join(','))
			: current.delete('categories');

		const search = current.toString();
		const query = search ? `?${search}` : '';
		router.push(`/account/lenses${query}`);
	};

	return (
		<>
			{categories.map(category => (
				<Button
					key={category}
					variant={
						selectedCategories.includes(category) ? 'secondary' : 'ghost'
					}
					className='w-full justify-start mb-1'
					onClick={() => toggleCategory(category)}
				>
					{category.charAt(0).toUpperCase() + category.slice(1)}
				</Button>
			))}
		</>
	);
}
