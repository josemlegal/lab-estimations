<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import {
		Badge,
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	export let data: PageData;
	$: ({ project, epics, requests } = data);
</script>

<h1>
	{project.title}

	<a href="/projects/{project.id}/edit">Edit</a>
</h1>

<div class="">
	{#each epics as epic}
		<Badge class=" px-2 mx-1" color={epic.tag}>{epic.title}</Badge>
	{/each}
	<div class="py-2">
		<Button
			on:click={() => {
				goto(`/projects/${project.id}/epics`);
			}}
			size="xs"
			class="w-28">Go to Epics</Button
		>
	</div>
</div>

<div>
	<Button
		on:click={() => {
			goto(`${project.id}/requests/create`);
		}}>Add a new Request</Button
	>
</div>

<Table striped={true}>
	<TableHead>
		<TableHeadCell>Requests</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each requests as request}
			<TableBodyRow>
				<TableBodyCell
					class="cursor-pointer"
					on:click={() => {
						goto(`${project.id}/requests/${request.id}`);
					}}
				>
					<span>
						{request.title}
					</span>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
