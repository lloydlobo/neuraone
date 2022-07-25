import "./style.css";
// import { fillCanvas } from "./fillCanvas";
import { CONTROLLER, WAVE } from "./constants/constants";
import { createBorders } from "./generators/createBorders";
import { updateBallColor } from "./generators/updateBallColor";
import { Visualizer } from "./Visualizer";
import { fillCtx } from "./fillCtx";
import { controls } from "./BALL";
import { createNewBall } from "./createNewBall";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <canvas id="canvasBall"></canvas>
  <canvas id="canvasNeuron"></canvas>
`;

export const canvas = document.querySelector( "#canvasBall") as HTMLCanvasElement; // prettier-ignore
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
export const canvasNeuron = document.querySelector( "#canvasNeuron") as HTMLCanvasElement; // prettier-ignore
export const ctxNeuron = canvasNeuron.getContext( "2d") as CanvasRenderingContext2D; // prettier-ignore

canvas.width = (window.innerWidth * 2) / 3;
canvas.height = window.innerHeight;
canvasNeuron.width = window.innerWidth / 2;
canvasNeuron.height = window.innerHeight / 2;

const borders = createBorders();
export const ball = createNewBall(controls.AI);
/* Setting the speed of the ball to the increment of the controller. */
CONTROLLER.speed = CONTROLLER.increment;

/**
 * `loop` is a function that takes an optional parameter `time` and updates the ball's position, draws
 * the borders, and draws the ball
 * @param {number} [time] - the time in milliseconds since the page was loaded
 */
function loop(time?: number) {
  ball.update(canvas, borders.borders);
  fillCtx();

  ctx.save();
  borders.draw(ctx);
  ctx.globalAlpha = 0.95;
  ball.draw(ctx);
  ball.color = updateBallColor(30, -20);
  ctx.globalAlpha = 1;
  ctx.restore();

  ctxNeuron.lineDashOffset = (-1 * time!) / 50;
  Visualizer.drawNetwork(ctxNeuron, ball.brain);
  CONTROLLER.increment += WAVE.frequency;
  /* Calling the loop function every time the browser is ready to repaint the canvas. */
  requestAnimationFrame(loop);
}

/**
 * Loops canvas and canvasNeuron context and feedForward the network
 * @param {number} [time] - the time in milliseconds since the page was loaded
 * @returns {void}
 */
loop();
