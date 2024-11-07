<script lang="ts">
	import Canvas from "./canvas/Canvas.svelte";
	import QueryForm from "./query-form/QueryForm.svelte";
	import type {Query} from "./Query.ts";
	let query: Query | null = $state.raw(null);

	function handleFormSubmission(newQuery: Query): void {
		query = newQuery;
	}
</script>

<div>
	<QueryForm onSubmission={handleFormSubmission} />
	{#if query !== null}
		<Canvas {query} />
	{/if}
</div>
