<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import {
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	export let data: PageData;
	$: ({ issues, request, project } = data);
</script>

<main class="container">
		<h1>
			{request.title}
			<a href="/projects/{project.id}/requests/{request.id}/edit">Edit</a>
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
				<TableHeadCell>Issues</TableHeadCell>
			</TableHead>
			<TableBody tableBodyClass="divide-y">
				{#each issues as issue}
					<TableBodyRow>
						<TableBodyCell
							class="cursor-pointer"
							on:click={() => {
								goto(`${request.id}/issues/${issue.id}`);
							}}
						>
							<span>
								{issue.title}
							</span>
						</TableBodyCell>
		
						<TableBodyCell>
							<span>{issue.description}</span>
						</TableBodyCell>

						<TableBodyCell>
							<span>{issue.timeForEstimation}</span>
						</TableBodyCell>

						<TableBodyCell>
							<span>{issue.estimation}</span>
						</TableBodyCell>

						<TableBodyCell>
							<button
							on:click={() => {
								goto(`${request.id}/issues/${issue.id}/edit`);
							}}>Edit</button>
						</TableBodyCell>
		
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
</main>