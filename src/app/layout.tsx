import { Footer } from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { ThemeContextProvider } from '@/context/ThemeContext';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montSerrat = Montserrat({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
	title:
		"HolyLens - Exploring the depths of faith and life by the awakening of consciousness and mind through the lens of God's Word.",
	description:
		"HolyLens is a place where you can discover and dive into stories from writers all over the world. By sharing real experiences, precious advice, inspirational quotes, etc... you can help others grow, becoming wise and better. HolyLens it's like writing a book, without being a professional writer. Helping people by inspiring and motivating them each day.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html id='holyLens' lang='en' dir='ltr' data-theme='light'>
			<body className={`bg-[#f6f7f8] ${montSerrat.className}`}>
				<ThemeContextProvider>
					<Header />
					{children}
					<Footer />
				</ThemeContextProvider>
			</body>
		</html>
	);
}
