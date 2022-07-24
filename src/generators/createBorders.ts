import { Borders } from "../classes/Borders";
import { canvas } from "../main";

export function createBorders(scale = 0.9) {
  const BORDERS = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: canvas.width,
    height: canvas.height,
    laneCountX: 3,
    laneCountY: 3,
  };

  const borders = new Borders(
    BORDERS.x,
    BORDERS.y,
    BORDERS.width * scale,
    BORDERS.height * scale,
    BORDERS.laneCountX,
    BORDERS.laneCountY
  );
  return borders;
}
