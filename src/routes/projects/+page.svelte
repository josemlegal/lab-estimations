<script lang="ts">
	import type { PageData } from '../projects/$types';

	export let data: PageData;

	$: ({ projects } = data);
	import '@picocss/pico';
</script>

<div class="grid">
	<div>
		<h2>Projects:</h2>
		{#each projects as project}
			<project>
				<header>
					{project.title}
				</header>
				<p>
					{project.description}
				</p>
				<form action="?/deleteproject&id={project.id}" method="POST">
					<button type="submit" class="outline secondary">Go to Epics</button>
				</form>
				<a href="/project/{project.id}" role="button" class="outline constrast" style="width: 100%;"
					>Edit project</a
				>
			</project>
		{/each}
	</div>
	<form action="?/createProject" method="POST">
		<h3>New Project</h3>
		<label for="title"> Title </label>
		<input type="text" id="title" name="title" />
		<label for="description"> Description </label>
		<textarea id="description" name="description" rows={5} />
		<button type="submit">Add Project</button>
	</form>
</div>
