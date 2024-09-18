'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

interface SubmitButtonProps {
	text: string;
	className?: string;
	variant?:
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link'
		| null
		| undefined;
	isLoading?: boolean;
	handleStuff?: () => void;
}

const SubmitButton = ({
	text,
	className,
	variant,
	isLoading,
	handleStuff,
}: SubmitButtonProps) => {
	return (
		<>
			{!isLoading ? (
				<Button
					className={cn('w-full', className)}
					variant={variant}
					type='submit'
					onClick={handleStuff}
				>
					{text}
				</Button>
			) : (
				<Button
					disabled={isLoading}
					className={cn('w-full', className)}
					variant={variant}
				>
					<Loader className='mr-2 size-4 animate-spin' />
					Processing...
				</Button>
			)}
		</>
	);
};

export default SubmitButton;
