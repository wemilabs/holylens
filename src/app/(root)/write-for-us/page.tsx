'use client';

import { motion as m } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { CheckCircle, PenTool, BookOpen, Users } from 'lucide-react';

export default function WriteForUsPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [topic, setTopic] = useState('');
	const [pitch, setPitch] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle submission logic here
		console.log('Submission:', { name, email, topic, pitch });
	};

	return (
		<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
			<m.h1
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center'
			>
				Write for HolyLens
			</m.h1>

			<m.section
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className='mb-12'
			>
				<p className='text-lg text-gray-600 dark:text-gray-300 mb-6'>
					We're always looking for insightful and thought-provoking content from
					passionate writers. If you have expertise in spirituality, philosophy,
					personal growth, or related fields, we'd love to hear from you.
				</p>

				<h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
					What We're Looking For
				</h2>
				<ul className='space-y-4 mb-6'>
					{[
						{
							icon: PenTool,
							text: 'Original, well-researched articles on spirituality, philosophy, and personal growth',
						},
						{
							icon: BookOpen,
							text: 'Practical guides and techniques for meditation, mindfulness, and self-improvement',
						},
						{
							icon: Users,
							text: 'Personal experiences and insights that can inspire and enlighten our readers',
						},
					].map((item, index) => (
						<m.li
							key={index}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
							className='flex items-start'
						>
							<item.icon className='w-6 h-6 text-blue-500 mr-2 flex-shrink-0 mt-1' />
							<span className='text-gray-600 dark:text-gray-300'>
								{item.text}
							</span>
						</m.li>
					))}
				</ul>

				<h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
					Submission Guidelines
				</h2>
				<ul className='list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-6'>
					<li>Articles should be between 1,000 and 2,500 words</li>
					<li>Include relevant sources and citations where applicable</li>
					<li>
						Write in a clear, engaging style accessible to a general audience
					</li>
					<li>Proofread your work for grammar and spelling errors</li>
				</ul>
			</m.section>

			<m.section
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.4 }}
			>
				<h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
					Pitch Your Idea
				</h2>
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
							htmlFor='topic'
							className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
						>
							Proposed Topic
						</label>
						<Input
							id='topic'
							type='text'
							value={topic}
							onChange={e => setTopic(e.target.value)}
							required
						/>
					</div>
					<div>
						<label
							htmlFor='pitch'
							className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
						>
							Brief Pitch (max 300 words)
						</label>
						<Textarea
							id='pitch'
							value={pitch}
							onChange={e => setPitch(e.target.value)}
							required
							className='h-32'
						/>
					</div>
					<Button type='submit' className='w-full'>
						<CheckCircle className='w-4 h-4 mr-2' />
						Submit Pitch
					</Button>
				</form>
			</m.section>
		</div>
	);
}
