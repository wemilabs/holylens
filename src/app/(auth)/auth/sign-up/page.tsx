'use client';

import { motion as m } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Link from 'next/link';

export default function SignUpPage() {
	const [name, setName] = useState(''),
		[email, setEmail] = useState(''),
		[password, setPassword] = useState(''),
		[confirmPassword, setConfirmPassword] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle sign-up logic here
		console.log('Sign up with:', name, email, password);
	};

	return (
		<div className='max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12'>
			<m.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md'
			>
				<h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center'>
					Join Our Community
				</h1>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<label
							htmlFor='name'
							className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
						>
							Name
						</label>
						<Input
							id='name'
							type='text'
							value={name}
							onChange={e => setName(e.target.value)}
							required
						/>
					</div>
					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
						>
							Email
						</label>
						<Input
							id='email'
							type='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
					</div>
					<div>
						<label
							htmlFor='password'
							className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
						>
							Password
						</label>
						<Input
							id='password'
							type='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
						/>
					</div>
					<div>
						<label
							htmlFor='confirmPassword'
							className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
						>
							Confirm Password
						</label>
						<Input
							id='confirmPassword'
							type='password'
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
							required
						/>
					</div>
					<Button type='submit' className='w-full'>
						Sign Up
					</Button>
				</form>

				<div className='mt-4 text-center'>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						Already a member?{' '}
						<Link
							href='#'
							className='font-medium text-blue-600 dark:text-blue-400 hover:underline'
						>
							Sign in
						</Link>
					</p>
				</div>

				<div className='mt-6 text-center'>
					<p className='text-xs text-gray-500 dark:text-gray-400'>
						By signing up, you agree to our{' '}
						<Link
							href='/info/terms-of-service'
							className='text-blue-600 dark:text-blue-400 hover:underline'
						>
							Terms of Service
						</Link>{' '}
						and{' '}
						<Link
							href='/info/privacy'
							className='text-blue-600 dark:text-blue-400 hover:underline'
						>
							Privacy Policy.
						</Link>
					</p>
				</div>
			</m.div>
		</div>
	);
}
