import { DOT_DIMENTION, GRID_COLOR_LINES } from "./constants";

export class Canvas {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.canvas = document.getElementById("canvas");
		this.canvas.style.background = "white";
		this.ctx = this.canvas.getContext("2d");
		this.dots = JSON.parse(localStorage.getItem("dots")) || [];

		this.gridSize = 10;
		this.gridVisible = false;
		this.isDrawing = false;
		this.lines = [];
	}

	initCanvas() {
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const newWidth = entry.target.offsetWidth;
				const newHeight = entry.target.offsetHeight;
				this.canvas.width = newWidth;
				this.canvas.height = newHeight;

				this.redrawAll();
			}
		});
		resizeObserver.observe(document.getElementById("canvasContainer"));
	}

	getContext() {
		return this.ctx;
	}

	drawDot() {
		this.canvas.addEventListener("click", (event) => {
			const rect = this.canvas.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			this.ctx.fillStyle = "red";
			this.ctx.fillRect(x, y, DOT_DIMENTION, DOT_DIMENTION);
			this.dots.push({ x, y });
			localStorage.setItem("dots", JSON.stringify(this.dots));
		});
	}

	redrawDots() {
		for (const dot of this.dots) {
			this.ctx.fillStyle = "red";
			this.ctx.fillRect(dot.x, dot.y, DOT_DIMENTION, DOT_DIMENTION);
		}
	}

	clearDots() {
		localStorage.removeItem("dots");
		this.dots = [];
		this.redrawAll();
	}

	drawLines() {
		this.canvas.addEventListener("mousedown", (event) => {
			this.isDrawing = true;
			const rect = this.canvas.getBoundingClientRect();
			const startX = event.clientX - rect.left;
			const startY = event.clientY - rect.top;

			this.ctx.beginPath();
			this.ctx.moveTo(startX, startY);
			this.lines.push({ startX, startY, points: [] });
		});

		this.canvas.addEventListener("mousemove", (event) => {
			if (this.isDrawing) {
				const rect = this.canvas.getBoundingClientRect();
				const x = event.clientX - rect.left;
				const y = event.clientY - rect.top;

				this.ctx.lineTo(x, y);
				this.ctx.strokeStyle = "black";
				this.ctx.lineWidth = 2;
				this.ctx.stroke();

				this.lines[this.lines.length - 1].points.push({ x, y });
			}
		});

		this.canvas.addEventListener("mouseup", () => {
			this.isDrawing = false;
			this.ctx.closePath();
		});
	}

	redrawLines() {
		this.ctx.strokeStyle = "black";
		this.ctx.lineWidth = 2;

		for (const line of this.lines) {
			this.ctx.beginPath();
			this.ctx.moveTo(line.startX, line.startY);
			for (const point of line.points) {
				this.ctx.lineTo(point.x, point.y);
				this.ctx.stroke();
			}
			this.ctx.closePath();
		}
	}

	addGridToCanvas() {
		this.ctx.strokeStyle = GRID_COLOR_LINES;

		for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
			this.ctx.beginPath();
			this.ctx.moveTo(x, 0);
			this.ctx.lineTo(x, this.canvas.height);
			this.ctx.stroke();
		}

		for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
			this.ctx.beginPath();
			this.ctx.moveTo(0, y);
			this.ctx.lineTo(this.canvas.width, y);
			this.ctx.stroke();
		}
	}

	clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	redrawAll() {
		this.clearCanvas();

		if (this.gridVisible) {
			this.addGridToCanvas();
		}

		this.redrawDots();
		this.redrawLines();
	}

	toggleGrid() {
		this.gridVisible = !this.gridVisible;
		this.redrawAll();
	}
}
