declare type AuthProviderProps = {
	children: ReactNode;
};

declare type AuthContextType = {
	user: User | null;
	loading?: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (name: string, email: string, password: string) => Promise<void>;
	signOut: () => void;
};

declare type User = {
	id: string;
	name: string;
	email: string;
	role: string;
};

declare type Lens = {
	_id: string;
	title: string;
	description: string;
	author: {
		name: string;
	};
	content: string;
	publishedDate: string;
	tags: string[];
	slug: string;
	coverImage_url: string;
	readTime?: string;
	likes: { _id: string | undefined; name: string }[];
	comments: LensComment[];
	favorites_count?: number;
	views_count?: number;
};

declare type LensComment = {
	_id: string;
	content: string;
	author: {
		_id: string;
		name: string;
		avatar?: string;
	};
	createdAt: string;
	likes: { _id: string; name: string }[];
	replies: {
		_id: string;
		content: string;
		author: {
			_id: string;
			name: string;
		};
		createdAt: string;
	}[];
};

declare type NavItem = {
	label: string;
	href: string;
	icon?: ForwardRefExoticComponent<
		Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
	>;
};

declare type WriterRequirement = {
	icon: ForwardRefExoticComponent<
		Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
	>;
	text: string;
};

declare type Testimonial = {
	quote: string;
	author: string;
	title: string;
	avatar?: string;
};

declare type FAQ = {
	question: string;
	answer: string;
};

declare type ReactQuillEditorFormats = string[];

declare type ReactQuillEditorModules = {
	toolbar: {
		container: any[];
		handlers?: {
			// image: () => void;
		};
	};
};
