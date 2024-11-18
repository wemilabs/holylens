import { Button } from '../ui/button';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const SettingsContent = ({ user }: { user: any }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Your Spiritual Profile</CardTitle>
				<CardDescription>Customize your journey settings</CardDescription>
			</CardHeader>
			<CardContent>
				<form className='space-y-4'>
					<div className='grid w-full max-w-sm items-center gap-1.5'>
						<Label htmlFor='name'>Spiritual Name</Label>
						<Input type='text' id='name' defaultValue={user?.name} />
					</div>
					<div className='grid w-full max-w-sm items-center gap-1.5'>
						<Label htmlFor='email'>Email</Label>
						<Input type='email' id='email' defaultValue={user?.email} />
					</div>
					<div className='grid w-full max-w-sm items-center gap-1.5'>
						<Label htmlFor='bio'>Personal Mantra</Label>
						<Input
							type='text'
							id='bio'
							defaultValue={
								/*user?.bio ??*/ 'This is a placeholder for your personal mantra'
							}
							placeholder='A short phrase that guides your spiritual journey'
						/>
					</div>
					<Button type='submit'>Update Journey</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default SettingsContent;
