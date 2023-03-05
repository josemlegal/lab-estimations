<script lang="ts">
	import type { PageData } from './$types';

	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button
	} from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import type { Epic } from '$lib/types/epics';

	export let data: PageData;

	$: ({ epics } = data);

	let epicToEdit: Epic | null = null;

	async function updateEpic() {
		try {
			await fetch(`/api/epics?id=${epicToEdit!.id}`, {
				method: 'PUT',
				body: JSON.stringify(epicToEdit)
			});
			window.location.reload();
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			} else {
				alert(error);
			}
		}
	}

	async function onDeleteEpic(epic: Epic) {
		const response = await confirm('Are you sure you want to delete this epic?');

		if (response) {
			try {
				await fetch(`/api/epics?id=${epic.id}`, {
					method: 'DELETE'
				});
				window.location.reload();
			} catch (error) {
				if (error instanceof Error) {
					alert(error.message);
				} else {
					alert(error);
				}
			}
		}
	}
</script>

<main class="container">
	<div class="grid">
		<div>
			<h2>Epics:</h2>
			<Button
				on:click={() => {
					goto('epics/create');
				}}>Create a new Epic</Button
			>

			<Table striped={true}>
				<TableHead>
					<TableHeadCell>Product name</TableHeadCell>
					<TableHeadCell>Color</TableHeadCell>
					<TableHeadCell>
						<span class="sr-only"> Edit </span>
					</TableHeadCell>
					<TableHeadCell>
						<span class="sr-only"> Delete </span>
					</TableHeadCell>
				</TableHead>
				<TableBody tableBodyClass="divide-y">
					{#each epics as epic}
						<TableBodyRow>
							<TableBodyCell>
								{#if epic.id === epicToEdit?.id}
									<input type="text" bind:value={epicToEdit.title} />
								{:else}
									<span>{epic.title}</span>
								{/if}
							</TableBodyCell>
							<TableBodyCell
								><div class="rounded-lg h-4 w-4 bg-{epic.tag}-500 mx-auto" /></TableBodyCell
							>
							<TableBodyCell>
								<button
									on:click={() => {
										if (epic.id === epicToEdit?.id) {
											updateEpic();
										} else {
											epicToEdit = { ...epic };
										}
									}}
									class="font-medium text-white hover:underline"
								>
									{epic.id === epicToEdit?.id ? 'Save' : 'Edit'}
								</button>
							</TableBodyCell>
							<TableBodyCell>
								<button
									on:click={() => {
										onDeleteEpic(epic);
									}}
									class="font-medium text-white hover:underline"
								>
									Delete
								</button>
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		</div>
	</div>
</main>
