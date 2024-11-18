import { Button } from '../ui/button';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '../ui/card';

const CommunityContent = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Spiritual Community</CardTitle>
				<CardDescription>Connect with like-minded souls</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='space-y-4'>
					<div className='flex justify-between items-center'>
						<h3 className='text-lg font-medium'>Recent Discussions</h3>
						<Button>Start New Topic</Button>
					</div>
					<div className='space-y-2'>
						{[
							{
								title: 'The Power of Present Moment Awareness',
								replies: 23,
							},
							{
								title: 'Integrating Mindfulness into Daily Life',
								replies: 15,
							},
							{
								title: 'Exploring Different Meditation Techniques',
								replies: 19,
							},
							{
								title: 'The Role of Gratitude in Spiritual Growth',
								replies: 27,
							},
						].map(topic => (
							<Card key={topic.title}>
								<CardHeader>
									<CardTitle className='text-md'>{topic.title}</CardTitle>
									<CardDescription>
										{topic.replies} spiritual insights shared
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Button variant='outline' size='sm'>
										Join Discussion
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

export default CommunityContent;
