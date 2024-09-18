export default function TermsOfUse() {
	return (
		<div className='bg-white dark:bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-4xl mx-auto'>
				<h1 className='text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-8 text-center'>
					Terms of Use
				</h1>
				<div className='bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6'>
					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							1. Acceptance of Terms
						</h2>
						<p className='text-gray-700 dark:text-gray-300'>
							By accessing or using the HolyLens blog (the "Service"), you agree
							to be bound by these Terms of Use. If you do not agree to these
							terms, please do not use the Service.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							2. Description of Service
						</h2>
						<p className='text-gray-700 dark:text-gray-300'>
							HolyLens is a blog platform that allows users to read, write, and
							interact with blog posts on various topics.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							3. User Accounts
						</h2>
						<p className='text-gray-700 dark:text-gray-300'>
							To access certain features of the Service, you may be required to
							create an account. You are responsible for maintaining the
							confidentiality of your account information and for all activities
							that occur under your account.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							4. User Content
						</h2>
						<p className='text-gray-700 dark:text-gray-300'>
							You retain ownership of any content you submit to the Service. By
							submitting content, you grant HolyLens a non-exclusive, worldwide,
							royalty-free license to use, reproduce, modify, and distribute
							your content.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							5. Prohibited Conduct
						</h2>
						<p className='text-gray-700 dark:text-gray-300 mb-2'>
							You agree not to engage in any conduct that may:
						</p>
						<ul className='list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1'>
							<li>Violate any applicable laws or regulations</li>
							<li>Infringe on the rights of others</li>
							<li>Interfere with the operation of the Service</li>
							<li>Harass, threaten, or intimidate other users</li>
						</ul>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							6. Intellectual Property
						</h2>
						<p className='text-gray-700 dark:text-gray-300'>
							The Service and its original content, features, and functionality
							are owned by HolyLens and are protected by international
							copyright, trademark, patent, trade secret, and other intellectual
							property laws.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							7. Termination
						</h2>
						<p className='text-gray-700 dark:text-gray-300'>
							We may terminate or suspend your account and access to the Service
							immediately, without prior notice or liability, for any reason.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							8. Changes to Terms
						</h2>
						<p className='text-gray-700 dark:text-gray-300'>
							We reserve the right to modify or replace these Terms at any time.
							It is your responsibility to check these Terms periodically for
							changes.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							9. Contact Us
						</h2>
						<p className='text-gray-700 dark:text-gray-300'>
							If you have any questions about these Terms, please contact us at{' '}
							<a
								href='mailto:support@holylens.com'
								className='text-blue-600 dark:text-blue-400 hover:underline'
							>
								support@holylens.com
							</a>
							.
						</p>
					</section>
				</div>
			</div>
		</div>
	);
}
