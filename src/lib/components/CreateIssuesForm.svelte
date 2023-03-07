<script lang="ts">
	export let actionUrl: string;
</script>

<main class="container">
		<form action={actionUrl} method="POST">
			<h3>New Issue</h3>
			<label for="title"> Title </label>
			<input type="text" id="title" name="title" />
			<label for="description"> Description </label>
			<textarea id="description" name="description" rows={5} />
			<div class="grid">
				<label for="timeforestimation"> Time used for estimation </label>
				<label for="estimation"> Estimation </label>
			</div>
			<div class="grid">
				<input type="number" id="timeforestimation" name="timeforestimation" step="0.1" min="0"/>
				<input type="number" id="estimation" name="estimation" step="0.1" min="0"/>
			</div>
			<button type="submit">Add Issue</button>
		</form>
</main>