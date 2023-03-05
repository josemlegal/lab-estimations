<script lang="ts">
	export let actionUrl: string;
</script>

<form action={actionUrl} method="POST">
	<h3>New Project</h3>
	<label for="title"> Title </label>
	<input type="text" id="title" name="title" />
	<label for="description"> Description </label>
	<textarea id="description" name="description" rows={5} />
	<button type="submit">Add Project</button>
</form>
