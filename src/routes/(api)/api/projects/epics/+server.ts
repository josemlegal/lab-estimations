import { fail, type RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const PUT = (async ({ url, request }) => {
	const id = url.searchParams.get('id');
	const epic = await request.json();

	try {
		await prisma.epic.update({
			where: {
				id: Number(id)
			},
			data: {
				title: epic.title,
				updatedAt: new Date()
			}
		});
	} catch (err) {
		console.error(err);
		return fail(500, { message: 'Could not update the epic title' });
	}
	return new Response(
		JSON.stringify({
			code: 201,
			message: 'Epic updated'
		})
	);
}) as RequestHandler;

export const DELETE = (async ({ url }) => {
	const id = url.searchParams.get('id');

	try {
		await prisma.epic.delete({
			where: {
				id: Number(id)
			}
		});

		return new Response(
			JSON.stringify({
				code: 201,
				message: 'Project deleted'
			})
		);
	} catch (err) {
		console.error(err);
		return fail(500, { message: 'Could not delete the epic' });
	}
}) as RequestHandler;
