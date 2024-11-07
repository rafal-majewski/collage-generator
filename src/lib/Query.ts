export type Query = Readonly<{
	baseImage: HTMLImageElement;
	overlayImages: readonly HTMLImageElement[];
	maximalOverlayImageOrientationRadians: number;
	maximalOverlayImagePixelCount: number;
}>;
