<script lang="ts">
	import CreateRequestForm from '$lib/components/CreateRequestForm.svelte';

	import type { PageData } from './$types';

	import { page } from '$app/stores';

	export let data: PageData;

	$: ({ epics } = data);
</script>

<CreateRequestForm actionUrl="/projects/{$page.params.projectId}?/create-request" {epics} />
