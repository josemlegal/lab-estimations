import { error, fail, type Actions, type ServerLoad } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { Issue } from '$lib/types/issue';
import type { Project } from '$lib/types/project';
import type { Request } from '$lib/types/request';


export const load: ServerLoad = async ({ params }) => {
	return {
		project: await getProject(Number(params.projectId)),
        request: await getRequest(Number(params.projectId)),
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
	console.log(JSON.stringify(project));
	return project;
}

async function getRequest(requestId: number) {
    console.log(requestId)
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
	console.log(JSON.stringify(request));
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
	console.log(JSON.stringify(issues));
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
			console.log("todo mal loco")
			console.error(err);
			return fail(500, { message: 'Could not create the issue.' });
		}

		return {
			status: 201
		};
	}
};
