import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				purpose: "url('/back3.webp')",
			},
			colors: {
				primary: '#f6f7f8',
				secondary: '#087ea4',
				secondaryHover: '#099dce',
				tertiary: '#111b21',
				dark: '#333',
			},
		},
	},
	plugins: [],
};
export default config;
