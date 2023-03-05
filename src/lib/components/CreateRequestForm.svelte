<script lang="ts">
	import type { Epic } from '$lib/types/epic';

	export let actionUrl: string;

	export let epics: Epic[];
</script>

<form action={actionUrl} method="POST">
	<h3>New Request</h3>
	<label for="title"> Title </label>
	<input type="text" id="title" name="title" />
	<label for="description"> Description </label>
	<label for="epic">
		<select id="epic" name="epic">
			{#each epics as epic}
				<option value={epic.id}>{epic.title}</option>
			{/each}
		</select>
	</label>
	<textarea id="description" name="description" rows={5} />
	<button type="submit">Add Request</button>
</form>
