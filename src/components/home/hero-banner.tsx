'use client';

import { motion as m } from 'framer-motion';
import { useState } from 'react';
import { SignInModal, SignUpModal } from '../shared/auth-modals';
import ShinyButton from '../shared/shiny-button';

const HeroBanner = () => {
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false),
		[isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

	const handleSwitchToSignUp = () => {
		setIsSignInModalOpen(false);
		setIsSignUpModalOpen(true);
	};

	const handleSwitchToSignIn = () => {
		setIsSignUpModalOpen(false);
		setIsSignInModalOpen(true);
	};

	// @ts-ignore
	return (
		<>
			<m.section
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center'
			>
				<h1 className='text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300'>
					Illuminating Perspectives
				</h1>
				<p className='text-xl text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300'>
					Explore thought-provoking articles on spirituality, philosophy, and
					personal growth.
				</p>

				<div>
					<ShinyButton
						onceClicked={() => setIsSignInModalOpen(true)}
						additionalClasses='dark:bg-gray-800 '
					>
						Start Reading
					</ShinyButton>
				</div>
			</m.section>

			<SignInModal
				isOpen={isSignInModalOpen}
				onClose={() => setIsSignInModalOpen(false)}
				onSwitchToSignUp={handleSwitchToSignUp}
			/>
			<SignUpModal
				isOpen={isSignUpModalOpen}
				onClose={() => setIsSignUpModalOpen(false)}
				onSwitchToSignIn={handleSwitchToSignIn}
			/>
		</>
	);
};

export default HeroBanner;
