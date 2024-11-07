import {computeTransparentPixelCount} from "./computeTransparentPixelCount.ts";
import type {ImageRequest} from "./ImageRequest.ts";
import {realizeImageRequest} from "./realizeImageRequest.ts";

export function computeImageRequestOverlapTransparentPixelCount(
	canvas: HTMLCanvasElement,
	request: ImageRequest,
): number {
	const mainCanvas = canvas;
	const overlapCanvas = new OffscreenCanvas(mainCanvas.width, mainCanvas.height);

	const overlapContext = overlapCanvas.getContext("2d", {
		willReadFrequently: true,
	}) as OffscreenCanvasRenderingContext2D;

	overlapContext.drawImage(mainCanvas, 0, 0);
	realizeImageRequest(request, overlapContext);
	return computeTransparentPixelCount(overlapContext);
}
