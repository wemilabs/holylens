import { Button } from '../ui/button';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '../ui/card';

const ScheduleContent = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Your Spiritual Calendar</CardTitle>
				<CardDescription>Upcoming events and practices</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='space-y-4'>
					<div className='flex justify-between items-center'>
						<h3 className='text-lg font-medium'>This Week's Journey</h3>
						<Button>Add Practice</Button>
					</div>
					<div className='space-y-2'>
						{[
							{
								name: 'Morning Meditation',
								date: 'Daily, 7:00 AM',
							},
							{
								name: 'Mindfulness Workshop',
								date: '2024-03-15 10:00 AM',
							},
							{
								name: 'Gratitude Journaling',
								date: 'Every Evening',
							},
							{
								name: 'Community Gathering',
								date: '2024-03-20 6:00 PM',
							},
						].map(event => (
							<Card key={event.name}>
								<CardHeader>
									<CardTitle className='text-md'>{event.name}</CardTitle>
									<CardDescription>{event.date}</CardDescription>
								</CardHeader>
							</Card>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ScheduleContent;
