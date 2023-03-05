<script lang="ts">
	import { Label, Button, Select } from 'flowbite-svelte';

	import { page } from '$app/stores';

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
</script>

<form action="/projects/{$page.params.projectId}/epics?/create" method="POST">
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
