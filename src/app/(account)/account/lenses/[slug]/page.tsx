import { LensContent } from '@/components/lenses/lens-content';
import { getLensBySlug } from '@/lib/actions/lens.actions';
import { notFound } from 'next/navigation';

export default async function LensPage(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;
	const lens = await getLensBySlug(params.slug);

	if (!lens) notFound();

	return (
		<div className='flex-grow container mx-auto px-4'>
			<LensContent lens={lens} />
		</div>
	);
}
