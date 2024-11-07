import type {Query} from "../Query.ts";
import {loadImage} from "./loadImage.ts";

export async function parseFormData(formData: FormData): Promise<Query> {
	const [baseImage, overlayImages]: readonly [HTMLImageElement, readonly HTMLImageElement[]] =
		await Promise.all([
			loadImage(formData.get("base-image") as File),
			Promise.all((formData.getAll("overlay-images") as File[]).map(loadImage)),
		]);

	const maximalOverlayImagePixelCount = Number(formData.get("maximal-overlay-image-pixel-count"));

	const maximalOverlayImageOrientationRadians = Number(
		formData.get("maximal-overlay-image-orientation-radians"),
	);

	return {
		baseImage,
		overlayImages,
		maximalOverlayImageOrientationRadians,
		maximalOverlayImagePixelCount,
	};
}
