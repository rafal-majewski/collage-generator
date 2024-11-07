import type {Dimensions} from "../Dimensions.ts";

export function getCanvasDimensions(canvas: HTMLCanvasElement): Dimensions {
	return {
		width: canvas.width,
		height: canvas.height,
	};
}
