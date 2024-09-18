export default function PrivacyPolicy() {
	return (
		<div className='bg-white dark:bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-4xl mx-auto'>
				<h1 className='text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-8 text-center'>
					Privacy Policy
				</h1>
				<div className='bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6'>
					<p className='text-gray-700 dark:text-gray-300'>
						This Privacy Policy describes how HolyLens ("we", "us", or "our")
						collects, uses, and shares your personal information when you use
						our blog service (the "Service").
					</p>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							1. Information We Collect
						</h2>
						<p className='text-gray-700 dark:text-gray-300 mb-2'>
							We collect information you provide directly to us, such as when
							you create an account, post content, or communicate with us. This
							may include:
						</p>
						<ul className='list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1'>
							<li>Name</li>
							<li>Email address</li>
							<li>Profile information</li>
							<li>Content you post on the Service</li>
						</ul>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							2. How We Use Your Information
						</h2>
						<p className='text-gray-700 dark:text-gray-300 mb-2'>
							We use the information we collect to:
						</p>
						<ul className='list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1'>
							<li>Provide, maintain, and improve the Service</li>
							<li>Communicate with you about the Service</li>
							<li>Personalize your experience</li>
							<li>Analyze how the Service is used</li>
						</ul>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							3. Sharing of Information
						</h2>
						<p className='text-gray-700 dark:text-gray-300 mb-2'>
							We may share your information in the following circumstances:
						</p>
						<ul className='list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1'>
							<li>With your consent</li>
							<li>To comply with legal obligations</li>
							<li>To protect our rights or the rights of others</li>
							<li>In connection with a merger, sale, or acquisition</li>
						</ul>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							4. Data Security
						</h2>
						<p className='text-gray-700 dark:text-gray-300'>
							We implement reasonable security measures to protect your personal
							information. However, no method of transmission over the Internet
							or electronic storage is 100% secure.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							5. Your Rights
						</h2>
						<p className='text-gray-700 dark:text-gray-300'>
							You have the right to access, correct, or delete your personal
							information. You may also have the right to object to or restrict
							certain processing of your information.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							6. Children's Privacy
						</h2>
						<p className='text-gray-700 dark:text-gray-300'>
							The Service is not intended for children under the age of 13. We
							do not knowingly collect personal information from children under
							13.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							7. Changes to This Policy
						</h2>
						<p className='text-gray-700 dark:text-gray-300'>
							We may update this Privacy Policy from time to time. We will
							notify you of any changes by posting the new Privacy Policy on
							this page.
						</p>
					</section>

					<section>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
							8. Contact Us
						</h2>
						<p className='text-gray-700 dark:text-gray-300'>
							If you have any questions about this Privacy Policy, please
							contact us at{' '}
							<a
								href='mailto:privacy@holylens.com'
								className='text-blue-600 dark:text-blue-400 hover:underline'
							>
								privacy@holylens.com
							</a>
							.
						</p>
					</section>
				</div>
			</div>
		</div>
	);
}
