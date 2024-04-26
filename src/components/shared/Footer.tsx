import Link from 'next/link';
import Logo from './Logo';

/**
 * Renders the footer component with various sections including links and text.
 *
 * @return {JSX.Element} The rendered footer component
 */
export const Footer = (): JSX.Element => {
	return (
		<footer className='bg-[#111b21] text-white'>
			<div className='p-6 lg:px-32 lg:pt-24 lg:pb-16'>
				<div className='grid grid-cols-5 space-x-8'>
					<div>
						<Link href={'/'}>
							<Logo />
						</Link>
					</div>
					<div>
						<span className='text-xs'>What we do</span>
						<ul className=''>
							<li className='pt-6'>
								<Link href={'/articles'} className='hover:underline'>
									Articles
								</Link>
							</li>
							<li className='pt-3'>#Blog</li>
							<li className='pt-3'>
								<Link href={'/podcasts'} className='hover:underline'>
									Podcasts
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<span className='text-xs'>About HolyLens</span>
						<ul className=''>
							<li className='pt-6'>
								<Link href={'/about'} className='hover:underline'>
									Mission
								</Link>
							</li>
							<li className='pt-3'>
								<Link href={'/stories'} className='hover:underline'>
									Stories
								</Link>
							</li>
							<li className='pt-3'>
								<Link href={'/careers'} className='hover:underline'>
									Careers
								</Link>
							</li>
							<li className='pt-3'>
								<Link href={'/give'} className='hover:underline'>
									Give
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<span className='text-xs'>Partners</span>
						<ul className=''>
							<li className='pt-6'>#Content Partners</li>
							<li className='pt-3'>#Churches</li>
							<li className='pt-3'>
								<Link href={'/volunteers'} className='hover:underline'>
									Volunteers
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<span className='text-xs'>Need help?</span>
						<ul className=''>
							<li className='pt-6'>
								<Link href={'/contact'} className='hover:underline'>
									Contact Us
								</Link>
							</li>
							<li className='pt-3'>
								<Link href={'/faq'} className='hover:underline'>
									FAQ
								</Link>
							</li>
							<li className='pt-3'>
								<Link href={'/support'} className='hover:underline'>
									Support
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className='w-full md:w-3/4 h-[1px] m-auto bg-gray-700'></div>

			<div className='p-6 lg:px-32 lg:py-10'>
				<div className='text-xs text-center'>
					@ 2024 HolyLens Foundation |{' '}
					<span>
						<Link href={'/privacy'} className='hover:underline'>
							Privacy Policy
						</Link>
					</span>{' '}
					|{' '}
					<span>
						<Link href={'/terms'} className='hover:underline'>
							Terms of Use
						</Link>
					</span>
				</div>
			</div>
		</footer>
	);
};
