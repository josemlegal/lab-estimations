import { fail, type RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const DELETE = (async ({ url }) => {
	const id = url.searchParams.get('id');
	console.log('Ejecute deleteProject', id);

	try {
		await prisma.project.update({
			where: {
				id: Number(id)
			},
			data: {
				deleteStatus: true,
				deletedAt: new Date()
			}
		});
	} catch (err) {
		console.error(err);
		return fail(500, { message: 'Could not delete the project' });
	}
	return new Response(
		JSON.stringify({
			code: 201,
			message: 'Project deleted'
		})
	);
}) as RequestHandler;
