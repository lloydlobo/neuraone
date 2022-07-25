import { createApp } from "./createApp";
import { createBorders } from "./createBorders";
import { controls } from "../constants/BALL";
import { createNewBall } from "./createNewBall";
import { setCanvasDimensions } from "./setCanvasDimensions";
import { canvas404, errorMsgCanvas404 } from "../interface/canvas404";

export const appIsCreated = createApp() as HTMLDivElement;
if (!appIsCreated) {
  if (canvas404) throw new Error(errorMsgCanvas404);
}

export const canvas = document.querySelector(
  "#canvasBall"
) as HTMLCanvasElement;
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
export const canvasNeuron = document.querySelector(
  "#canvasNeuron"
) as HTMLCanvasElement;
export const ctxNeuron = canvasNeuron.getContext(
  "2d"
) as CanvasRenderingContext2D;

const isSetCanvasDimensions = setCanvasDimensions();
if (!isSetCanvasDimensions) throw new Error();

export const borders = createBorders();
if (!borders) throw new Error();
export const ball = createNewBall(controls.AI);
if (!ball) throw new Error();
