/**
 *
 * All global types
 *
 */

type User = {
	email: string;
	image: string;
	username: string;
};

type Article = {
	id: string;
	title: string;
	content: string;
	author: User;
};

// type Todo = {
// 	_id: string;
// 	todoTitle: string;
// 	todoDescription: string;
// 	isComplete: boolean;
// 	creator: User;
// };
