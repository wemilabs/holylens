import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';

import { AuthProvider } from '@/lib/context/AuthContext';
import { ThemeProvider } from '@/lib/providers/theme-provider';
import './globals.css';

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
		<html id='holyLens' lang='en' dir='ltr' data-theme='light'>
			<body className={GeistSans.className}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange={false}
				>
					<AuthProvider>
						<div className='min-h-screen flex flex-col'>
							<Header />
							<main className='flex-grow bg-gray-50 dark:bg-gray-800 transition-colors duration-300 pt-24'>
								{children}
							</main>
							<Footer />
						</div>
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
