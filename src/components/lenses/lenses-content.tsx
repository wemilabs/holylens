import { getLenses } from '@/lib/actions/lens.actions';
import { LensesGrid } from './lenses-grid';

interface LensesContentProps {
	searchTerm?: string;
	selectedCategories?: string[];
}

export async function LensesContent({
	searchTerm,
	selectedCategories,
}: LensesContentProps) {
	const initialData = await getLenses(selectedCategories, 1, 10, searchTerm);

	const loadMore = async () => {
		'use server';
		const nextPage = initialData.currentPage + 1;
		if (nextPage <= initialData.totalPages) {
			const newData = await getLenses(
				selectedCategories,
				nextPage,
				10,
				searchTerm
			);
			return newData.lenses;
		}
		return [];
	};

	return (
		<LensesGrid
			initialLenses={initialData.lenses}
			totalPages={initialData.totalPages}
			currentPage={initialData.currentPage}
			loadMore={loadMore}
		/>
	);
}
