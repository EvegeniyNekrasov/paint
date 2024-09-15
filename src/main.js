import { addListener } from "./helpers/main-helper";
import { Canvas } from "./js/Canvas";

class Main {
	init() {
		document.addEventListener("DOMContentLoaded", () => {
			const canvasContainer = document.getElementById("canvasContainer");

			if (!canvasContainer) return;

			const width = Number.parseInt(canvasContainer.offsetWidth);
			const height = Number.parseInt(canvasContainer.offsetHeight);

			const canvas = new Canvas(width, height);
			canvas.initCanvas();
			canvas.drawDot();

			addListener("clear", "click", () => canvas.clearDots());
			addListener("grid", "click", () => canvas.drawLines());
		});
	}
}

const main = new Main();
main.init();