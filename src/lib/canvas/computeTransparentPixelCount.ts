export function computeTransparentPixelCount(
	context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
): number {
	const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
	let transparentPixelCount = 0;

	for (let byteIndex = 0; byteIndex < imageData.data.length; byteIndex += 4) {
		const alphaByte = imageData.data[byteIndex + 3] as number;
		const alphaPercentage = alphaByte / 255;
		transparentPixelCount += 1 - alphaPercentage;
	}

	return transparentPixelCount;
}
