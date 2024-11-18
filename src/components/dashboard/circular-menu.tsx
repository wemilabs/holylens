import { motion } from 'framer-motion';

interface CircularMenuItem {
	tab: string;
	icon: React.ComponentType<any>;
}

const CircularMenu = ({
	items,
	activeTab,
	setActiveTab,
}: {
	items: CircularMenuItem[];
	activeTab: string;
	setActiveTab: (tab: string) => void;
}) => {
	return (
		<div className='relative size-64'>
			{items.map((item, index) => {
				const angle = (index / items.length) * 2 * Math.PI;
				const x = Math.cos(angle) * 100 + 100;
				const y = Math.sin(angle) * 100 + 100;
				return (
					<motion.button
						key={item.tab}
						className={`absolute size-12 rounded-full flex items-center justify-center ${
							activeTab === item.tab
								? 'bg-brand-700 text-brand-700'
								: 'bg-white text-gray-900'
						}`}
						style={{ left: `${x}px`, top: `${y}px` }}
						whileHover={{ scale: 1.1 }}
						onClick={() => setActiveTab(item.tab)}
					>
						<item.icon className='size-6' />
					</motion.button>
				);
			})}
		</div>
	);
};

export default CircularMenu;
