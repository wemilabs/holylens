import Link from 'next/link';
import { Button } from '../ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { Plus } from 'lucide-react';

const LensesContent = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Your Spiritual Lenses</CardTitle>
				<CardDescription>Create and manage your insights</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='space-y-4'>
					<div className='flex justify-between items-center'>
						<h3 className='text-lg font-medium'>Recent Lenses</h3>
						<Button>
							<Link href='/dashboard/lenses/new'>
								<Plus className='size-4 text-white dark:text-gray-900' />
							</Link>
						</Button>
					</div>
					<div className='grid gap-4 md:grid-cols-2'>
						{[
							'Mindfulness Techniques',
							'Emotional Intelligence',
							'Spiritual Growth',
							'Inner Peace',
						].map(lens => (
							<Card key={lens}>
								<CardHeader>
									<CardTitle className='text-md'>{lens}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className='text-sm text-muted-foreground'>
										Last edited 2 days ago
									</p>
									<Button variant='outline' size='sm' className='mt-2'>
										Edit
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default LensesContent;
