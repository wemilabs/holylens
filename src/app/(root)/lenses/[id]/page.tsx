import { LensContent } from '@/components/lenses/LensContent';
import { getLensById } from '@/lib/actions/lens.actions';
import { notFound } from 'next/navigation';

export default async function LensPage({ params }: { params: { id: string } }) {
	const lens = await getLensById(params.id);

	if (!lens) notFound();

	return (
		<div className='flex-grow container mx-auto px-4 py-8'>
			<LensContent lens={lens} />
		</div>
	);
}
