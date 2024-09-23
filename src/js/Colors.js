export class ColorsPallete {
  constructor(canvas) {
    this.colorsList = [
      "#000000",
      "#808080",
      "#C0C0C0",
      "#FFFFFF",
      "#FF0000",
      "#800000",
      "#FFFF00",
      "#808000",
      "#00FF00",
      "#008000",
      "#00FFFF",
      "#008080",
      "#0000FF",
      "#000080",
      "#FF00FF",
      "#800080",
    ];
    this.canvas = canvas;
    this.selectedColor = "#000000";
    this.colorsButtonList = [];
  }

  initColors() {
    const containerId = "colorPalleteContainer";

    const palletteBtnContainer = document.getElementById(containerId);
    if (palletteBtnContainer) {
      for (const color in this.colorsList) {
        const btn = document.createElement("button");
        btn.classList.add("palette-btn");
        btn.style.background = this.colorsList[color];
        btn.addEventListener("click", () => {
          this.canvas.setSelectedColor(this.colorsList[color]);
        });
        this.colorsButtonList.push(btn);
      }

      for (const button in this.colorsButtonList) {
        palletteBtnContainer.append(this.colorsButtonList[button]);
      }
    }
  }

  getSelectedColor() {
    return this.selectedColor;
  }
}
