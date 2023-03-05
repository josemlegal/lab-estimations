export interface Comment {
	id: number;
	text: string;
	userId: number;
	issueId: number;
	requestId: number;
	commentType: CommentTypeId;
}

export type CommentTypeId = 'issue' | 'request';
