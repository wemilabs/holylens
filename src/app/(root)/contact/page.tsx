'use client';

import { motion as m } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

export default function ContactPage() {
	return (
		<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
			<m.h1
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center'
			>
				Get in Touch
			</m.h1>
			<div className='grid md:grid-cols-2 gap-12'>
				<m.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
						Contact Information
					</h2>
					<div className='space-y-4'>
						<div className='flex items-center space-x-3 text-gray-600 dark:text-gray-300'>
							<MapPin size={20} />
							<span>123 Meditation Lane, Mindful City, MC 12345</span>
						</div>
						<div className='flex items-center space-x-3 text-gray-600 dark:text-gray-300'>
							<Phone size={20} />
							<span>+1 (555) 123-4567</span>
						</div>
						<div className='flex items-center space-x-3 text-gray-600 dark:text-gray-300'>
							<Mail size={20} />
							<span>info@holylens.com</span>
						</div>
					</div>
					<div className='mt-8'>
						<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
							Follow Us
						</h3>
						<div className='flex space-x-4'>
							{['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map(social => (
								<m.a
									key={social}
									href='#'
									target='_blank'
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
								>
									{social}
								</m.a>
							))}
						</div>
					</div>
				</m.div>
				<m.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					<h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
						Send Us a Message
					</h2>
					<form className='space-y-4'>
						<div>
							<label
								htmlFor='name'
								className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
							>
								Name
							</label>
							<Input id='name' placeholder='Your Name' />
						</div>
						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
							>
								Email
							</label>
							<Input id='email' type='email' placeholder='your@email.com' />
						</div>
						<div>
							<label
								htmlFor='message'
								className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
							>
								Message
							</label>
							<Textarea
								id='message'
								placeholder='Your message here...'
								className='min-h-[150px]'
							/>
						</div>
						<Button className='w-full'>
							<Send className='mr-2 size-4' /> Send Message
						</Button>
					</form>
				</m.div>
			</div>
		</div>
	);
}
