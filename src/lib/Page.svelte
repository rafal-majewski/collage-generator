<script lang="ts">
	import Canvas from "../lib/Canvas.svelte";
	import ImagesForm from "../lib/ImagesForm.svelte";
	let sources: readonly HTMLImageElement[] | null = $state.raw(null);

	function handleSourcesSubmission(newSources: readonly HTMLImageElement[]): void {
		sources = newSources;
	}
</script>

<div>
	<ImagesForm onImagesSubmission={handleSourcesSubmission} />
	{#if sources !== null}
		<Canvas
			{sources}
			dimensions={{
				width: 800,
				height: 800,
			}}
		/>
	{/if}
</div>
