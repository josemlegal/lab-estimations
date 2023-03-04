<script lang="ts">
	import type { PageData } from '../$types';
	export let data: PageData;
	$: ({ projects } = data);
</script>

<form action="?/updateProject" method="POST">
	<h3>Editing: {projects.title}</h3>
	<label for="title"> Title </label>
	<input type="text" id="title" name="title" value={projects.title} />
	<label for="description"> Description </label>
	<textarea id="content" name="content" rows={5} value={projects.description} />
	<button type="submit">Update project</button>
</form>
