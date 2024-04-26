'use client';

import { ThemeContext } from '@/context/ThemeContext';
import React, { useContext, useEffect, useState } from 'react';

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { theme } = useContext(ThemeContext);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		// Render a placeholder or loading state when `mounted` is false
		return <div>Loading...</div>;
	}

	return <div className={theme}>{children}</div>;
};

export default ThemeProvider;
