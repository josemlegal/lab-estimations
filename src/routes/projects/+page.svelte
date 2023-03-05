<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ projects } = data);
	import '@picocss/pico';
	import CreateProjectForm from '$lib/components/CreateProjectForm.svelte';
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

							<form action="/projects?/delete&id={project.id}" method="POST">
								<button type="submit"> eliminate krj </button>
							</form>

							<!-- <a
								href="/projects/{project.id}?/delete"
								role="button"
								class="outline constrast"
								style="width: 100%;">Delete</a
							> -->
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
