<script lang="ts">
	import type { PageData } from './$types';
	import CreateProjectForm from '$lib/components/CreateProjectForm.svelte';
	import '@picocss/pico';
	import type { Project } from '$lib/types/project';

	export let data: PageData;

	$: ({ projects } = data);

	const onDelete = async (project: Project) => {
		const response = await confirm('Are you sure you want to delete this project?');

		if (response) {
			await fetch(`/api/projects?id=${project.id}`, {
				method: 'DELETE'
			});
			window.location.reload();
		}
	};
</script>

<main class="container">
	<div class="grid">
		<div>
			<h2>Projects:</h2>
			{#each projects as project}
				<article>
					<header>
						Proyecto: {project.title}
					</header>

					<p>
						Descripcion: {project.description}
					</p>

					<footer>
						<div class="grid">
							<a
								href="/projects/{project.id}"
								role="button"
								class="outline constrast"
								style="width: 100%;">Edit</a
							>

							<button
								on:click={() => {
									onDelete(project);
								}}
								type="button"
								class="outline constrast"
							>
								Delete
							</button>
						</div>
					</footer>
				</article>
			{/each}
		</div>
		<!-- <form action="?/create" method="POST">
			<h3>New Project</h3>
			<label for="title"> Title </label>
			<input type="text" id="title" name="title" />
			<label for="description"> Description </label>
			<textarea id="description" name="description" rows={5} />
			<button type="submit">Add Project</button>
		</form> -->
		<CreateProjectForm />
	</div>
</main>
