import Link from 'next/link';

const PurposeSection = () => {
	return (
		<section className='bg-white/50 rounded-md flex flex-col items-center justify-center text-center py-14 lg:py-32 text-white bg-purpose bg-no-repeat bg-center bg-cover'>
			<div className='text-[22px] lg:text-[28px] leading-8 italic'>
				Our Purpose
			</div>
			<div className='max-w-3xl text-3xl lg:text-6xl font-medium mt-7 mb-12'>
				Inspiring people, each and every day, through God’s Word.
			</div>
			<Link
				href={'/lenses'}
				className='text-base bg-secondary transition-colors duration-300 hover:bg-secondaryHover px-12 py-2 lg:py-3 rounded-full'
			>
				Our Lenses
			</Link>
		</section>
	);
};

export default PurposeSection;
