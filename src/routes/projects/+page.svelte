<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;

	$: ({ projects } = data);
</script>

<main class="container">
		<div>
			<h2>Projects</h2>
			<Button
				on:click={() => {
					goto('projects/create');
				}}>Add a new project</Button
			>
			{#each projects as project}
				<article>
					<a href="/projects/{project.id}">
						{project.title}
					</a>

					<p>
						{project.description}
					</p>
				</article>
			{/each}
		</div>
</main>
