import type { Issue } from './issue';

export interface Request {
	id: number;
	title: string;
	description: string;
	issues: Issue[];
	projectId: number;
}
