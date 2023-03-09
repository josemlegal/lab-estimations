<script lang="ts">
	import type { Epic } from '$lib/types';

	export let actionUrl: string;

	export let epics: Epic[];
</script>

<main class="container">
		<form action={actionUrl} method="POST">
			<h3>Create New Request</h3>
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
</main>
