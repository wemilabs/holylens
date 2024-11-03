'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { formats, modules } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth.hook';
import { UploadDropzone } from '@/lib/utils/uploadthing';
import '@/styles/quill-custom.css';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import slugify from 'react-slugify';
import { toast } from 'sonner';
import SubmitButton from '../shared/SubmitButton';
import { revalidateLenses } from '@/lib/actions/lens.actions';

const ReactQuill = dynamic(() => import('react-quill'), {
	ssr: false,
	loading: () => <p>Loading editor...</p>,
});

const LensEditor = () => {
	const [title, setTitle] = useState(''),
		[coverImage, setCoverImage] = useState(''),
		[description, setDescription] = useState(''),
		[content, setContent] = useState(''),
		[tags, setTags] = useState(''),
		[isLoading, setIsLoading] = useState<boolean>(false),
		[quill, setQuill] = useState<any>(null);
	const { user } = useAuth();
	const router = useRouter();

	const handleSave = async (publish: boolean) => {
		/*
		 * This function handles the saving of a lens, either as a draft or published.
		 * It checks if the user is logged in, sets the loading state, constructs the lens object,
		 * and sends a POST request to the server to save the lens. If successful, it displays
		 * a success toast and resets the editor state. If not successful, it displays an error toast.
		 */
		if (!user) {
			toast.error('Failure', {
				description: 'You must be logged in to save a lens',
			});
			return;
		}

		setIsLoading(true);

		const lens = {
			title,
			slug: slugify(title),
			coverImage_url: coverImage,
			description,
			content,
			author: user._id,
			tags: tags.split(',').map(tag => tag.trim()),
			isPublished: publish,
			publishedDate: publish ? new Date().toISOString() : null,
		};

		try {
			const token = localStorage.getItem('token');
			const response = await fetch('/api/lenses/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(lens),
			});

			if (!response.ok) throw new Error('Failed to save lens');

			await response.json();
			toast.success(
				publish ? 'Lens published successfully' : 'Lens saved as draft',
				{ description: 'The lens was saved successfully' }
			);

			setTitle('');
			setCoverImage('');
			setDescription('');
			setContent('');
			setTags('');

			router.push('/lenses');
			revalidateLenses();
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error.message : 'An unknown error occurred';
			toast.error('Failed to save lens', {
				description: errorMessage,
			});
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		/*
		 * Update the state of quill editor whenever the quill instance changes.
		 * We check if quill is defined and if so, we set the state of quill to the current editor instance.
		 * This is useful for tracking changes to the editor state or for re-rendering the editor with new content.
		 */
		if (quill) setQuill(quill.getEditor());
	}, [quill]);

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<h1 className='text-3xl font-bold mb-6'>Create New Lens</h1>
			<div className='space-y-4'>
				<div>
					<label
						htmlFor='title'
						className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
					>
						Title
					</label>
					<Input
						id='title'
						value={title}
						onChange={e => setTitle(e.target.value)}
						placeholder='Dreams: What are really they?'
						className='w-full'
					/>
				</div>

				<div>
					<label
						htmlFor='description'
						className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
					>
						Description
					</label>
					<Textarea
						id='description'
						value={description}
						onChange={e => setDescription(e.target.value)}
						placeholder='Description about the article'
						className='w-full'
					/>
				</div>

				<div>
					<label
						htmlFor='coverImage'
						className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
					>
						Cover Image
					</label>
					<input type='hidden' name='coverImage' value={coverImage} />
					{coverImage ? (
						<Image
							src={coverImage}
							alt='Cover Image'
							width={200}
							height={200}
							className='rounded-lg object-cover size-[200px]'
						/>
					) : (
						<UploadDropzone
							endpoint='imageUploader'
							onClientUploadComplete={res => {
								setCoverImage(res[0].url);
								toast.success('Success', {
									description: 'The cover image has been uploaded successfully',
								});
							}}
							onUploadError={() => {
								toast.error('Error uploading image', {
									description: 'Something went wrong uploading the imagen',
								});
							}}
						/>
					)}
				</div>

				<div>
					<label
						htmlFor='content'
						className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
					>
						Content
					</label>
					<ReactQuill
						theme='snow'
						value={content}
						onChange={setContent}
						formats={formats}
						modules={modules}
						className='bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
					/>
				</div>

				<div>
					<label
						htmlFor='tags'
						className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
					>
						Tags (comma-separated)
					</label>
					<Input
						id='tags'
						value={tags}
						onChange={e => setTags(e.target.value)}
						placeholder='Enter tags, separated by commas'
						className='w-full'
					/>
				</div>

				<div className='flex justify-end space-x-4'>
					<SubmitButton
						text='Save as Draft'
						variant='outline'
						handleStuff={() => handleSave(false)}
						isLoading={isLoading}
						className='w-fit'
					/>
					<SubmitButton
						text='Publish'
						handleStuff={() => handleSave(true)}
						isLoading={isLoading}
						className='w-fit'
					/>
				</div>
			</div>
		</div>
	);
};

export default LensEditor;
