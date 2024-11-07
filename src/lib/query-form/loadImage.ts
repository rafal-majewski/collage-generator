export async function loadImage(file: File): Promise<HTMLImageElement> {
	const image = new Image();
	image.src = URL.createObjectURL(file);

	await new Promise(function (resolve: (event: Event) => void): void {
		image.onload = resolve;
	});

	return image;
}
