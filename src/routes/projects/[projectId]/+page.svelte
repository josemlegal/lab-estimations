<script lang="ts">
	import type { PageData } from './$types';
	import type { Project } from '$lib/types/project';
	import { goto } from '$app/navigation';
	import { Badge, Button } from 'flowbite-svelte';

	export let data: PageData;
	$: ({ project, epics } = data);

	const onDelete = async (project: Project) => {
		const response = await confirm('Are you sure you want to delete this project?');

		if (response) {
			await fetch(`/api/projects?id=${project.id}`, {
				method: 'DELETE'
			});
			goto('/projects');
		}
	};
</script>

<h1>
	{project.title}

	<a href="/projects/{project.id}/edit">Edit</a>
</h1>

<div class="flex flex-row h-4 ">
	{#each epics as epic}
		<Badge color={epic.tag}>{epic.title}</Badge>
	{/each}
	<Button
		on:click={() => {
			goto(`/projects/${project.id}/epics`);
		}}
		size="md"
		class="w-32">Go to Epics</Button
	>
</div>

<!-- <Modal bind:open={isModalVisible} autoclose title="Create a new epic!"> -->

<!-- </Modal> -->
