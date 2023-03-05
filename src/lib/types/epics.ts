export interface Epic {
	id: number;
	title: string;
	tag: Color;
	projectId: number;
}

export type Color = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'indigo' | 'pink' | 'dark';
