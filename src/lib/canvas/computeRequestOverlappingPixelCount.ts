import type {Dimensions} from "../Dimensions.ts";
import {computeImageRequestAloneTransparentPixelCount} from "./computeImageRequestAloneTransparentPixelCount.ts";
import {computeImageRequestOverlapTransparentPixelCount} from "./computeImageRequestOverlapTransparentPixelCount.ts";
import {computeTransparentPixelCount} from "./computeTransparentPixelCount.ts";
import {getCanvasDimensions} from "./getCanvasDimensions.ts";
import type {ImageRequest} from "./ImageRequest.ts";

export function computeRequestOverlappingPixelCount(
	request: ImageRequest,
	context: CanvasRenderingContext2D,
): number {
	const mainContext = context;
	const allPixelCount = mainContext.canvas.width * mainContext.canvas.height;
	const mainTransparentPixelCount = computeTransparentPixelCount(mainContext);
	const mainNonTransparentPixelCount = allPixelCount - mainTransparentPixelCount;
	const canvasDimensions: Dimensions = getCanvasDimensions(mainContext.canvas);

	const requestAloneTransparentPixelCount = computeImageRequestAloneTransparentPixelCount(
		canvasDimensions,
		request,
	);

	const requestAloneNonTransparentPixelCount = allPixelCount - requestAloneTransparentPixelCount;

	const requestOverlapTransparentPixelCount = computeImageRequestOverlapTransparentPixelCount(
		mainContext.canvas,
		request,
	);

	const requestOverlapNonTransparentPixelCount =
		allPixelCount - requestOverlapTransparentPixelCount;

	return (
		mainNonTransparentPixelCount +
		requestAloneNonTransparentPixelCount -
		requestOverlapNonTransparentPixelCount
	);
}
