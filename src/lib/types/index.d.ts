declare type NavLink = {
	name: string;
	link: string;
};

declare type Lens = {
	_id: string;
	title: string;
	content: string;
	author: {
		name: string;
	};
};
