import { createApp } from "./generators/createApp";
import { createBorders } from "./generators/createBorders";
import { controls } from "./constants/BALL";
import { createNewBall } from "./generators/createNewBall";
import { setCanvasDimensions } from "./generators/setCanvasDimensions";
import { canvas404, errorMsgCanvas404 } from "./interface/canvas404";

const appIsCreated = createApp() as HTMLDivElement;
if (!appIsCreated) if (canvas404) throw new Error(errorMsgCanvas404);

export const canvas = document.querySelector("#canvasBall") as HTMLCanvasElement; // prettier-ignore

export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
export const canvasNeuron = document.querySelector("#canvasNeuron") as HTMLCanvasElement; // prettier-ignore

export const ctxNeuron = canvasNeuron.getContext("2d") as CanvasRenderingContext2D; // prettier-ignore

setCanvasDimensions();
(async () => {
  if (!setCanvasDimensions)
    throw new Error();
})(); // prettier-ignore

export const borders = createBorders();
(async () => {
  if (!borders)
    throw new Error();
})(); // prettier-ignore

export const ball = createNewBall(controls.AI);
(async () => {
  if (!ball)
    throw new Error();
})(); // prettier-ignore
