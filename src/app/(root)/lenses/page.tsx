import { Suspense } from 'react';
import { getCategories } from '@/lib/actions/lens.actions';
import { LensesContent } from '@/components/lenses/LensesContent';
import CategoryFilter from '@/components/lenses/CategoryFilter';
import SearchBar from '@/components/lenses/SearchBar';

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
						fallback={<div className='text-center'>Loading lenses...</div>}
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
