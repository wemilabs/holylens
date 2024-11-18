'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ShinyButtonProps {
	children: React.ReactNode;
	onceClicked: () => void;
	additionalClasses?: string;
}

const ShinyButton = ({
	children,
	onceClicked,
	additionalClasses,
}: ShinyButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<Button
			className='group transform bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 hover:ring-2 hover:ring-brand-700 hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-offset-2'
			onClick={onceClicked}
		>
			{children}

			<div
				className={cn(
					'ease-\\[cubic-bezier(0.19,1,0.22,1)\\] absolute -left-[54px] -top-[25px] -z-10 w-8 h-[90px] rotate-[35deg] bg-white opacity-0 group-hover:opacity-20 transition-all duration-500 group-hover:left-[120%]',
					additionalClasses
				)}
			/>
		</Button>
	);
};

export default ShinyButton;
