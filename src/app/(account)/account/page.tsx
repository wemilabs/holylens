import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Users, Plus } from 'lucide-react';
import SearchForm from '@/components/account/search-form';
import CategorySelector from '@/components/account/category-selector';
import TabNavigation from '@/components/account/tab-navigation';
import { getCategories } from '@/lib/actions/lens.actions';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { LensesContent } from '@/components/account/lenses-content';

const SkeletonCard = () => {
	return (
		<div className='flex flex-col space-y-1'>
			<Skeleton className='h-28 rounded-xl bg-muted' />
			<div className='space-y-2'>
				<Skeleton className='h-8 w-3/4 bg-muted' />
				<Skeleton className='h-8 w-1/2 bg-muted' />
			</div>
		</div>
	);
};

// const categories = [
// 	'Personal Growth',
// 	'Wellness',
// 	'Yoga',
// 	'Buddhism',
// 	'Christianity',
// 	'Islam',
// 	'Hinduism',
// 	'Taoism',
// 	'New Age',
// 	'Astrology',
// ];

const communities = [
	{ id: 1, name: 'Meditation Masters', members: 1200 },
	{ id: 2, name: 'Spiritual Growth', members: 850 },
	{ id: 3, name: 'Mindful Living', members: 1500 },
];

const discussions = [
	{ id: 1, title: 'How to start a daily meditation practice?', replies: 25 },
	{ id: 2, title: 'Favorite gratitude journaling prompts', replies: 18 },
	{
		id: 3,
		title: 'Dealing with negative thoughts during meditation',
		replies: 32,
	},
];

export default async function AccountPage(props: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const favoritesContent = (
		<Card>
			<CardHeader>
				<CardTitle>Your Favorite Lenses</CardTitle>
				<CardDescription>
					Lenses you've marked as favorites will appear here.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p>You haven't favorited any lenses yet.</p>
			</CardContent>
		</Card>
	);

	const communitiesContent = (
		<div className='space-y-4'>
			{communities.map(community => (
				<Card key={community.id}>
					<CardHeader>
						<CardTitle>{community.name}</CardTitle>
						<CardDescription>{community.members} members</CardDescription>
					</CardHeader>
					<CardContent>
						<Button variant='outline'>
							<Users className='mr-2 size-4' /> Join Community
						</Button>
					</CardContent>
				</Card>
			))}
		</div>
	);

	const discussionsContent = (
		<div className='space-y-4'>
			{discussions.map(discussion => (
				<Card key={discussion.id}>
					<CardHeader>
						<CardTitle>{discussion.title}</CardTitle>
						<CardDescription>{discussion.replies} replies</CardDescription>
					</CardHeader>
					<CardContent>
						<Button variant='outline'>
							<MessageCircle className='mr-2 h-4 w-4' /> Join Discussion
						</Button>
					</CardContent>
				</Card>
			))}
		</div>
	);
	const searchParams = await props.searchParams;
	const searchTerm =
		typeof searchParams.search === 'string' ? searchParams.search : '';
	const categories = await getCategories();
	const selectedCategories =
		typeof searchParams.categories === 'string'
			? searchParams.categories.split(',')
			: [];

	return (
		<div className='flex flex-col md:flex-row gap-8'>
			<aside className='w-full md:w-64 space-y-6 md:fixed md:top-28 md:left-4'>
				<Card>
					<CardHeader>
						<CardTitle>Categories</CardTitle>
					</CardHeader>
					<CardContent>
						<ScrollArea className='h-[300px] pr-4'>
							<CategorySelector
								categories={categories}
								selectedCategories={selectedCategories}
							/>
						</ScrollArea>
					</CardContent>
				</Card>
			</aside>

			<div className='flex-1 md:pl-72'>
				<div className='flex justify-between items-center mb-6'>
					<h1 className='text-3xl font-bold'>Within The Temple</h1>
					<Button>
						<Plus className='mr-2 size-4' /> Create Lens
					</Button>
				</div>

				<div className='md:hidden mb-4'>
					<SearchForm />
				</div>

				<TabNavigation
					lensesContent={
						<Suspense
							fallback={
								<div className='grid grid-rows-1 gap-4 md:grid-rows-2 lg:grid-rows-3'>
									{[1, 2, 3].map(i => (
										<SkeletonCard key={i} />
									))}
								</div>
							}
						>
							<LensesContent
								searchTerm={searchTerm}
								selectedCategories={selectedCategories}
							/>
						</Suspense>
					}
					favoritesContent={favoritesContent}
					communitiesContent={communitiesContent}
					discussionsContent={discussionsContent}
				/>
			</div>
		</div>
	);
}
