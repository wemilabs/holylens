'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
	categories: string[];
	selectedCategories: string[];
}

const CategoryFilter = ({
	categories,
	selectedCategories,
}: CategoryFilterProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const toggleCategory = (category: string) => {
		const current = new URLSearchParams(Array.from(searchParams.entries()));
		const newCategories = selectedCategories.includes(category)
			? selectedCategories.filter(c => c !== category)
			: [...selectedCategories, category];

		if (newCategories.length > 0) {
			current.set('categories', newCategories.join(','));
		} else {
			current.delete('categories');
		}

		const search = current.toString();
		const query = search ? `?${search}` : '';
		router.push(`/lenses${query}`);
	};

	return (
		<div className='space-y-2'>
			{categories.map(category => (
				<Button
					key={category}
					onClick={() => toggleCategory(category)}
					className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
						selectedCategories.includes(category)
							? 'bg-primary text-primary-foreground'
							: 'bg-background text-foreground hover:bg-accent hover:text-accent-foreground'
					}`}
				>
					{category}
				</Button>
			))}
		</div>
	);
};

export default CategoryFilter;
