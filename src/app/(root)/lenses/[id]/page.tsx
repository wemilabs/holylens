import { Button } from '@/components/ui/button';
import { getLensById } from '@/lib/actions/lenses.actions';

export default async function LensPage({ params }: { params: { id: string } }) {
	const data = (await getLensById(params.id)) as Lens; // Type assertion to get the correct type

	return (
		<div>
			<Button>Back</Button>
			<h1>Lens id:{params.id}</h1>
			<h1>Title: {data.title}</h1>
			<h2>Author: {data.author.name}</h2>
			<p>Content: {data.content}</p>
		</div>
	);
}
