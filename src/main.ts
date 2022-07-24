import "./style.css";
// import { fillCanvas } from "./fillCanvas";
import { CONTROLLER, HSLA, WAVE } from "./constants/constants";
import { Ball } from "./classes/Ball";
import { createBorders } from "./generators/createBorders";
import { updateBallColor } from "./generators/updateBallColor";
import { Visualizer } from "./Visualizer";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <canvas id="canvasBall"></canvas>
  <canvas id="canvasNeuron"></canvas>
`;

export const canvas = document.querySelector(
  "#canvasBall"
) as HTMLCanvasElement;
export const canvasNeuron = document.querySelector(
  "#canvasNeuron"
) as HTMLCanvasElement;

export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
export const ctxNeuron = canvasNeuron.getContext(
  "2d"
) as CanvasRenderingContext2D;

canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight;
canvasNeuron.width = window.innerWidth / 2;
canvasNeuron.height = window.innerHeight / 2;
const borders = createBorders();

CONTROLLER.speed = CONTROLLER.increment;

const BALL_PROP = {
  color: `hsla(${HSLA.hue}, ${HSLA.sat}%, ${HSLA.light}%, ${Math.max(
    HSLA.alpha,
    1
  )})`,
};

const ball = new Ball(
  canvas.width / 2,
  canvas.height / 2,
  2,
  2,
  10,
  BALL_PROP.color,
  "KEYS"
);

function loop(time: number) {
  ball.update(canvas, borders.borders);
  // fillCanvas(); // animated canvas fill LATER
  ctx.fillStyle = "#00000045";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  // ctx.translate(TRANSLATE.x, TRANSLATE.y);
  borders.draw(ctx);
  ctx.globalAlpha = 0.85;

  ball.draw(ctx);
  ball.color = updateBallColor(30, -20);

  ctx.restore();

  ctxNeuron.lineDashOffset = -time / 50;
  Visualizer.drawNetwork(ctxNeuron, ball.brain);

  requestAnimationFrame(loop);
  CONTROLLER.increment += WAVE.frequency;
}
loop(1);
