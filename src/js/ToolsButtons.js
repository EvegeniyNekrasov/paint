export class ToolsButtons {
  constructor(canvas) {
    this.canvas = canvas;

    this.buttonsList = [
      {
        id: "dotsButton",
        className: "dots",
        name: "dot",
        onclick: () => this.canvas.drawDot(),
      },
      {
        id: "gridButton",
        className: "grid",
        name: "grid",
        onclick: () => this.canvas.toggleGrid(),
      },
      {
        id: "linesButton",
        className: "lines",
        name: "line",
        onclick: () => this.canvas.drawLines(),
      },
      {
        id: "rectangleButton",
        className: "rectangle",
        name: "rect",
        onclick: () => this.canvas.drawRectangle(),
      },
      {
        id: "clearCanvasBtn",
        className: "clear",
        name: "clear",
        onclick: () => this.canvas.clearBoard()
      }
    ];
  }

  getButtons() {
    return this.buttonsList;
  }
}
