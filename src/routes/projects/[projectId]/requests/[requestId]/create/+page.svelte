<script lang="ts">
	import { page } from '$app/stores';
	import CreateIssueForm from '$lib/components/CreateIssueForm.svelte';
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<form action="create-issue" method="POST">
	<h3>Create New Issue</h3>
	<label for="title"> Title </label>
	<input type="text" id="title" name="title" />
	<label for="description"> Description </label>
	<textarea id="description" name="description" rows={5} />
	<label for="timeForEstimation"> Time for estimation </label>
	<input type="timeForEstimation" id="timeForEstimation" name="timeForEstimation" />
	<label for="estimation"> Estimation Time </label>
	<input type="estimation" id="estimation" name="estimation" />
	<button type="submit">Add Issue</button>
</form>
