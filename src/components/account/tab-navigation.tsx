'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '../ui/button';
import { Filter } from 'lucide-react';

interface TabNavigationProps {
	lensesContent: React.ReactNode;
	favoritesContent: React.ReactNode;
	communitiesContent: React.ReactNode;
	discussionsContent: React.ReactNode;
}

export default function TabNavigation({
	lensesContent,
	favoritesContent,
	communitiesContent,
	discussionsContent,
}: TabNavigationProps) {
	const [activeTab, setActiveTab] = useState('lenses');

	return (
		<Tabs value={activeTab} onValueChange={setActiveTab} className='space-y-4'>
			<TabsList>
				<TabsTrigger value='lenses'>Lenses</TabsTrigger>
				<TabsTrigger value='favorites'>Favorites</TabsTrigger>
				<TabsTrigger value='communities'>Communities</TabsTrigger>
				<TabsTrigger value='discussions'>Discussions</TabsTrigger>
			</TabsList>

			<div className='flex justify-between items-center mb-4'>
				<div className='text-sm text-muted-foreground'>
					Showing results for <span className='font-medium'>All</span>
				</div>
				<Button variant='outline' size='sm'>
					<Filter className='mr-2 h-4 w-4' /> Filter
				</Button>
			</div>

			<TabsContent value='lenses'>{lensesContent}</TabsContent>
			<TabsContent value='favorites'>{favoritesContent}</TabsContent>
			<TabsContent value='communities'>{communitiesContent}</TabsContent>
			<TabsContent value='discussions'>{discussionsContent}</TabsContent>
		</Tabs>
	);
}
