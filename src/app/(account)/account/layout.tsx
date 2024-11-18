import { Toaster } from '@/components/ui/sonner';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';

import { AuthProvider } from '@/lib/context/AuthContext';
import { ThemeProvider } from '@/lib/providers/theme-provider';
import '@/styles/globals.css';
import Header from '@/components/account/header';

export const metadata: Metadata = {
	title: 'HolyLens - Illuminating perspectives by awakening your mindfulness',
	description:
		'Explore thought-provoking articles on spirituality, philosophy, and personal growth',
};

export default function AccountLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html id='holyLens' lang='en' dir='ltr'>
			<body className={GeistSans.className}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					disableTransitionOnChange={false}
					enableSystem
				>
					<AuthProvider>
						<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
							<Header />
							<main className='container mx-auto px-4 pt-28 pb-8'>
								{children}
							</main>
						</div>
						<Toaster richColors closeButton />
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
