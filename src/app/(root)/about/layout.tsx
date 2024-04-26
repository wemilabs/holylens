import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'About - HolyLens',
	description: 'HolyLens: Surely, everyone has a story to tell.',
};

export default function AboutLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
