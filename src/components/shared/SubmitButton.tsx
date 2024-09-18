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
}

const SubmitButton = ({
	text,
	className,
	variant,
	isLoading,
}: SubmitButtonProps) => {
	return (
		<>
			{!isLoading ? (
				<Button
					className={cn('w-full', className)}
					variant={variant}
					type='submit'
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
