<script lang="ts">
	import type { PageData } from './$types';
	import type { Project } from '$lib/types/project';
	import { goto } from '$app/navigation';
	import { Badge, Button, Modal, Label, Select } from 'flowbite-svelte';
	import '@picocss/pico';
	import { applyAction, deserialize, enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';

	let isModalVisible = false;
	let epicTitle = '';
	let epicColor = '';
	const colors = [
		{ name: 'Red', value: 'red' },
		{ name: 'Blue', value: 'blue' },
		{ name: 'Green', value: 'green' },
		{ name: 'Yellow', value: 'yellow' },
		{ name: 'Purple', value: 'purple' },
		{ name: 'Indigo', value: 'indigo' },
		{ name: 'Pink', value: 'pink' },
		{ name: 'Dark', value: 'dark' }
	];

	let formElement: HTMLFormElement;
	async function handleSubmit(event: Event) {
		const data = new FormData(formElement);
		const response = await fetch(formElement.action, {
			method: 'POST',
			body: data,
			headers: {
				'x-sveltekit-action': 'true'
			}
		});
		const result: ActionResult = deserialize(await response.json());
		await applyAction(result);
		window.location.reload();
	}

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
			isModalVisible = true;
		}}
		class="h-1 w-1">+</Button
	>
</div>

<!-- <Modal bind:open={isModalVisible} autoclose title="Create a new epic!"> -->
<form
	bind:this={formElement}
	on:submit|preventDefault={handleSubmit}
	action="?/create-epic"
	method="POST"
>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		<Label for="epic-title">Title</Label>
		<input bind:value={epicTitle} type="text" name="title" />
		<Label>
			Color
			<Select bind:value={epicColor} items={colors} name="color" />
		</Label>
	</p>

	<Button type="submit" disabled={!epicTitle || !epicColor}>Create</Button>
	<Button btnClass="bg-red-500 text-white">Cancel</Button>
</form>
<!-- </Modal> -->
