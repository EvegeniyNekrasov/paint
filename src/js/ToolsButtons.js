import { addListener } from "../helpers/main-helper";

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
    ];
  }

  getButtons() {
    return this.buttonsList;
  }
}
