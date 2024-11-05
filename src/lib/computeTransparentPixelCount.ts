export function computeTransparentPixelCount(
	context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
): number {
	const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
	let transparentPixelCount = 0;

	for (let pixelIndex = 0; pixelIndex < imageData.data.length; pixelIndex += 4) {
		const alpha = imageData.data[pixelIndex + 3] as number;
		transparentPixelCount += 1 - alpha / 255;
	}

	return transparentPixelCount;
}
