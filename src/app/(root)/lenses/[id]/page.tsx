import { getLenses } from '@/app/actions/lenses.actions';

export default async function LensPage({ params }: { params: { id: string } }) {
	const result = await getLenses();

	if (!result.success) {
		return <div>Error: {result.error}</div>;
	}

	const { data } = result;
	if (!data) {
		return <div>Error: Data is undefined</div>;
	}

	const lens = data.find(lens => (lens as any)._id.toString() === params.id);

	return (
		<div>
			<h1>Lens id:{params.id}</h1>
			{lens ? (
				<>
					<h1>Title: {lens.title}</h1>
					<h2>Author: {lens.author.name}</h2>
					<p>Content: {lens.content}</p>
				</>
			) : (
				<div>Error: Lens not found</div>
			)}
		</div>
	);
}
