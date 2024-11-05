import type {Coordinates} from "./Coordinates.ts";
import type {Image} from "./Image.ts";

export function drawImage(
	context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
	image: Image,
): void {
	const diagonalLengthPixels = Math.sqrt(image.source.width ** 2 + image.source.height ** 2);

	const absoluteScaleInDimension =
		(Math.min(context.canvas.width, context.canvas.height) / diagonalLengthPixels) *
		Math.sqrt(image.relativeScale);

	for (let ghostPositionYIndex = -1; ghostPositionYIndex <= 1; ghostPositionYIndex += 1) {
		for (let ghostPositionXIndex = -1; ghostPositionXIndex <= 1; ghostPositionXIndex += 1) {
			const ghostPositionPixels: Coordinates = {
				x: image.positionPixels.x + ghostPositionXIndex * context.canvas.width,
				y: image.positionPixels.y + ghostPositionYIndex * context.canvas.height,
			};

			context.save();
			context.translate(ghostPositionPixels.x, ghostPositionPixels.y);
			context.rotate(image.rotationRadians);
			context.scale(absoluteScaleInDimension, absoluteScaleInDimension);
			context.drawImage(image.source, -image.source.width / 2, -image.source.height / 2);
			context.restore();
		}
	}
}
