<script lang="ts">
	import type { Epic } from '$lib/types/epic';
</script>

<form action="" method="POST">
	<h3>Create New Issue</h3>
	<label for="title"> Title </label>
	<input type="text" id="title" name="title" />
	<label for="description"> Description </label>
	<textarea id="description" name="description" rows={5} />
	<label for="time-for-estimation"> Time for estimation </label>
	<input type="estimation" id="estimation" name="estimation" />
	<label for="estimation-time"> Estimation Time </label>
	<input type="estimation-time" id="estimation-time" name="estimation-time" />
	<button type="submit">Add Issue</button>
</form>
