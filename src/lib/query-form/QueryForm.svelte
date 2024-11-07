<script lang="ts">
	import type {Query} from "../Query.ts";
	import {parseFormData} from "./parseFormData.ts";

	const {
		onSubmission,
	}: Readonly<{
		onSubmission: (query: Query) => void;
	}> = $props();

	async function handleSubmission(event: Event): Promise<void> {
		event.preventDefault();
		const formData = new FormData(event.currentTarget as HTMLFormElement);
		const query: Query = await parseFormData(formData);
		onSubmission(query);
	}
</script>

<form onsubmit={handleSubmission}>
	<label>
		Select a base image:
		<input type="file" name="base-image" />
	</label>
	<label>
		Select overlay images:
		<input type="file" multiple name="overlay-images" />
	</label>
	<label>
		Specify the maximal overlay image pixel count:
		<input type="number" name="maximal-overlay-image-pixel-count" step="any" />
	</label>
	<label>
		Specify the maximal overlay image orientation (in radians):
		<input type="number" name="maximal-overlay-image-orientation-radians" step="any" />
	</label>
	<button type="submit">Load images</button>
</form>
