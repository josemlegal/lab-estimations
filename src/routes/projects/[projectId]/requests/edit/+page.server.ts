import { error, type ServerLoad } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { Request } from '$lib/types/request';
import type { Project } from '$lib/types/project';

export const load: ServerLoad = async ({ params }) => {
	const getRequest = async () => {
		const request: Request = await prisma.request.findUnique({
			where: {
				id: Number(params.requestId)
			},
			select: {
				id: true,
				title: true,
				description: true
			}
		});
		if (!request) {
			throw error(404, { message: 'Project not found' });
		}
		console.log('Server load...');
		console.log(`Proyecto: ${request.title}`);
		return request;
	};
    
    const getProject = async () => {
		const project: Project = await prisma.project.findUnique({
			where: {
				id: Number(params.projectId)
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
		console.log('Server load...');
		console.log(`Proyecto: ${project.title}`);
		return project;
	};

	return {
        request: await getRequest(),
        project: await getProject()
    } as { request: Request, project: Project };
};