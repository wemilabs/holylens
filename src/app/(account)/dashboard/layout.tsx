import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';

import BackgroundAnimation from '@/components/dashboard/background-animation';
import Header from '@/components/dashboard/header';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/lib/context/AuthContext';
import { ThemeProvider } from '@/lib/providers/theme-provider';
import '@/styles/globals.css';

export const metadata: Metadata = {
	title: 'My HolyLens',
	description: 'Manage your spiritual growth here',
};

export default function DashboardLayout({
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
						<div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500'>
							<BackgroundAnimation />
							<div className='relative z-10'>
								<Header />
								<main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
									{children}
								</main>
								<Toaster richColors closeButton />
							</div>
						</div>
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
