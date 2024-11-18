import Footer from '@/components/home/footer';
import Header from '@/components/home/header';
import { Toaster } from '@/components/ui/sonner';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';

import { AuthProvider } from '@/lib/context/AuthContext';
import { ThemeProvider } from '@/lib/providers/theme-provider';
import '@/styles/globals.css';

export const metadata: Metadata = {
	title: 'HolyLens - Illuminating perspectives by awakening your mindfulness',
	description:
		'Explore thought-provoking articles on spirituality, philosophy, and personal growth',
};

export default function RootLayout({
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
						<div className='min-h-screen flex flex-col'>
							<Header />
							<main className='flex-grow bg-gray-50 dark:bg-gray-800 transition-colors duration-300 pt-24'>
								{children}
							</main>
							<Footer />
						</div>
						<Toaster richColors closeButton />
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
