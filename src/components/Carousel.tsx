'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const Carousel = ({ slidesImages }: { slidesImages: string[] }) => {
	// STATE
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// EFFECT
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentImageIndex((currentImageIndex + 1) % slidesImages.length);
		}, 3000); // Change image every 03 seconds

		// Cleanup function to clear the interval when the component unmounts
		return () => clearInterval(timer);
	}, [currentImageIndex, slidesImages]);

	// const nextImage = () => {
	// 	setCurrentImageIndex((currentImageIndex + 1) % slidesImages.length);
	// };

	// const prevImage = () => {
	// 	setCurrentImageIndex(
	// 		(currentImageIndex - 1 + slidesImages.length) % slidesImages.length
	// 	);
	// };

	return (
		<>
			{/* <button
				type='button'
				onClick={prevImage}
				className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 '
			>
				Prev
			</button> */}
			<Image
				src={slidesImages[currentImageIndex]}
				alt='Hero banner picture'
				width={500}
				height={500}
				priority={true}
				className='w-full h-full xl:h-96 rounded-3xl'
				title='Hero banner picture'
			/>
			{/* <button
				type='button'
				onClick={nextImage}
				className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2'
			>Next
			</button> */}
		</>
	);
};

export default Carousel;
