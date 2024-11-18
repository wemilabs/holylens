import { LensContent } from '@/components/lenses/lens-content';
import { getLensById } from '@/lib/actions/lens.actions';
import { notFound } from 'next/navigation';

export default async function LensPage(props: {
	params: Promise<{ id: string }>;
}) {
	const params = await props.params;
	const lens = await getLensById(params.id);

	if (!lens) notFound();

	return (
		<div className='flex-grow container mx-auto px-4 py-8'>
			<LensContent lens={lens} />
		</div>
	);
}
