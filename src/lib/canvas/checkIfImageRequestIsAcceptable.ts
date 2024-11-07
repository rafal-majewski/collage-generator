import {computeRequestOverlappingPixelCount} from "./computeRequestOverlappingPixelCount.ts";
import type {ImageRequest} from "./ImageRequest.ts";

export function checkIfImageRequestIsAcceptable(
	request: ImageRequest,
	context: CanvasRenderingContext2D,
): boolean {
	const overlapPixelCount = computeRequestOverlappingPixelCount(request, context);
	return overlapPixelCount < 0.0001;
}
