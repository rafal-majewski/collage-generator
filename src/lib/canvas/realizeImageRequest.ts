import type {ImageRequest} from "./ImageRequest.ts";

export function realizeImageRequest(
	request: ImageRequest,
	context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
): void {
	const scaleInOneDimension = Math.sqrt(request.scale);
	context.save();
	context.translate(request.positionPixels.x, request.positionPixels.y);
	context.rotate(request.orienationRadians);
	context.scale(scaleInOneDimension, scaleInOneDimension);
	context.drawImage(request.image, -request.image.width / 2, -request.image.height / 2);
	context.restore();
}
