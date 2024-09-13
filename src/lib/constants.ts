import {
	Home,
	BookOpenText,
	Info,
	Pencil,
	Mail,
	PenTool,
	BookOpen,
	Users,
} from 'lucide-react';

export const navItems: NavItem[] = [
	{ label: 'Home', href: '/', icon: Home },
	{ label: 'Lenses', href: '/lenses', icon: BookOpenText },
	{ label: 'About', href: '/about', icon: Info },
	{ label: 'Write for Us', href: '/write-for-us', icon: Pencil },
	{ label: 'Contact', href: '/contact', icon: Mail },
];

export const footerLinks: NavItem[] = [
	{ label: 'Privacy Policy', href: '/info/privacy' },
	{ label: 'Terms of Service', href: '/info/terms-of-service' },
];

export const testimonials: Testimonial[] = [
	{
		quote:
			'HolyLens has been a guiding light in my spiritual journey. The articles are insightful and have helped me gain a deeper understanding of myself and the world around me.',
		author: 'Sarah Johnson',
		title: 'Yoga Instructor',
		avatar:
			'https://ik.imagekit.io/vercel/v0/blog/avatar-sarah.jpg?tr=w-100,h-100,fo-auto',
	},
	{
		quote:
			"As a philosophy student, I find the content on HolyLens to be both intellectually stimulating and practically applicable. It's rare to find a resource that bridges academic thought with everyday life so seamlessly.",
		author: 'Michael Chen',
		title: 'Philosophy Student',
		avatar:
			'https://ik.imagekit.io/vercel/v0/blog/avatar-michael.jpg?tr=w-100,h-100,fo-auto',
	},
	{
		quote:
			"The mindfulness techniques I've learned from HolyLens have transformed my daily routine. I feel more centered, focused, and at peace than ever before.",
		author: 'Emily Rodriguez',
		title: 'Marketing Executive',
		avatar:
			'https://ik.imagekit.io/vercel/v0/blog/avatar-emily.jpg?tr=w-100,h-100,fo-auto',
	},
];

export const faqs: FAQ[] = [
	{
		question: 'What is HolyLens?',
		answer:
			'HolyLens is a digital platform dedicated to exploring spirituality, philosophy, and personal growth. We provide thought-provoking articles, practical guides, and insightful perspectives to help you on your journey of self-discovery and enlightenment.',
	},
	{
		question: "Why the name 'HolyLens'?",
		answer:
			"The name 'HolyLens' represents our mission to provide a clear, focused view of spiritual and philosophical topics. Like a lens that brings clarity to what we see, we aim to bring clarity to complex ideas and practices in the realm of personal and spiritual growth.",
	},
	{
		question:
			'Is HolyLens affiliated with any particular religion or philosophy?',
		answer:
			'No, HolyLens is not affiliated with any specific religion or philosophy. We embrace a diverse range of spiritual and philosophical traditions, aiming to provide a platform for exploration and understanding across various beliefs and practices.',
	},
	{
		question: 'Do I need to pay to access HolyLens content?',
		answer:
			'Most of our content is freely available to all readers. However, we may offer premium articles or resources in the future that require a subscription. Our goal is to keep our core content accessible while potentially offering more in-depth materials for those who wish to dive deeper.',
	},
	{
		question: "Who's behind HolyLens?",
		answer:
			'HolyLens is created and maintained by a diverse team of writers, researchers, and practitioners passionate about spirituality, philosophy, and personal growth. Our contributors come from various backgrounds, including psychology, religious studies, philosophy, and meditation instruction.',
	},
	{
		question: 'Can I contribute to HolyLens?',
		answer:
			"We welcome contributions from thoughtful writers and practitioners. If you're interested in contributing, please visit our 'Write for Us' page for more information on our submission guidelines and process.",
	},
];

export const writerRequirements: WriterRequirement[] = [
	{
		icon: PenTool,
		text: 'Original, well-researched articles on spirituality, philosophy, and personal growth',
	},
	{
		icon: BookOpen,
		text: 'Practical guides and techniques for meditation, mindfulness, and self-improvement',
	},
	{
		icon: Users,
		text: 'Personal experiences and insights that can inspire and enlighten our readers',
	},
];
