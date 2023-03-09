import type { Epic } from '$lib/types';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ params }) => {
	return {
		epics: await getEpics(Number(params.projectId))
	};
};

const getEpics = async (projectId: number) => {
	const epics: Epic[] = await prisma.epic.findMany({
		where: {
			projectId: projectId,
			deleteStatus: false
		},
		select: {
			id: true,
			title: true,
			tag: true
		}
	});
	if (!epics) {
		throw console.error(404, { message: 'Epics not found' });
	}
	return epics;
};
