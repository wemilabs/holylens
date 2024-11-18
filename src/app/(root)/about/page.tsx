'use client';

import { motion as m } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
	return (
		<m.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20'
		>
			<h1 className='text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300'>
				About HolyLens
			</h1>
			<div className='prose dark:prose-invert max-w-none'>
				<p className='text-xl text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300'>
					HolyLens is a sanctuary for those seeking spiritual growth,
					philosophical insights, and personal development. Our mission is to
					illuminate perspectives and foster a community of mindful,
					introspective individuals.
				</p>
				<Image
					src='https://utfs.io/a/5n5vhs0v3c/fXNe0o275jNhBrVgbhzJn8Dcu7oflzN9MPFR6OS4CegQLITa'
					alt='Group meditation'
					width={1200}
					height={630}
					className='rounded-lg shadow-md mb-8'
				/>
				<h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300'>
					Our Vision
				</h2>
				<p className='text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300'>
					We envision a world where individuals are empowered to explore the
					depths of their consciousness, embrace diverse philosophical
					traditions, and cultivate a life of meaning and purpose.
				</p>
				<h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300'>
					What We Offer
				</h2>
				<ul className='list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300'>
					<li>
						In-depth articles on spirituality, philosophy, and personal growth
					</li>
					<li>Practical guides for meditation and mindfulness practices</li>
					<li>Interviews with thought leaders and spiritual practitioners</li>
					<li>Book reviews and recommendations for further exploration</li>
					<li>A supportive community for discussion and shared learning</li>
				</ul>
				<h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300'>
					Our Team
				</h2>
				<p className='text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300'>
					HolyLens is brought to you by a diverse team of writers, researchers,
					and practitioners passionate about spiritual growth and philosophical
					inquiry. Our contributors come from various backgrounds, including
					psychology, religious studies, philosophy, and meditation instruction.
				</p>
				<h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300'>
					Join Our Journey
				</h2>
				<p className='text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300'>
					We invite you to join us on this transformative journey of
					self-discovery and spiritual exploration. Whether you're a seasoned
					practitioner or just beginning your quest for deeper understanding,
					HolyLens is here to support and inspire you.
				</p>
				<m.div
					className='max-w-fit'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Link
						href='/lenses'
						className='inline-flex h-10 items-center justify-center rounded-md bg-gray-900 dark:bg-white px-8 text-sm font-medium text-white dark:text-gray-900 shadow transition-colors hover:bg-gray-800 dark:hover:bg-gray-100'
					>
						Explore Our Lenses
					</Link>
				</m.div>
			</div>
		</m.section>
	);
}
