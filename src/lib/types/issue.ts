import type { Comment } from './comment';

export interface Issue {
	id: number;
	title: string;
	description: string;
	projectId: number;
	requestId: number;
	comments: Comment[];
}
