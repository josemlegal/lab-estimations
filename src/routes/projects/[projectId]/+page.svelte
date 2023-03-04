<script lang="ts">
	import type { PageData } from './$types';
	import '@picocss/pico';

	export let data: PageData;
	$: ({ project } = data);
</script>

<main class="container">
	<form action="{project.id}?/update-project" method="POST">
		<h3>Editing: {project.title}</h3>
		<label for="title"> Title </label>
		<input type="text" id="title" name="title" value={project.title} />
		<label for="description"> Description </label>
		<textarea id="description" name="description" rows={5} value={project.description} />
		<button type="submit">Update project</button>
	</form>
</main>
