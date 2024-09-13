'use client';

import HeroBanner from '@/components/home/HeroBanner';
import { FeaturedLenses } from '@/components/home/FeaturedLenses';
import { Newsletter } from '@/components/home/NewsLetter';
import { FAQ } from '@/components/home/FAQ';
import { Testimonials } from '@/components/home/Testimonials';
import { useAuth } from '@/lib/hooks/useAuth.hook';

export default function Home() {
	const { user } = useAuth();

	return (
		<>
			{user ? (
				<div className='bg-white dark:bg-gray-700 shadow overflow-hidden sm:rounded-lg'>
					<div className='px-4 py-5 sm:px-6'>
						<h3 className='text-lg leading-6 font-medium text-gray-900 dark:text-white'>
							User Information
						</h3>
						<p className='mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300'>
							Personal details of the logged-in user.
						</p>
					</div>
					<div className='border-t border-gray-200 dark:border-gray-600'>
						<dl>
							<div className='bg-gray-50 dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500 dark:text-gray-300'>
									Name
								</dt>
								<dd className='mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2'>
									{user.name}
								</dd>
							</div>
							<div className='bg-white dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500 dark:text-gray-300'>
									Email address
								</dt>
								<dd className='mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2'>
									{user.email}
								</dd>
							</div>
							<div className='bg-gray-50 dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500 dark:text-gray-300'>
									User ID
								</dt>
								<dd className='mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2'>
									{user.id}
								</dd>
							</div>
							<div className='bg-white dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-sm font-medium text-gray-500 dark:text-gray-300'>
									Role
								</dt>
								<dd className='mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2'>
									{user.role}
								</dd>
							</div>
						</dl>
					</div>
				</div>
			) : (
				<>
					<HeroBanner />
					<FeaturedLenses />
					<Testimonials />
					<Newsletter />
					<FAQ />
				</>
			)}
		</>
	);
}
