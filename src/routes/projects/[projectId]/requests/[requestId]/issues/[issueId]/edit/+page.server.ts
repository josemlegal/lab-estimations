import { error, type ServerLoad } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { Request, Issue } from '$lib/types';

export const load: ServerLoad = async ({ params }) => {
	return {
		issue: await getIssue(Number(params.issueId)),
		request: await getRequest(Number(params.requestId)),
		projectId: Number(params.projectId)
	};
};

const getRequest = async (requestId: number) => {
	const request: Request = await prisma.request.findUnique({
		where: {
			id: requestId
		},
		select: {
			id: true,
			title: true,
			description: true
		}
	});
	if (!request) {
		throw error(404, { message: 'Request not found' });
	}
	console.log('Server load...');
	console.log(`Request: ${request.title}`);
	return request;
};

const getIssue = async (issueId: number) => {
	const issue: Issue = await prisma.issue.findUnique({
		where: {
			id: issueId
		},
		select: {
			id: true,
			title: true,
			description: true,
            timeForEstimation: true,
            estimation: true
		}
	});
	if (!issue) {
		throw error(404, { message: 'Issue not found' });
	}
	console.log('Server load...');
	console.log(`Issue: ${issue.title}`);
	return issue;
};