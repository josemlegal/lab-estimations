<script lang="ts">
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
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ project, issues, request } = data);
</script>

<h1>
	{request.title}
	<!-- <a href="/projects/{project.id}/edit">Edit</a> -->
	<p class="text-sm">{request.description}</p>
</h1>
<div>
	<Button
		on:click={() => {
			goto(`${request.id}/issues/create`);
		}}>Add a new Issue</Button
	>
</div>

<Table striped={true}>
	<TableHead>
		<TableHeadCell>ISSUES</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each issues as issue}
			<TableBodyRow>
				<!-- <TableBodyCell
					class="cursor-pointer"
					on:click={() => {
						goto(`${project.id}/requests/${request.id}`);
					}}
				> -->
				<span>
					{issue.title}
				</span>
				<!-- </TableBodyCell> -->

				<TableBodyCell>
					<span>{issue.description}</span>
				</TableBodyCell>

				<TableBodyCell>
					<!-- <a href="/projects/{project.id}/requests/{request.id}/edit">Edit</a> -->
				</TableBodyCell>

				<TableBodyCell>
					<!-- <button
						on:click={() => {
							onDeleteRequest(request);
						}}
						class="font-medium text-white hover:underline"
					>
						Delete
					</button> -->
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
