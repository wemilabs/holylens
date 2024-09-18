/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'utfs.io', port: '', pathname: '/**' },
			{
				protocol: 'https',
				hostname: 'ik.imagekit.io',
				port: '',
				pathname: '/vercel/**',
			},
		],
	},
};

export default nextConfig;
