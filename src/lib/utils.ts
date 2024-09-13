import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function parseJsonData<T>(data: T): T {
	try {
		if (typeof data === 'string') {
			return JSON.parse(data) as T;
		} else {
			return JSON.parse(JSON.stringify(data)) as T;
		}
	} catch (error) {
		console.error('Error parsing JSON data:', error);
		return data; // Return original data if parsing fails
	}
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
