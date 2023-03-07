import { fail, type RequestHandler } from '@sveltejs/kit';

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

		return new Response(
			JSON.stringify({
				code: 201,
				message: 'Request deleted'
			})
		);
	} catch (err) {
		console.error(err);
		return fail(500, { message: 'Could not delete the request' });
	}
}) as RequestHandler;
