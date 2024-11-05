import type {Coordinates} from "./Coordinates.ts";

export type Image = Readonly<{
	source: HTMLImageElement;
	positionPixels: Coordinates;
	relativeScale: number;
	rotationRadians: number;
}>;
