import { Canvas } from "./js/Canvas";
import { ColorsPallete } from "./js/Colors";
import { ToolsButtons } from "./js/ToolsButtons";

class Main {
  init() {
    document.addEventListener("DOMContentLoaded", () => {
      const canvasContainer = document.getElementById("canvasContainer");

      if (!canvasContainer) return;

      const width = Number.parseInt(canvasContainer.offsetWidth);
      const height = Number.parseInt(canvasContainer.offsetHeight);

      const canvas = new Canvas(width, height);
      canvas.initCanvas();
      canvas.getMousePosition();
      const toolsButtonsContainer = document.getElementById(
        "toolsButtonsContainer",
      );

      const toolsButtons = new ToolsButtons(canvas).getButtons();

      for (const button of toolsButtons) {
        const btn = document.createElement("button");
        btn.setAttribute("id", button.id);
        btn.addEventListener("click", button.onclick);
        btn.textContent = button.name;
        btn.classList.add(button.className);
        toolsButtonsContainer.appendChild(btn);
      }

      const colorPalleteButtons = new ColorsPallete(canvas);
      colorPalleteButtons.initColors();
    });
  }
}

const main = new Main();
main.init();
