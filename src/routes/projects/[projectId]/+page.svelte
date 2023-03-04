<script lang="ts">
	import type { Project } from '$lib/types/project';
	console.log('Cargue el proyecto con un id');
	import type { PageData } from '../$types';

	export let data: PageData;
	$: ({ project } = data);
</script>

<form action="?/updateProject" method="POST">
	<h3>Editing: {project.title}</h3>
	<label for="title"> Title </label>
	<input type="text" id="title" name="title" value={project.title} />
	<label for="description"> Description </label>
	<textarea id="description" name="description" rows={5} value={project.description} />
	<button type="submit">Update project</button>
</form>

<h1>project pilin</h1>
<p>{JSON.stringify(project)}</p>
