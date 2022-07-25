import { canvas, canvasNeuron } from "./appIsCreated";

export function setCanvasDimensions() {
  canvas.width = (window.innerWidth * 2) / 3;
  canvas.height = window.innerHeight;
  canvasNeuron.width = window.innerWidth / 2;
  canvasNeuron.height = window.innerHeight / 2;

  return true;
}
