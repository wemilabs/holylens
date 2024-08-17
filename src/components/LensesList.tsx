'use client';

import { useRouter } from 'next/navigation';

interface LensesListProps {
	data: any[];
}

const LensesList = ({ data }: LensesListProps) => {
	const router = useRouter();

	return (
		<div>
			<h1>Lenses List</h1>
			<ul>
				{data.map(lens => (
					<li
						key={lens._id}
						className='p-10'
						onClick={() => router.push(`/lenses/${lens._id}`)}
					>
						<h1>
							{lens.title} - {lens.author.name}
						</h1>
						<p>{lens.content}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default LensesList;
