import { Canvas } from "./Canvas";
const main = () => {
	document.addEventListener("DOMContentLoaded", () => {
		const canvasContainer = document.getElementById("canvasContainer");

		const width = Number.parseInt(canvasContainer.offsetWidth);
		const height = Number.parseInt(canvasContainer.offsetHeight);

		const canvas = new Canvas(width, height);
		canvas.initCanvas();
		canvas.drawDot();

		document
			.getElementById("clear")
			.addEventListener("click", () => canvas.clearDots());

		document
			.getElementById("grid")
			.addEventListener("click", () => canvas.toggleGrid());
	});
};

main();
