'use client';

import LensCard from '@/components/account/lens-card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface Lens {
	_id: string;
	title: string;
	description: string;
	author: {
		name: string;
	};
	publishedDate: string;
	tags: string[];
	coverImage_url?: string;
	readTime?: string;
	likes_count?: number;
	comments_count?: number;
	favorites_count?: number;
	views_count?: number;
}

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
	// const [optimisticLenses, addOptimisticLenses] = useOptimistic<Lens[]>(
	// 	initialLenses,
	// 	(state, newLenses) => [...state, ...newLenses]
	// );
	const [lenses, setLenses] = useState<Lens[]>(initialLenses);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(currentPage);

	useEffect(() => {
		setLenses(initialLenses);
		setPage(currentPage);
	}, [initialLenses, currentPage]);

	// const handleLoadMore = async () => {
	// 	const newLenses = await loadMore();
	// 	addOptimisticLenses(newLenses);
	// };

	const handleLoadMore = async () => {
		setIsLoading(true);
		try {
			const newLenses = await loadMore();
			setLenses(prevLenses => [...prevLenses, ...newLenses]);
			setPage(prevPage => prevPage + 1);
		} catch (error) {
			console.error('Error loading more lenses:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className='space-y-4'>
				{lenses.map(lens => (
					<LensCard key={lens._id} lens={lens} />
				))}
			</div>

			{lenses.length === 0 && (
				<p className='text-center text-muted-foreground mt-8'>
					No lenses found matching your search criteria.
				</p>
			)}

			{page < totalPages && (
				<div className='mt-8 flex justify-center'>
					<Button onClick={handleLoadMore} disabled={isLoading}>
						{isLoading ? 'Loading...' : 'Load More'}
					</Button>
				</div>
			)}
		</>
	);
}
