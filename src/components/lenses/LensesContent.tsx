'use client';

import { LensCard } from '@/components/lenses/LensCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion as m } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface Lens {
	_id: string;
	title: string;
	description: string;
	content: string;
	slug: string;
	author: {
		name: string;
	};
	publishedDate: string;
	tags: string[];
	coverImage_url?: string;
	readTime?: string;
}

interface LensesContentProps {
	lensesPromise: Promise<Lens[]>;
	categoriesPromise: Promise<string[]>;
}

export function LensesContent({
	lensesPromise,
	categoriesPromise,
}: LensesContentProps) {
	const [lenses, setLenses] = useState<Lens[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [isLoading, setIsLoading] = useState(true);

	const observer = useRef<IntersectionObserver | null>(null);
	const lastLensElementRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasMore) {
					setPage(prevPage => prevPage + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[isLoading, hasMore]
	);

	useEffect(() => {
		setIsLoading(true);
		Promise.all([lensesPromise, categoriesPromise])
			.then(([lensesData, categoriesData]) => {
				setLenses(lensesData);
				setCategories(categoriesData);
				setIsLoading(false);
				setHasMore(lensesData.length >= 10); // Assuming we load 10 lenses per page
			})
			.catch(error => {
				console.error('Error fetching data:', error);

				toast.error('Error', {
					description: 'Failed to load lenses. Please try again later.',
				});
				setIsLoading(false);
			});
	}, [lensesPromise, categoriesPromise, toast]);

	useEffect(() => {
		if (page > 1) {
			fetchMoreLenses();
		}
	}, [page]);

	const fetchMoreLenses = async () => {
		try {
			const token = localStorage.getItem('token');
			if (!token) throw new Error('No authentication token found');

			const response = await fetch(`/api/lenses?page=${page}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) throw new Error('Failed to fetch more lenses');
			const newLenses = await response.json();
			setLenses(prevLenses => [...prevLenses, ...newLenses]);
			setHasMore(newLenses.length >= 10); // Assuming we load 10 lenses per page
		} catch (error) {
			console.error('Error fetching more lenses:', error);

			toast.error('Error', {
				description: 'Failed to load more lenses. Please try again later.',
			});
		}
	};

	const filteredLenses = lenses.filter(lens => {
		const matchesSearch =
			lens.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			lens.content.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategories =
			selectedCategories.length === 0 ||
			selectedCategories.some(cat => lens.tags.includes(cat));
		return matchesSearch && matchesCategories;
	});

	if (filteredLenses.length === 0)
		return (
			<m.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className='text-center text-muted-foreground mt-8'
			>
				No lenses yet. Start writing some!
			</m.p>
		);

	const toggleCategory = (category: string) => {
		setSelectedCategories(prev =>
			prev.includes(category)
				? prev.filter(c => c !== category)
				: [...prev, category]
		);
	};

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
			<m.h1
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center'
			>
				Lenses
			</m.h1>

			<div className='flex flex-col md:flex-row gap-8'>
				<m.aside
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className='w-full md:w-64 flex-shrink-0'
				>
					<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
						Categories
					</h2>
					<div className='space-y-2'>
						{categories.map(category => (
							<button
								key={category}
								onClick={() => toggleCategory(category)}
								className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
									selectedCategories.includes(category)
										? 'bg-primary text-primary-foreground'
										: 'bg-background text-foreground hover:bg-accent hover:text-accent-foreground'
								}`}
							>
								{category}
							</button>
						))}
					</div>
				</m.aside>

				<div className='flex-grow'>
					<m.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className='mb-8'
					>
						<div className='flex max-w-md mx-auto'>
							<Input
								type='text'
								placeholder='Search lenses...'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								className='rounded-r-none focus:ring-0 focus:border-input'
							/>
							<Button
								className='rounded-l-none'
								onClick={() => setSearchTerm('')}
							>
								{searchTerm ? (
									<X className='h-4 w-4' />
								) : (
									<Search className='h-4 w-4' />
								)}
							</Button>
						</div>
					</m.div>

					<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
						{filteredLenses?.map((lens, index) => (
							<m.div
								key={lens._id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<LensCard lens={lens} />
							</m.div>
						))}
					</div>

					{isLoading ? (
						<div className='text-center mt-8'>Loading more lenses...</div>
					) : null}
				</div>
			</div>
		</div>
	);
}
