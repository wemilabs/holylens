import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	experimental: {
		ppr: true,
		// reactCompiler: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'utfs.io',
				port: '',
				pathname: '/a/5n5vhs0v3c/**', // /a/uploadthing-app-id/**
			},
		],
	},
};

export default nextConfig;
