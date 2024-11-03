import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	experimental: {
		ppr: true,
		// optimisticClientCache: true,
	},
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'utfs.io', port: '', pathname: '/**' },
		],
	},
};

export default nextConfig;
