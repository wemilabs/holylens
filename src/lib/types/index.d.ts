declare type User = {
	id: number;
	name: string;
	email: string;
	role: 'reader' | 'author';
};

declare type AuthProviderProps = {
	children: ReactNode;
};

declare type AuthContextType = {
	user: User | null;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (name: string, email: string, password: string) => Promise<void>;
	signOut: () => void;
};

declare type Lens = {
	_id: string;
	title: string;
	slug: string;
	coverImage_url: string;
	description: string;
	content: string;
	author: number;
	tags: string[];
	isPublished: boolean;
	publishedDate: string | null;
};

declare type LensCategory = {
	_id: string;
	title: string;
	lenses: Lens[];
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
	avatar: string;
};

declare type FAQ = {
	question: string;
	answer: string;
};

declare type ReactQuillEditorFormats = string[];

declare type ReactQuillEditorModules = {
	toolbar: {
		container: any[];
		handlers: {
			image: () => void;
		};
	};
};
