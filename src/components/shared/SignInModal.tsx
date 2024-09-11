'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AnimatePresence, motion as m } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface SignInModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
	const [authorName, setAuthorName] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle sign-in logic here
		console.log('Sign in with:', authorName, password);
		onClose();
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<m.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
					onClick={onClose}
				>
					<m.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full'
						onClick={e => e.stopPropagation()}
					>
						<div className='flex justify-between items-center mb-6'>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
								Welcome Back!
							</h2>
							<Button variant='ghost' size='icon' onClick={onClose}>
								<X className='h-6 w-6' />
							</Button>
						</div>
						<form onSubmit={handleSubmit} className='space-y-4'>
							<div>
								<label
									htmlFor='authorName'
									className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
								>
									Author's Name
								</label>
								<Input
									id='authorName'
									type='text'
									value={authorName}
									onChange={e => setAuthorName(e.target.value)}
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
							<Button type='submit' className='w-full'>
								Sign In
							</Button>
						</form>

						<div className='mt-4 text-center'>
							<p className='text-sm text-gray-600 dark:text-gray-400'>
								Not a member?{' '}
								<Link
									href='/auth/sign-up'
									className='font-medium text-blue-600 dark:text-blue-400 hover:underline'
								>
									Join Us
								</Link>
							</p>
						</div>

						<div className='mt-4 text-center'>
							<p className='text-xs text-gray-600 dark:text-gray-400'>
								Forgot your credentials or any trouble signing in?{' '}
								<Link
									href='#'
									className='text-blue-600 dark:text-gray-400 underline dark:hover:text-blue-400'
								>
									Get help.
								</Link>
							</p>
						</div>

						<div className='mt-6 text-center'>
							<p className='text-xs text-gray-500 dark:text-gray-400'>
								By signing in, you agree to our{' '}
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
				</m.div>
			)}
		</AnimatePresence>
	);
}
