import { LensesContent } from '@/components/lenses/LensesContent';
import { getCategories, getLenses } from '@/lib/actions/lens.actions';
import { Suspense } from 'react';

export default async function LensesPage() {
	let lensesPromise, categoriesPromise;

	try {
		lensesPromise = getLenses();
		categoriesPromise = getCategories();
	} catch (error) {
		console.error('Error fetching data:', error);
		return <div>Error loading lenses. Please try again later.</div>;
	}

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<LensesContent
				lensesPromise={lensesPromise}
				categoriesPromise={categoriesPromise}
			/>
		</Suspense>
	);
}
