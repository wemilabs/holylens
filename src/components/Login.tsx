// 'use client';
// import { useState } from 'react';

// const Login = ({ open }: { open: boolean }) => {
// 	const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);

// 	return (
// 		<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300 ease-in-out'>
// 			<div
// 				className='w-7 h-7 rounded mt-2 mr-2 float-right transition-all duration-300 ease-in-out hover:bg-red-600'
// 				onClick={() =>
// 					setIsOverlayOpen(prevIsOverlayOpen => !prevIsOverlayOpen)
// 				}
// 			>
// 				<svg
// 					xmlns='http://www.w3.org/2000/svg'
// 					fill='none'
// 					viewBox='0 0 24 24'
// 					strokeWidth={1.5}
// 					stroke='currentColor'
// 					className='w-6 h-6 text-gray-600 hover:text-white transition-all duration-300 ease-in-out relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
// 				>
// 					<path
// 						strokeLinecap='round'
// 						strokeLinejoin='round'
// 						d='M6 18L18 6M6 6l12 12'
// 					/>
// 				</svg>
// 			</div>

// 			<div className='bg-white py-8 px-6 shadow rounded-lg sm:px-10'>
// 				<h1 className='text-xl font-medium text-gray-700 text-center'>
// 					Join the HolyLens community
// 				</h1>
// 			</div>
// 		</div>
// 	);
// };

// export default Login;
