'use client';

import Link from 'next/link';

interface LensesListProps {
	data: Lens[];
}

const LensesList = ({ data }: LensesListProps) => {
	return (
		<div>
			<h1>Lenses List</h1>
			<ul>
				{data.map(lens => (
					<li key={lens._id} className='p-10'>
						<h1>
							{lens.title} - {lens.author.name}
						</h1>
						<Link
							href={`/lenses/${lens._id}`}
							className='underline text-blue-600'
						>
							Read more
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default LensesList;
