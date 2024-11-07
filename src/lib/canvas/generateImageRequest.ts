import type {Dimensions} from "../Dimensions.ts";
import type {Query} from "../Query.ts";
import type {Coordinates} from "./Coordinates.ts";
import type {ImageRequest} from "./ImageRequest.ts";

export function generateImageRequest(
	query: Query,
	canvasDimensions: Dimensions,
	tryIndex: number,
): ImageRequest {
	const positionPixels: Coordinates = {
		x: Math.random() * canvasDimensions.width,
		y: Math.random() * canvasDimensions.height,
	};

	const image = query.overlayImages[
		Math.floor(Math.random() * query.overlayImages.length)
	] as HTMLImageElement;

	const orienationRadians = (2 * Math.random() - 1) * query.maximalOverlayImageOrientationRadians;
	const allImagePixelCount = image.width * image.height;
	const baseScale = query.maximalOverlayImagePixelCount / allImagePixelCount;

	const relativescale = 0.9999 ** tryIndex;
	const totalScale = baseScale * relativescale;

	return {
		image,
		positionPixels,
		orienationRadians,
		scale: totalScale,
	};
}
