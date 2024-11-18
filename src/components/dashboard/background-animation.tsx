const BackgroundAnimation = () => {
	return (
		<div className='fixed inset-0 z-0 overflow-hidden opacity-20'>
			<div className='absolute inset-0 bg-gradient-to-br from-brand-100 to-brand-300' />
			<svg
				className='absolute inset-0 w-full h-full'
				xmlns='http://www.w3.org/2000/svg'
			>
				<defs>
					<pattern
						id='smallGrid'
						width='20'
						height='20'
						patternUnits='userSpaceOnUse'
					>
						<path
							d='M 20 0 L 0 0 0 20'
							fill='none'
							stroke='currentColor'
							strokeWidth='0.5'
						/>
					</pattern>
					<pattern
						id='grid'
						width='100'
						height='100'
						patternUnits='userSpaceOnUse'
					>
						<rect width='100' height='100' fill='url(#smallGrid)' />
						<path
							d='M 100 0 L 0 0 0 100'
							fill='none'
							stroke='currentColor'
							strokeWidth='1'
						/>
					</pattern>
				</defs>
				<rect
					width='100%'
					height='100%'
					fill='url(#grid)'
					className='text-brand-200'
				/>
			</svg>
		</div>
	);
};

export default BackgroundAnimation;
