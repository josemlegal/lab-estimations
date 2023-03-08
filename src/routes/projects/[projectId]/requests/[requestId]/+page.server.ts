import { error, fail, type Actions, type ServerLoad } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { Project } from '$lib/types/project';
import type { Color, Epic } from '$lib/types/epic';
import type { Request } from '$lib/types/request';
import type { Issue } from '$lib/types/issue';

export const load: ServerLoad = async ({ params }) => {
	return {
		request: await getRequest(Number(params.requestId)),
		issues: await getIssues(Number(params.requestId)),
		project: await getProject(Number(params.projectId))
	};
};

async function getRequest(requestId: number) {
	const request: Request = await prisma.request.findUnique({
		where: {
			id: requestId
		},
		select: {
			id: true,
			title: true,
			epicId: true,
			description: true
		}
	});
	if (!request) {
		throw error(404, { message: 'Request not found' });
	}
	return request;
}

async function getIssues(requestId: number) {
	const issues: Issue[] = await prisma.issue.findMany({
		where: {
			requestId: requestId,
			deleteStatus: false
		},
		select: {
			id: true,
			title: true,
			description: true
		}
	});
	if (!issues) {
		throw error(404, { message: 'Requests not found' });
	}
	return issues;
}

const getProject = async (projectId: number) => {
	const project: Project = await prisma.project.findUnique({
		where: {
			id: projectId
		},
		select: {
			id: true,
			title: true,
			description: true
		}
	});
	if (!project) {
		throw error(404, { message: 'Project not found' });
	}
	return project;
};
