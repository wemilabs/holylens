'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/hooks/useAuth.hook';
import { AnimatePresence, motion as m } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import SubmitButton from './submit-button';

interface SignInModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSwitchToSignUp: () => void;
}

export function SignInModal({
	isOpen,
	onClose,
	onSwitchToSignUp,
}: SignInModalProps) {
	const [email, setEmail] = useState<string>(''),
		[password, setPassword] = useState<string>(''),
		[error, setError] = useState(''),
		[isLoading, setIsLoading] = useState<boolean>(false);
	const { signIn } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);
		try {
			await signIn(email, password);
			onClose();
		} catch (err) {
			setError('Invalid credentials');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AnimatePresence>
			{isOpen ? (
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
						<div className='flex justify-between items-center pb-6'>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
								Welcome Back!
							</h2>
							<Button variant='ghost' size='icon' onClick={onClose}>
								<X className='size-6' />
							</Button>
						</div>

						<form onSubmit={handleSubmit} className='space-y-4'>
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
									placeholder='example@example.com'
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
							{error ? <p className='text-red-500 text-sm'>{error}</p> : null}
							<SubmitButton text='Sign In' isLoading={isLoading} />
						</form>

						<div className='pt-4 flex flex-col items-center space-y-6'>
							<div className='text-sm text-gray-600 dark:text-gray-400'>
								Not a member?{' '}
								<button
									onClick={() => {
										onClose();
										onSwitchToSignUp();
									}}
									className='text-blue-600 dark:text-blue-400 hover:underline focus:outline-none'
								>
									Sign up
								</button>
							</div>
							<div className='text-xs text-gray-500 dark:text-gray-400'>
								Forgot your credentials or any trouble signing in?{' '}
								<Link
									href='#'
									className='text-blue-600 dark:text-gray-400 underline dark:hover:text-blue-400'
								>
									Get help.
								</Link>
							</div>
						</div>
					</m.div>
				</m.div>
			) : null}
		</AnimatePresence>
	);
}

interface SignUpModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSwitchToSignIn: () => void;
}

export function SignUpModal({
	isOpen,
	onClose,
	onSwitchToSignIn,
}: SignUpModalProps) {
	const [name, setName] = useState(''),
		[email, setEmail] = useState(''),
		[password, setPassword] = useState(''),
		[confirmPassword, setConfirmPassword] = useState(''),
		[error, setError] = useState(''),
		[isLoading, setIsLoading] = useState<boolean>(false);
	const { signUp } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);
		try {
			await signUp(name, email, password);
			onClose();
		} catch (err) {
			setError('Registration failed');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AnimatePresence>
			{isOpen ? (
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
						<div className='flex justify-between items-center pb-6'>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
								Join The Community
							</h2>
							<Button variant='ghost' size='icon' onClick={onClose}>
								<X className='h-6 w-6' />
							</Button>
						</div>

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
									placeholder='example@example.com'
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
							{error ? <p className='text-red-500 text-sm'>{error}</p> : null}
							<SubmitButton text='Join Us' isLoading={isLoading} />
						</form>

						<div className='pt-4 flex flex-col items-center space-y-6'>
							<div className='text-sm text-gray-600 dark:text-gray-400'>
								Already have an account?{' '}
								<button
									onClick={() => {
										onClose();
										onSwitchToSignIn();
									}}
									className='text-blue-600 dark:text-blue-400 hover:underline focus:outline-none'
								>
									Sign in
								</button>
							</div>
							<div className='text-xs text-gray-500 dark:text-gray-400'>
								By signing up, you agree to our{' '}
								<Link
									href='/legal/agreement'
									className='text-blue-600 dark:text-blue-400 hover:underline'
								>
									Terms of Service
								</Link>{' '}
								and{' '}
								<Link
									href='/legal/privacy-policy'
									className='text-blue-600 dark:text-blue-400 hover:underline'
								>
									Privacy Policy.
								</Link>
							</div>
						</div>
					</m.div>
				</m.div>
			) : null}
		</AnimatePresence>
	);
}
