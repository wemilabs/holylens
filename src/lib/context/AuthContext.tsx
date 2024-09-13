'use client';

import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
	};

	const signUp = async (name: string, email: string, password: string) => {
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
	};

	const signOut = () => {
		setUser(null);
		localStorage.removeItem('user');
		localStorage.removeItem('token');

		// Redirect to home page after logging out
		router.push('/');
	};

	const value: AuthContextType = {
		user,
		signIn,
		signUp,
		signOut,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
