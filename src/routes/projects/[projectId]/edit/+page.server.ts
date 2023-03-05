import { error, type ServerLoad } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { Project } from '$lib/types/project';

export const load: ServerLoad = async ({ params }) => {
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
		project: await getProject()
	} as { project: Project };
};
