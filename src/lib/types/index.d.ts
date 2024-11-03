declare type AuthProviderProps = {
	children: ReactNode;
};

declare type AuthContextType = {
	user: User | null;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (name: string, email: string, password: string) => Promise<void>;
	signOut: () => void;
};

declare type User = {
	_id: string;
	name: string;
	email: string;
	role: string;
};

declare type Lens = {
	_id: string;
	title: string;
	description: string;
	content: string;
	slug: string;
	author: {
		name: string;
	};
	publishedDate: string;
	tags: string[];
	coverImage_url?: string;
	readTime?: string;
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
