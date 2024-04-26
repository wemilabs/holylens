'use client';

import { ThemeContext } from '@/context/ThemeContext';
import Image from 'next/image';
import React, { useContext } from 'react';

const ThemeToggle: React.FC = () => {
	const { toggle, theme } = useContext(ThemeContext);

	return (
		<div
			className={`w-10 h-5 rounded-[50px] cursor-pointer flex items-center justify-between bg-black relative ${
				theme === 'dark' ? 'bg-white' : 'bg-[#0f172a]'
			}`}
			onClick={toggle}
		>
			<Image src='/moon.webp' alt='' width={14} height={14} />
			<div
				className={`w-4 h-4 rounded-[50%] transition-all duration-300 ease-in-out bg-white absolute left-[1px] ${
					theme === 'dark' ? 'left-1 bg-[#0f172a]' : 'right-1 bg-white'
				}`}
			></div>
			<Image src='/sun.webp' alt='' width={14} height={14} />
		</div>
	);
};

export default ThemeToggle;
