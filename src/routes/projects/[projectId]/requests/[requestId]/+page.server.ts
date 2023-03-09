import { error, fail, type Actions, type ServerLoad } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { Issue, Project, Request } from '$lib/types';

export const load: ServerLoad = async ({ params }) => {
	return {
		project: await getProject(Number(params.projectId)),
        request: await getRequest(Number(params.requestId)),
		issues: await getIssues(Number(params.requestId))
	};
};

async function getProject(projectId: number) {
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
}

async function getRequest(requestId: number) {
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
			description: true,
			timeForEstimation: true,
			estimation: true,
		}
	});
	if (!issues) {
		throw error(404, { message: 'Requests not found' });
	}
	return issues;
}

export const actions: Actions = {
	'create-issue': async ({ request, params }) => {
		const { title, description, timeforestimation, estimation } = Object.fromEntries(await request.formData()) as {
			title: string;
			description: string;
			timeforestimation: string;
			estimation: string;
		};

		try {
			await prisma.issue.create({
				data: {
					title,
					description,
					timeForEstimation: Number(timeforestimation),
					estimation: Number(estimation),
					projectId: Number(params.projectId),
					requestId: Number(params.requestId)
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not create the issue.' });
		}

		return {
			status: 201
		};
	},
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
		return fail(500, { message: 'Could not update the request' });
	}
	return {
		status: 201
	};
},
};
