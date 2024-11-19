import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const handleError = (error: unknown) => {
	if (error instanceof Error) {
		console.error(error.message);
		throw new Error(`Error: ${error.message}`);
	} else if (typeof error === 'string') {
		console.error(error);
		throw new Error(`Error: ${error}`);
	} else {
		console.error(error);
		throw new Error(`Unknown error: ${JSON.stringify(error)}`);
	}
};

export const clearURLParam = (param: string) => {
	const url = new URL(window.location.href);
	switch (param) {
		case 'search':
			url.searchParams.delete(param);
			break;
		default:
			return window.location.pathname;
	}

	return url.toString(); // Return the updated URL
};
