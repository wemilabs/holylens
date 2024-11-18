'use client';

import CircularMenu from '@/components/dashboard/circular-menu';
import CommunityContent from '@/components/dashboard/community-content';
import LensesContent from '@/components/dashboard/lenses-content';
import OverviewContent from '@/components/dashboard/overview-content';
import ScheduleContent from '@/components/dashboard/schedule-content';
import SettingsContent from '@/components/dashboard/settings-content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/hooks/useAuth.hook';
import { AnimatePresence, motion } from 'framer-motion';
import {
	BarChart,
	CalendarDays,
	FileText,
	Settings,
	Users,
} from 'lucide-react';
import { useState } from 'react';

export default function DashboardPage() {
	const [activeTab, setActiveTab] = useState('overview');
	const { user } = useAuth();

	const menuItems = [
		{ name: 'Overview', icon: BarChart, tab: 'overview' },
		{ name: 'My Lenses', icon: FileText, tab: 'lenses' },
		{ name: 'Schedule', icon: CalendarDays, tab: 'schedule' },
		{ name: 'Settings', icon: Settings, tab: 'settings' },
		{ name: 'Community', icon: Users, tab: 'community' },
	];

	return (
		<>
			<div className='flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10'>
				<CircularMenu
					items={menuItems}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>

				<div className='flex-1 w-full max-w-3xl'>
					<AnimatePresence mode='wait'>
						<motion.div
							key={activeTab}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
						>
							<Tabs value={activeTab} onValueChange={setActiveTab}>
								<TabsList className='hidden'>
									{menuItems.map(item => (
										<TabsTrigger key={item.tab} value={item.tab}>
											{item.name}
										</TabsTrigger>
									))}
								</TabsList>

								<TabsContent value='overview'>
									<OverviewContent />
								</TabsContent>

								<TabsContent value='lenses'>
									<LensesContent />
								</TabsContent>

								<TabsContent value='schedule'>
									<ScheduleContent />
								</TabsContent>

								<TabsContent value='community'>
									<CommunityContent />
								</TabsContent>

								<TabsContent value='settings'>
									<SettingsContent user={user} />
								</TabsContent>
							</Tabs>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</>
	);
}
