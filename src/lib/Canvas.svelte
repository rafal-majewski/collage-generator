<script lang="ts">
	import type {Dimensions} from "./Dimensions.ts";
	import {work} from "./work.ts";

	const {
		sources,
		dimensions,
	}: Readonly<{
		sources: readonly HTMLImageElement[];
		dimensions: Dimensions;
	}> = $props();

	function handleCanvasMount(canvas: HTMLCanvasElement): void {
		const context = canvas.getContext("2d", {
			willReadFrequently: true,
		});

		$effect((): void => {
			canvas.width = dimensions.width;
			canvas.height = dimensions.height;
		});

		if (context === null) {
			return;
		}

		$effect((): (() => void) => {
			context.clearRect(0, 0, context.canvas.width, context.canvas.height);
			let tryIndex = 0;
			let failedAttemptCount = 0;

			const intervalId = setInterval((): void => {
				console.log(tryIndex);
				const workResult = work(context, sources, tryIndex);

				if (workResult) {
					failedAttemptCount = 0;
				} else {
					failedAttemptCount += 1;

					if (failedAttemptCount >= 3000) {
						tryIndex += 1;
						failedAttemptCount = 0;
					}
				}
			}, 0);

			return (): void => {
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
