import type {Coordinates} from "./Coordinates.ts";

export type ImageRequest = Readonly<{
	image: HTMLImageElement;
	positionPixels: Coordinates;
	orienationRadians: number;
	scale: number;
}>;
