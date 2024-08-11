import { getUsers } from '@/app/actions/users.actions';

export default async function ArticlesPage() {
	const result = await getUsers();

	if (!result.success) {
		return <div>Error: {result.error}</div>;
	}

	const users = result.data;

	return (
		<div>
			<h1>Users List</h1>
			<ul>
				{
					/*To resolve the error 'users' is possibly 'undefined', can add a nullish coalescing operator (??) to provide a default value for users if it is undefined */ (
						users ?? []
					).map(user => (
						<li key={String(user._id)}>
							{user.name} - {user.email}
						</li>
					))
				}
			</ul>
		</div>
	);
}
