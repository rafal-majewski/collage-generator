import type {Dimensions} from "../Dimensions.ts";
import {computeTransparentPixelCount} from "./computeTransparentPixelCount.ts";
import type {ImageRequest} from "./ImageRequest.ts";
import {realizeImageRequest} from "./realizeImageRequest.ts";

export function computeImageRequestAloneTransparentPixelCount(
	canvasDimensions: Dimensions,
	request: ImageRequest,
): number {
	const canvas = new OffscreenCanvas(canvasDimensions.width, canvasDimensions.height);

	const context = canvas.getContext("2d", {
		willReadFrequently: true,
	}) as OffscreenCanvasRenderingContext2D;

	realizeImageRequest(request, context);
	return computeTransparentPixelCount(context);
}
