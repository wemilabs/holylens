'use client';

import { useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
	const [user, setUser] = useState<User | null>(null);
	const router = useRouter();

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const signIn = async (email: string, password: string) => {
		try {
			const response = await fetch('/api/auth/sign-in', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) throw new Error('SignIn failed');

			const data = await response.json();
			setUser(data.user);
			localStorage.setItem('user', JSON.stringify(data.user));
			localStorage.setItem('token', data.token);

			// Redirect to home page after successful login
			router.push('/');
			toast.success('Welcome back!', {
				description: 'You have successfully signed in.',
			});
		} catch (error) {
			toast.error('Sign in failed', {
				description: 'Please check your credentials and try again.',
			});
			throw error;
		}
	};

	const signUp = async (name: string, email: string, password: string) => {
		try {
			const response = await fetch('/api/auth/sign-up', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, password }),
			});

			if (!response.ok) throw new Error('Registration failed');

			const data = await response.json();
			setUser(data.user);
			localStorage.setItem('user', JSON.stringify(data.user));
			localStorage.setItem('token', data.token);

			// Redirect to home page after successful registration
			router.push('/');
			toast.success('Welcome to HolyLens!', {
				description: 'Your account has been successfully created.',
			});
		} catch (error) {
			toast.error('Sign up failed', {
				description: 'An error occurred during registration. Please try again.',
			});
			throw error;
		}
	};

	const signOut = () => {
		setUser(null);
		localStorage.removeItem('user');
		localStorage.removeItem('token');

		// Redirect to home page after logging out
		router.push('/');
		toast.success('Logged out', {
			description: 'You have been successfully logged out.',
		});
	};

	const value: AuthContextType = {
		user,
		signIn,
		signUp,
		signOut,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
