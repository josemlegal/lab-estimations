import { error, fail, type Actions, type ServerLoad } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { Issue } from '$lib/types';

export const load: ServerLoad = async ({ params }) => {
	return {
		issue: await getIssue(Number(params.issueId))
	};
};

const getIssue = async (issueId: number) => {
	const issue: Issue = await prisma.issue.findUnique({
		where: {
			id: issueId
		},
		select: {
			id: true,
			title: true,
			description: true,
            timeForEstimation: true,
            estimation: true
		}
	});
	if (!issue) {
		throw error(404, { message: 'Issue not found' });
	}
	console.log('Server load...');
	console.log(`Issue: ${issue.title}`);
	return issue;
};

export const actions: Actions = {
	'update-issue': async ({ request, params }) => {
		console.log('Ejecute updateIssue');
		console.log('id: ', params.issueId);
		const { title, description, timeForEstimation, estimation } = Object.fromEntries(await request.formData()) as {
			title: string;
			description: string;
			timeForEstimation: string;
			estimation: string;
		};

		try {
			await prisma.issue.update({
				where: {
					id: Number(params.issueId)
				},
				data: {
					title: title,
					description: description,
					timeForEstimation: Number(timeForEstimation),
					estimation: Number(estimation)
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not update the issue' });
		}
		return {
			status: 201
		};
	}};