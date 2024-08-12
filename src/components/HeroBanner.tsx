import Link from 'next/link';
import Carousel from './Carousel';

/**
 * Function representing the HeroBanner component.
 */
const HeroBanner = () => {
	const heroBannerImages = [
		'/1.webp',
		'/2.webp',
		'/3.webp',
		'/4.webp',
		'/5.webp',
	];

	return (
		<div className='lg:grid lg:grid-cols-2 py-[80px] px-6'>
			<div className='flex flex-col gap-y-4 items-start md:pl-6 md:pt-14 border border-transparent revealed-from-the-top'>
				<h1 className='text-6xl lg:text-7xl font-medium text-center lg:text-left mx-auto lg:mx-0'>
					Be enlightened.
				</h1>
				<h2 className='pt-4 pb-8 text-xl font-normal text-center lg:text-left'>
					Immerse thyself into deep teachings, stories, thinking and experiences
					from writers on faith and life.
				</h2>
				<Link
					href='/lenses'
					type='button'
					className='mx-auto lg:mx-0 py-2 px-12 bg-secondary transition-colors duration-300 hover:bg-secondaryHover rounded-full text-white'
				>
					Let’s dive into
				</Link>
			</div>

			<div className='hidden lg:inline-block relative border border-transparent revealed-from-the-right'>
				<Carousel slidesImages={heroBannerImages} />
			</div>
		</div>
	);
};

export default HeroBanner;
