const Overlay = ({ onClose }: { onClose: () => void }) => {
	return (
		<div
			onClick={onClose}
			className='fixed inset-0 top-0 left-0 z-30 h-screen w-full bg-gray-700/60 transition-all duration-300 ease-in-out backdrop-blur-sm'
		></div>
	);
};

export default Overlay;
