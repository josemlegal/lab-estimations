<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;

	$: ({ projects } = data);
</script>

<main class="container">
	<div class="grid">
		<div>
			<h2>Projects:</h2>
			<Button
				on:click={() => {
					goto('projects/create');
				}}>Add a new project</Button
			>
			{#each projects as project}
				<article>
					<a href="/projects/{project.id}">
						<header>
							Proyecto: {project.title}
						</header>
					</a>

					<p>
						Descripcion: {project.description}
					</p>

					<footer>
						<div class="grid" />
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
	</div>
</main>
