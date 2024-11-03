'use client';

import { Button } from '@/components/ui/button';
import { LensCard } from '@/components/lenses/LensCard';
import { useOptimistic } from 'react';

interface LensesGridProps {
	initialLenses: Lens[];
	totalPages: number;
	currentPage: number;
	loadMore: () => Promise<Lens[]>;
}

export function LensesGrid({
	initialLenses,
	totalPages,
	currentPage,
	loadMore,
}: LensesGridProps) {
	const [optimisticLenses, addOptimisticLenses] = useOptimistic<Lens[]>(
		initialLenses,
		(state, newLenses) => [...state, ...newLenses]
		// (state: Lens[], newLenses: Lens[]) => [...state, ...newLenses]
	);

	const handleLoadMore = async () => {
		const newLenses = await loadMore();
		addOptimisticLenses(newLenses);
	};

	return (
		<div>
			<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
				{optimisticLenses.map(lens => (
					<LensCard key={lens._id} lens={lens} />
				))}
			</div>

			{optimisticLenses.length === 0 && (
				<p className='text-center text-muted-foreground mt-8'>
					No lenses found matching your search criteria.
				</p>
			)}

			{currentPage < totalPages && (
				<div className='mt-8 flex justify-center'>
					<Button onClick={handleLoadMore}>Load More</Button>
				</div>
			)}
		</div>
	);
}
