import { getLenses } from '@/app/actions/lenses.actions';

export default async function LensesPage() {
	const result = await getLenses();

	if (!result.success) {
		return <div>Error: {result.error}</div>;
	}

	const { data } = result;

	return (
		<div>
			<h1>Lenses List</h1>
			<ul>
				{
					/*To resolve the error "'data' is possibly 'undefined'", can add a nullish coalescing operator (??) to provide a default value for if it is undefined */ (
						data ?? []
					).map(lens => (
						<li key={String(lens._id)} className='p-10'>
							<h1>
								{lens.title} - {lens.author.name}
							</h1>
							<p>{lens.content}</p>
						</li>
					))
				}
			</ul>
		</div>
	);
}
