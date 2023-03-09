import { fail, type RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const DELETE = (async ({ url }) => {
	const id = url.searchParams.get('id');

	try {
		await prisma.request.update({
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
		return fail(500, { message: 'Could not delete the request' });
	}
	return new Response(
		JSON.stringify({
			code: 201,
			message: 'Request deleted'
		})
	);
}) as RequestHandler;