import {checkIfImageRequestIsAcceptable} from "./checkIfImageRequestIsAcceptable.ts";
import type {ImageRequest} from "./ImageRequest.ts";
import {realizeImageRequest} from "./realizeImageRequest.ts";

export function tryToRealizeImageRequest(
	request: ImageRequest,
	context: CanvasRenderingContext2D,
): void {
	const isImageRequestAcceptable = checkIfImageRequestIsAcceptable(request, context);

	if (isImageRequestAcceptable) {
		realizeImageRequest(request, context);
	}
}
