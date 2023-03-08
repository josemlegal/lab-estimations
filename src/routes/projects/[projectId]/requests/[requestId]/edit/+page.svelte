<script lang="ts">
	import type { PageData } from './$types';
	import type { Project } from '$lib/types/project';
	import type { Request } from '$lib/types/request';

	export let data: PageData;
	$: ({ project, epics, requests, request } = data);
</script>

<form action="?/update-request" method="POST">
	<h3>{request.title}</h3>
	<label for="title"> Title </label>
	<input type="text" id="title" name="title" />
	<label for="epic">
		Epic
		<select id="epic" name="epic">
			<option value="">Unselected</option>
			{#each epics as epic}
				<option value={epic.id}>{epic.title}</option>
			{/each}
		</select>
	</label>
	<label for="description"> Description </label>
	<textarea id="description" name="description" rows={5} />
	<button type="submit">Add Request</button>
</form>
