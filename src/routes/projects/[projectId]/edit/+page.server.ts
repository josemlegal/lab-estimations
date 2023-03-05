import { error, fail, type Actions, type ServerLoad } from '@sveltejs/kit';
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

export const actions: Actions = {
	'update-project': async ({ request, params }) => {
		console.log('Ejecute updateProject');
		console.log('id: ', params.projectId);
		const { title, description } = Object.fromEntries(await request.formData()) as {
			title: string;
			description: string;
		};

		try {
			await prisma.project.update({
				where: {
					id: Number(params.projectId)
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
		return {
			status: 201
		};
	}
};
