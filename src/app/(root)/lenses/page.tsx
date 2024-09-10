import LensesList from '@/components/LensesList';
import { getLenses } from '@/lib/actions/lenses.actions';

export default async function LensesPage() {
	const data = (await getLenses()) as Lens[];

	return <LensesList data={data} />;
}
