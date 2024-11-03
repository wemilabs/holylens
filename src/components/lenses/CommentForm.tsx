'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface CommentFormProps {
	onSubmit: (content: string) => Promise<void>;
}

export function CommentForm({ onSubmit }: CommentFormProps) {
	const [content, setContent] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!content.trim()) return;

		setIsSubmitting(true);
		try {
			await onSubmit(content);
			setContent('');
		} catch (error) {
			console.error('Error submitting comment:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='mb-6'>
			<Textarea
				value={content}
				onChange={e => setContent(e.target.value)}
				placeholder='Write your comment here...'
				className='mb-2'
				rows={4}
			/>
			<Button type='submit' disabled={isSubmitting || !content.trim()}>
				{isSubmitting ? 'Submitting...' : 'Submit Comment'}
			</Button>
		</form>
	);
}
