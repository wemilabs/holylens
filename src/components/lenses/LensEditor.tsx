'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/lib/hooks/useAuth.hook';
// import { UploadButton, UploadDropzone } from '@/lib/utils/uploadthing';
import '@/styles/quill-custom.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import slugify from 'react-slugify';
import { toast } from 'sonner';

const ReactQuill = dynamic(() => import('react-quill'), {
	ssr: false,
	loading: () => <p>Loading editor...</p>,
});

const LensEditor = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [content, setContent] = useState('');
	const [tags, setTags] = useState('');
	const [quill, setQuill] = useState<any>(null);
	const { user } = useAuth();
	const router = useRouter();

	const handleSave = async (publish: boolean) => {
		if (!user) {
			toast.error('Failure', {
				description: 'You must be logged in to save a lens',
			});
			return;
		}

		const lens = {
			title,
			slug: slugify(title),
			description,
			content,
			author: user.id,
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

			const savedLens = await response.json();
			toast.success(
				publish ? 'Lens published successfully' : 'Lens saved as draft',
				{ description: 'The lens was saved successfully' }
			);

			setTitle('');
			setDescription('');
			setContent('');
			setTags('');

			router.push('/lenses');
			// router.push(`/lenses/${savedLens._id}`);
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error.message : 'An unknown error occurred';
			toast.error('Failed to save lens', {
				description: errorMessage,
			});
		}
	};

	const handleImageUpload = useCallback(() => {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		input.click();

		input.onchange = async () => {
			const file = input.files?.[0];
			if (file) {
				// We'll handle the actual upload in the UploadButton component
			}
		};
	}, []);

	const modules = {
		toolbar: {
			container: [
				[{ header: [1, 2, 3, 4, 5, 6, false] }],
				['bold', 'italic', 'underline', 'strike'],
				[{ list: 'ordered' }, { list: 'bullet' }],
				['blockquote', 'code-block'],
				[{ align: [] }],
				['link', 'image'],
				['clean'],
			],
			handlers: {
				image: handleImageUpload,
			},
		},
	};

	const formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'list',
		'bullet',
		'blockquote',
		'code-block',
		'align',
		'link',
		'image',
	];

	useEffect(() => {
		if (quill) {
			setQuill(quill.getEditor());
		}
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
					{/* <UploadButton
						endpoint='imageUploader'
						onClientUploadComplete={res => {
							if (res && res[0] && quill) {
								const url = res[0].url;
								const range = quill.getSelection(true);
								quill.insertEmbed(range.index, 'image', url);
							}
						}}
						onUploadError={(error: Error) => {
							toast.error(`ERROR! ${error.message}`);
						}}
					/>
					<UploadDropzone
						endpoint='imageUploader'
						onClientUploadComplete={res => {
							setImageUrl(res[0].url);
							toast.success('Image has successfully been uploaded');
						}}
						onUploadError={(error: Error) => {
							toast.error(`ERROR! ${error.message}`);
						}}
					/> */}
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
						htmlFor='content'
						className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
					>
						Content
					</label>
					<ReactQuill
						theme='snow'
						value={content}
						onChange={setContent}
						modules={modules}
						formats={formats}
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
					<Button onClick={() => handleSave(false)} variant='outline'>
						Save Draft
					</Button>
					<Button onClick={() => handleSave(true)}>Publish</Button>
				</div>
			</div>
		</div>
	);
};

export default LensEditor;
