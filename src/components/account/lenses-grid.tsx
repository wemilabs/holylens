'use client';

import LensCard from '@/components/account/lens-card';
import { Loader } from 'lucide-react';
import { useState, useEffect /*, useOptimistic*/, useRef } from 'react';

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
	const [lenses, setLenses] = useState<Lens[]>(initialLenses),
		[isLoading, setIsLoading] = useState(false),
		[page, setPage] = useState(currentPage);

	const observer = useRef<IntersectionObserver | null>(null),
		lastLensRef = useRef<HTMLDivElement | null>(null);

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

	useEffect(() => {
		setLenses(initialLenses);
		setPage(currentPage);
	}, [initialLenses, currentPage]);

	useEffect(() => {
		if (observer.current) observer.current.disconnect();

		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && page < totalPages) {
				handleLoadMore(); // Call the load more function when the last lens is visible
			}
		});

		if (lastLensRef.current) {
			observer.current.observe(lastLensRef.current);
		}
	}, [lastLensRef, page, totalPages]);

	return (
		<>
			<div className='space-y-4'>
				{lenses.map((lens, index) => (
					<div
						ref={index === lenses.length - 1 ? lastLensRef : null}
						key={lens._id}
					>
						<LensCard lens={lens} />
					</div>
				))}
			</div>

			{lenses.length === 0 ? (
				<p className='text-center text-muted-foreground mt-8'>
					No lenses found matching your search criteria.
				</p>
			) : null}

			{isLoading ? (
				<div className='mt-8 flex justify-center'>
					<Loader className='size-10 animate-spin' />
				</div>
			) : null}
		</>
	);
}
