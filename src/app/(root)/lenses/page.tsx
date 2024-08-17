import { getLenses } from '@/app/actions/lenses.actions';
import LensesList from '@/components/LensesList';

export default async function LensesPage() {
	const result = await getLenses();

	if (!result.success) {
		return <div>Error: {result.error}</div>;
	}

	const { data } = result;
	if (!data) {
		return <div>Error: Data is undefined</div>;
	}

	// Convert complex objects to plain objects
	const plainData = data.map(lens => ({
		...lens,
		_id: lens._id?.toString(), // Convert ObjectId to string
		author: {
			...lens.author,
			_id: lens.author._id.toString(), // Convert ObjectId to string
		},
	}));

	return <LensesList data={plainData} />;
}
