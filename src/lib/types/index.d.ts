declare type NavLink = {
	label: string;
	href: string;
};

declare type Lens = {
	_id: string;
	title: string;
	content: string;
	author: {
		name: string;
	};
};
