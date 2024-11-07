import {computeTransparentPixelCount} from "./canvas/computeTransparentPixelCount.ts";
import type {Dimensions} from "./Dimensions.ts";
import {drawImage} from "./canvas/realizeImageRequest.ts";
import type {Image} from "./Image.ts";

function generateImage(
	sources: readonly HTMLImageElement[],
	dimensionsPixels: Dimensions,
	tryIndex: number,
): Image {
	return {
		source: sources[Math.floor(Math.random() * sources.length)] as HTMLImageElement,
		positionPixels: {
			x: Math.random() * dimensionsPixels.width,
			y: Math.random() * dimensionsPixels.height,
		},
		relativeScale: 0.01 * 0.99 ** tryIndex,
		rotationRadians: 0.2 * (Math.random() * 2 - 1),
	};
}

// export function tryToDrawImage(mainContext: CanvasRenderingContext2D, image: Image): void {
// 	const isImageAcceptable = checkIfImageIsAcceptable(image, mainContext);

// 	if (isImageAcceptable) {
// 		drawImage(mainContext, image);
// 	}
// }

export function work(
	mainContext: CanvasRenderingContext2D,
	sources: readonly HTMLImageElement[],
	tryIndex: number,
): boolean {
	const dimensionsPixels: Dimensions = {
		width: mainContext.canvas.width,
		height: mainContext.canvas.height,
	};

	let bestImage: Image = generateImage(sources, dimensionsPixels, tryIndex);
	let bestStatistics = computeStatistics(bestImage, mainContext);

	if (bestStatistics.overlapPixelCount < 0.000001) {
		drawImage(mainContext, bestImage);
		return true;
	}

	// for (let i = 1; i < 60; i += 1) {
	// 	const image: Image = generateImage(sources, dimensionsPixels, tryIndex);
	// 	const statistics = computeStatistics(image, mainContext);

	// 	if (statistics.overlapPixelCount === 0) {
	// 		drawImage(mainContext, image);
	// 		return true;
	// 	}
	// }

	return false;

	// if (bestStatistics.transparentPixelCountLoss === 0) {
	// 	return false;
	// }

	// if (bestStatistics.overlapPixelCount !== 0) {
	// 	return false;
	// }

	// drawImage(mainContext, bestImage);
	// return true;

	// if (0.2 * transparentPixelCountLoss > overlapPixelCount && overlapPixelCount < 20) {
	// 	drawImage(mainContext, image);
	// 	return true;
	// }

	// return false;

	// generate 10 images and for each check their acceptability
	// go with the one that has the least overlap (or immidiately draw if no overlap)
	// const image: Image = generateImage(sources, dimensionsPixels, tryIndex);
	// tryToDrawImage(mainContext, image);

	// let bestImage: Image = generateImage(sources, dimensionsPixels, tryIndex);
	// let bestOverlapPercentage = computeOverlapPercentage(bestImage, mainContext);

	// if (bestOverlapPercentage === 0) {
	// 	drawImage(mainContext, bestImage);
	// 	return;
	// }

	// for (let i = 1; i < 6; i += 1) {
	// 	const image: Image = generateImage(sources, dimensionsPixels, tryIndex);
	// 	const overlapPercentage = computeOverlapPercentage(image, mainContext);

	// 	if (overlapPercentage === 0) {
	// 		drawImage(mainContext, image);
	// 		return;
	// 	}

	// 	if (overlapPercentage < bestOverlapPercentage) {
	// 		bestOverlapPercentage = overlapPercentage;
	// 		bestImage = image;
	// 	}
	// }

	// if (bestOverlapPercentage < 0.00005) {
	// 	drawImage(mainContext, bestImage);
	// 	return;
	// }
}

function computeStatistics(
	image: Image,
	mainContext: CanvasRenderingContext2D,
): Readonly<{
	transparentPixelCountLoss: number;
	overlapPixelCount: number;
}> {
	const currentTransparentPixelCount = computeTransparentPixelCount(mainContext);
	const currentNonTransparentPixelCount =
		mainContext.canvas.width * mainContext.canvas.height - currentTransparentPixelCount;

	const imageTransparencyTestCanvas = new OffscreenCanvas(
		mainContext.canvas.width,
		mainContext.canvas.height,
	);

	const imageTransparencyTestContext = imageTransparencyTestCanvas.getContext("2d", {
		willReadFrequently: true,
	}) as OffscreenCanvasRenderingContext2D;

	drawImage(imageTransparencyTestContext, image);

	const imageDrawnAloneTransparentPixelCount = computeTransparentPixelCount(
		imageTransparencyTestContext,
	);

	const imageDrawnAloneNonTransparentPixelCount =
		imageTransparencyTestContext.canvas.width * imageTransparencyTestContext.canvas.height -
		imageDrawnAloneTransparentPixelCount;

	const overlapTestCanvas = new OffscreenCanvas(
		mainContext.canvas.width,
		mainContext.canvas.height,
	);

	const overlapTestContext = overlapTestCanvas.getContext("2d", {
		willReadFrequently: true,
	}) as OffscreenCanvasRenderingContext2D;

	overlapTestContext.drawImage(mainContext.canvas, 0, 0);
	drawImage(overlapTestContext, image);

	const imageDrawnWithOverlapTransparentPixelCount =
		computeTransparentPixelCount(overlapTestContext);

	const imageDrawnWithOverlapNonTransparentPixelCount =
		overlapTestContext.canvas.width * overlapTestContext.canvas.height -
		imageDrawnWithOverlapTransparentPixelCount;

	return {
		transparentPixelCountLoss:
			currentTransparentPixelCount - imageDrawnWithOverlapTransparentPixelCount,
		overlapPixelCount:
			currentNonTransparentPixelCount -
			imageDrawnWithOverlapNonTransparentPixelCount +
			imageDrawnAloneNonTransparentPixelCount,
	};
}
