'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { formats, modules } from '@/lib/constants';
import dynamic from 'next/dynamic';
import { forwardRef, useEffect, useState } from 'react';

const ReactQuill = dynamic(
	async () => {
		const { default: RQ } = await import('react-quill');
		// When in a browser environment, import the CSS
		if (typeof window !== 'undefined') {
			await import('react-quill/dist/quill.snow.css');
		}
		return function comp(props: { forwardedRef: any; [key: string]: any }) {
			return <RQ ref={props.forwardedRef} {...props} />;
		};
	},
	{
		ssr: false,
		loading: () => <Skeleton className='w-full h-[300px] rounded-md' />,
	}
);

interface RichTextEditorProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

const RichTextEditor = forwardRef<any, RichTextEditorProps>(
	(
		{
			value,
			onChange,
			placeholder = 'Start writing your spiritual journey...',
		},
		ref
	) => {
		const [isMounted, setIsMounted] = useState(false);

		useEffect(() => {
			setIsMounted(true);
		}, []);

		if (!isMounted) {
			return <Skeleton className='w-full h-[300px] rounded-md' />;
		}

		return (
			<div className='relative w-full prose prose-slate dark:prose-invert'>
				<ReactQuill
					theme='snow'
					value={value}
					onChange={onChange}
					modules={modules}
					formats={formats}
					placeholder={placeholder}
					className='min-h-[300px] rounded-md border border-input bg-background'
					forwardedRef={ref}
				/>
			</div>
		);
	}
);

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
