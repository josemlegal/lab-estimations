<script lang="ts">
	import CreateIssuesForm from '$lib/components/CreateIssuesForm.svelte';

	import { page } from '$app/stores';
</script>

<CreateIssuesForm actionUrl="/projects/{$page.params.projectId}/requests/{$page.params.requestId}?/create-issue" />