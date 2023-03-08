import { goto } from '$app/navigation';
import type { Epic } from '$lib/types/epic';
import type { Project } from '$lib/types/project';
import type { Request } from '$lib/types/request';

import { error, fail, redirect, type Actions, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ params }) => {
	return {
		project: await getProject(Number(params.projectId)),
		epics: await getEpics(Number(params.projectId)),
		requests: await getRequests(Number(params.projectId)),
		request: await getRequest(Number(params.requestId))
	};
};
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

const getEpics = async (projectId: number) => {
	const epics: Epic[] = await prisma.epic.findMany({
		where: {
			projectId: projectId,
			deleteStatus: false
		},
		select: {
			id: true,
			title: true,
			tag: true
		}
	});
	if (!epics) {
		throw error(404, { message: 'Epic not found' });
	}
	return epics;
};

async function getRequests(projectId: number) {
	const requests: Request[] = await prisma.request.findMany({
		where: {
			projectId: projectId,
			deleteStatus: false
		},
		select: {
			id: true,
			title: true,
			description: true,
			issues: true
		}
	});
	if (!requests) {
		throw error(404, { message: 'Requests not found' });
	}
	return requests;
}

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

export const actions: Actions = {
	'update-request': async ({ request, params }) => {
		const { title, description } = Object.fromEntries(await request.formData()) as {
			title: string;
			description: string;
		};

		try {
			await prisma.request.update({
				where: {
					id: Number(params.requestId)
				},
				data: {
					title,
					description
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not update the project' });
		}
		throw redirect(301, `/projects/${params.projectId}`);
	}
};
