import { Suspense } from 'react';
import { getCategories } from '@/lib/actions/lens.actions';
import { LensesContent } from '@/components/lenses/LensesContent';
import CategoryFilter from '@/components/lenses/CategoryFilter';
import SearchBar from '@/components/lenses/SearchBar';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonCard = () => {
	return (
		<div className='flex flex-col space-y-3'>
			<Skeleton className='h-[125px] w-[250px] rounded-xl bg-background text-foreground' />
			<div className='space-y-2'>
				<Skeleton className='h-4 w-[250px] bg-background text-foreground' />
				<Skeleton className='h-4 w-[200px] bg-background text-foreground' />
			</div>
		</div>
	);
};

export default async function LensesPage(props: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const searchParams = await props.searchParams;
	const categories = await getCategories();
	const searchTerm =
		typeof searchParams.search === 'string' ? searchParams.search : '';
	const selectedCategories =
		typeof searchParams.categories === 'string'
			? searchParams.categories.split(',')
			: [];

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
			<h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center'>
				Lenses
			</h1>

			<div className='flex flex-col md:flex-row gap-8'>
				<aside className='w-full md:w-64 flex-shrink-0'>
					<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
						Categories
					</h2>
					<CategoryFilter
						categories={categories}
						selectedCategories={selectedCategories}
					/>
				</aside>

				<div className='flex-grow'>
					<SearchBar initialSearchTerm={searchTerm} />

					<Suspense
						fallback={
							<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
								{[1, 2, 3].map(i => (
									<SkeletonCard key={i} />
								))}
							</div>
						}
					>
						<LensesContent
							searchTerm={searchTerm}
							selectedCategories={selectedCategories}
						/>
					</Suspense>
				</div>
			</div>
		</div>
	);
}
