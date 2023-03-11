<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ issue } = data);
</script>

<main class="container">
    <h1>{issue.title}</h1>
    <div class="grid">
        <div>
            <span>Time for Estimation:</span> {issue.timeForEstimation}
        </div>
        <div>
            <span>Estimation:</span> {issue.estimation}
        </div>
    </div>
    <div>
        <p class="text-sm">{issue.description}</p>
    </div>
</main>