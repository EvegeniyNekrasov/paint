import { DOT_DIMENTION, GRID_COLOR_LINES } from "./constants";

export class Canvas {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.canvas = document.getElementById("canvas");
    this.canvas.style.background = "white";
    this.ctx = this.canvas.getContext("2d");
    this.dots = JSON.parse(localStorage.getItem("dots")) || [];
    this.selectedColor = "#000000";
    this.gridSize = 10;
    this.gridVisible = false;
    this.isDrawing = false;
    this.lines = [];
    this.rectangles = JSON.parse(localStorage.getItem("rectangles")) || [];
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

  setSelectedColor(selectedColor) {
    this.selectedColor = selectedColor;
  }

  clearEvents() {
    if (this.drawDotHandler) {
      this.canvas.removeEventListener("click", this.drawDotHandler);
      this.drawDotHandler = null;
    }
    if (this.drawLinesMouseDownHandler) {
      this.canvas.removeEventListener(
        "mousedown",
        this.drawLinesMouseDownHandler,
      );
      this.drawLinesMouseDownHandler = null;
    }
    if (this.drawLinesMouseMoveHandler) {
      this.canvas.removeEventListener(
        "mousemove",
        this.drawLinesMouseMoveHandler,
      );
      this.drawLinesMouseMoveHandler = null;
    }
    if (this.drawLinesMouseUpHandler) {
      this.canvas.removeEventListener("mouseup", this.drawLinesMouseUpHandler);
      this.drawLinesMouseUpHandler = null;
    }
    if (this.drawRectangleMouseDownHandler) {
      this.canvas.removeEventListener(
        "mousedown",
        this.drawRectangleMouseDownHandler,
      );
      this.drawRectangleMouseDownHandler = null;
    }
    if (this.drawRectangleMouseMoveHandler) {
      this.canvas.removeEventListener(
        "mousemove",
        this.drawRectangleMouseMoveHandler,
      );
      this.drawRectangleMouseMoveHandler = null;
    }
    if (this.drawRectangleMouseUpHandler) {
      this.canvas.removeEventListener(
        "mouseup",
        this.drawRectangleMouseUpHandler,
      );
      this.drawRectangleMouseUpHandler = null;
    }
  }

  drawDot() {
    this.clearEvents();
    this.drawDotHandler = (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      this.ctx.fillStyle = this.selectedColor;
      this.ctx.fillRect(x, y, DOT_DIMENTION, DOT_DIMENTION);
      this.dots.push({ x, y, color: this.selectedColor });
      localStorage.setItem("dots", JSON.stringify(this.dots));
    };
    this.canvas.addEventListener("click", this.drawDotHandler);
  }

  redrawDots() {
    for (const dot of this.dots) {
      this.ctx.fillStyle = dot.color;
      this.ctx.fillRect(dot.x, dot.y, DOT_DIMENTION, DOT_DIMENTION);
    }
  }

  clearDots() {
    localStorage.removeItem("dots");
    this.dots = [];
    this.redrawAll();
  }

  getMousePosition() {
    const rect = this.canvas.getBoundingClientRect();
    const displayMouseMove = document.getElementById("mouseTracker");
    this.canvas.addEventListener("mousemove", (event) => {
      displayMouseMove.textContent = `x: ${event.clientX - rect.left}, y: ${event.clientY - rect.top}`;
    });
  }

  clearBoard() {
    this.clearCanvas();

    this.dots = [];
    this.lines = [];
    this.rectangles = [];

    localStorage.remoItem("lines");
    localStorage.removeItem("dots");
    localStorage.removeItem("rectangles");

    this.redrawAll();
  }

  drawRectangle() {
    this.clearEvents();

    let initialX;
    let initialY;

    this.drawRectangleMouseDownHandler = (event) => {
      this.isDrawing = true;

      const rect = this.canvas.getBoundingClientRect();
      initialX = event.clientX - rect.left;
      initialY = event.clientY - rect.top;
    };

    this.drawRectangleMouseMoveHandler = (event) => {
      if (this.isDrawing) {
        const rect = this.canvas.getBoundingClientRect();
        const currentX = event.clientX - rect.left;
        const currentY = event.clientY - rect.top;

        const width = currentX - initialX;
        const height = currentY - initialY;

        this.redrawAll();

        this.ctx.strokeStyle = this.selectedColor;
        this.ctx.lineWidth = 2;

        this.ctx.strokeRect(initialX, initialY, width, height);
      }
    };

    this.drawRectangleMouseUpHandler = (event) => {
      if (this.isDrawing) {
        this.isDrawing = false;

        const rect = this.canvas.getBoundingClientRect();
        const finalX = event.clientX - rect.left;
        const finalY = event.clientY - rect.top;
        const width = finalX - initialX;
        const height = finalY - initialY;

        this.rectangles.push({
          x: initialX,
          y: initialY,
          width,
          height,
          color: this.selectedColor,
        });
        localStorage.setItem("rectangles", JSON.stringify(this.rectangles));

        this.redrawAll();
      }
    };

    this.canvas.addEventListener(
      "mousedown",
      this.drawRectangleMouseDownHandler,
    );
    this.canvas.addEventListener(
      "mousemove",
      this.drawRectangleMouseMoveHandler,
    );
    this.canvas.addEventListener("mouseup", this.drawRectangleMouseUpHandler);
  }

  redrawRectangles() {
    for (const rect of this.rectangles) {
      this.ctx.strokeStyle = rect.color;
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    }
  }

  clearRectangles() {
    localStorage.removeItem("rectangles");
    this.rectangles = [];
    this.redrawAll();
  }

  drawLines() {
    this.clearEvents();

    this.drawLinesMouseDownHandler = (event) => {
      this.isDrawing = true;

      const rect = this.canvas.getBoundingClientRect();
      const startX = event.clientX - rect.left;
      const startY = event.clientY - rect.top;

      this.ctx.beginPath();
      this.ctx.moveTo(startX, startY);
      this.lines.push({ startX, startY, points: [] });
    };

    this.drawLinesMouseMoveHandler = (event) => {
      if (this.isDrawing) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        this.ctx.lineTo(x, y);
        this.ctx.strokeStyle = this.selectedColor;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        this.lines[this.lines.length - 1].points.push({ x, y });
      }
    };

    this.drawLinesMouseUpHandler = () => {
      this.isDrawing = false;
      this.ctx.closePath();
    };

    this.canvas.addEventListener("mousedown", this.drawLinesMouseDownHandler);
    this.canvas.addEventListener("mousemove", this.drawLinesMouseMoveHandler);
    this.canvas.addEventListener("mouseup", this.drawLinesMouseUpHandler);
  }

  redrawLines() {
    this.ctx.strokeStyle = this.selectedColor;
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
    this.redrawRectangles();
  }

  toggleGrid() {
    this.gridVisible = !this.gridVisible;
    this.redrawAll();
  }
}
