import type {Dimensions} from "$lib/Dimensions.ts";
import type {Query} from "../Query.ts";
import {generateImageRequest} from "./generateImageRequest.ts";
import {getCanvasDimensions} from "./getCanvasDimensions.ts";
import type {ImageRequest} from "./ImageRequest.ts";
import {tryToRealizeImageRequest} from "./tryToRealizeImageRequest.ts";

export function tryToRealizeQuery(
	context: CanvasRenderingContext2D,
	query: Query,
	tryIndex: number,
): void {
	const canvasDimensions: Dimensions = getCanvasDimensions(context.canvas);
	const request: ImageRequest = generateImageRequest(query, canvasDimensions, tryIndex);
	tryToRealizeImageRequest(request, context);
}
