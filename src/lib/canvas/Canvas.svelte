<script lang="ts">
	import type {Query} from "../Query.ts";
	import {tryToRealizeQuery} from "./tryToRealizeQuery.ts";

	const {
		query,
	}: Readonly<{
		query: Query;
	}> = $props();

	function handleCanvasMount(canvas: HTMLCanvasElement): void {
		const context = canvas.getContext("2d", {
			willReadFrequently: true,
		}) as CanvasRenderingContext2D;

		$effect(function (): void {
			canvas.width = query.baseImage.width;
			canvas.height = query.baseImage.height;
			context.clearRect(0, 0, context.canvas.width, context.canvas.height);
			context.drawImage(query.baseImage, 0, 0, context.canvas.width, context.canvas.height);
		});

		$effect(function (): () => void {
			let tryIndex = 0;

			const intervalId = setInterval(function (): void {
				tryToRealizeQuery(context, query, tryIndex);
				tryIndex += 1;
			}, 0);

			return function (): void {
				clearInterval(intervalId);
			};
		});
	}
</script>

<canvas use:handleCanvasMount></canvas>

<style>
	canvas {
		border: 1px solid black;
	}
</style>
