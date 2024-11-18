import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { BarChart, CalendarDays, FileText, Users } from 'lucide-react';

const OverviewContent = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Your Spiritual Journey</CardTitle>
				<CardDescription>
					A snapshot of your HolyLens experience
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Lenses Created
							</CardTitle>
							<FileText className='size-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>24</div>
							<p className='text-xs text-muted-foreground'>+2 this week</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Minds Touched
							</CardTitle>
							<Users className='size-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>573</div>
							<p className='text-xs text-muted-foreground'>+18% growth</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Upcoming Events
							</CardTitle>
							<CalendarDays className='size-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>3</div>
							<p className='text-xs text-muted-foreground'>
								Next: Mindfulness Workshop
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>
								Spiritual Growth
							</CardTitle>
							<BarChart className='size-4 text-muted-foreground' />
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>78%</div>
							<p className='text-xs text-muted-foreground'>
								Based on your activity
							</p>
						</CardContent>
					</Card>
				</div>
			</CardContent>
		</Card>
	);
};

export default OverviewContent;
