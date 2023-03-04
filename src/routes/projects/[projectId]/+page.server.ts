import { error, fail, type Actions, type ServerLoad } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: ServerLoad = async ({ params }) => {
	const getProject = async () => {
		const project = await prisma.project.findUnique({
			where: {
				id: Number(params.projectId)
			}
		});
		if (!project) {
			throw error(404, { message: 'Project not found' });
		}
		return project;
	};

	return {
		project: getProject()
	};
};

export const actions: Actions = {
	updateProject: async ({ request, params }) => {
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
