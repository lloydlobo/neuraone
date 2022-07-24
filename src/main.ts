import "./style.css";
import { CONTROLLER, HSLA, WAVE } from "./constants/constants";
import { Ball } from "./classes/Ball";
import { createBorders } from "./generators/createBorders";
import { updateBallColor } from "./generators/updateBallColor";
import { fillCanvas } from "./generators/fillCanvas";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <canvas></canvas>
`;

export const canvas = document.querySelector("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const borders = createBorders(90 / 100);

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

export const CTX = {
  translateX: -ball.x + canvas.width / 2,
  translateY: -ball.y + canvas.height * 0.7,
};
function loop() {
  ball.update(canvas, borders.borders);
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  // ctx.fillStyle = "#00f0ff45";
  fillCanvas(); // animated canvas fill LATER
  ctx.save();
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  CTX.translateX = -ball.x + canvas.width / 2;
  CTX.translateY = -ball.y + canvas.height * 0.7;
  ctx.translate(CTX.translateX, CTX.translateY);

  borders.update(ctx, CTX.translateX, CTX.translateY);
  // borders.update( ctx, -ball.x + canvas.width / 2, -ball.y + canvas.height * 0.7);
  borders.draw(ctx);

  ctx.globalAlpha = 0.9;
  ball.draw(ctx);
  ball.color = updateBallColor(30, -30);


  ctx.restore();
  CONTROLLER.increment += WAVE.frequency;
  requestAnimationFrame(loop);
}
loop();
