<script lang="ts">
	import type { Issue } from '$lib/types';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ request, issue } = data);

	const onDelete = async (issue: Issue) => {
		const response = await confirm('Are you sure you want to delete this issue?');

		if (response) {
			await fetch(`/api/projects/request/issues?id=${issue.id}`, {
				method: 'DELETE'
			});
			goto(`${request.id}/requests}`);
		}
	};
</script>

<main class="container">
	<form action="/projects/{request.projectId}/requests/{request.id}/issues/{issue.id}?/update-issue" method="POST">
		<h3>Editing: {issue.title}</h3>
		<label for="title"> Title </label>
		<input type="text" id="title" name="title" value={issue.title} />
		<label for="description"> Description </label>
		<textarea id="description" name="description" rows={5} value={issue.description} />
		<div class="grid">
			<label for="timeforestimation"> Time used for estimation </label>
			<label for="estimation"> Estimation </label>
		</div>
		<div class="grid">
			<input type="number" id="timeforestimation" name="timeforestimation" step="0.1" min="0" value="{issue.timeForEstimation}"/>
			<input type="number" id="estimation" name="estimation" step="0.1" min="0" value="{issue.estimation}"/>
		</div>
		<button type="submit">Update issue</button>
		<button
			on:click={() => {
				onDelete(issue);
			}}
			type="button"
			class="outline constrast"
		>
			Delete
		</button>
	</form>
</main>
