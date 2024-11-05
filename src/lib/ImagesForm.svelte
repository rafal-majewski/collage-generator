<script lang="ts">
	const {
		onImagesSubmission,
	}: Readonly<{
		onImagesSubmission: (images: readonly HTMLImageElement[]) => void;
	}> = $props();

	async function handleFormSubmission(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const files = formData.getAll("images") as File[];

		const images: readonly HTMLImageElement[] = await Promise.all(
			files.map(async (file: File): Promise<HTMLImageElement> => {
				const image = new Image();
				image.src = URL.createObjectURL(file);

				await new Promise((resolve): void => {
					image.onload = resolve;
				});

				return image;
			}),
		);

		onImagesSubmission(images);
	}
</script>

<form onsubmit={handleFormSubmission}>
	<label>
		Select files to display:
		<input type="file" multiple name="images" />
	</label>
	<button type="submit">Load images</button>
</form>
