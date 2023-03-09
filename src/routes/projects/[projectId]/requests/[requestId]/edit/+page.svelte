<script lang="ts">
	import type { Request } from '$lib/types';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ request, project } = data);

	const onDelete = async (request: Request) => {
		const response = await confirm('Are you sure you want to delete this request?');

		if (response) {
			await fetch(`/api/request?id=${request.id}`, {
				method: 'DELETE'
			});
			goto(`${project.id}/requests}`);
		}
	};
</script>

<main class="container">
	<form action="/projects/{project.id}/requests/{request.id}?/update-request" method="POST">
		<h3>Editing: {request.title}</h3>
		<label for="title"> Title </label>
		<input type="text" id="title" name="title" value={request.title} />
		<label for="description"> Description </label>
		<textarea id="description" name="description" rows={5} value={request.description} />
		<button type="submit">Update request</button>
		<button
			on:click={() => {
				onDelete(request);
			}}
			type="button"
			class="outline constrast"
		>
			Delete
		</button>
	</form>
</main>
