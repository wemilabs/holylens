declare type NavLink = {
	label: string;
	href: string;
};

declare type Testimonial = {
	quote: string;
	author: string;
	title: string;
	avatar: string;
};

declare type FAQ = {
	question: string;
	answer: string;
};

declare type Lens = {
	_id: string;
	title: string;
	content: string;
	author: {
		name: string;
	};
};
