import "./style.css";
// import { fillCanvas } from "./fillCanvas";
import { CONTROLLER, HSLA, WAVE } from "./constants/constants";
import { Ball } from "./classes/Ball";
import { createBorders } from "./generators/createBorders";
import { updateBallColor } from "./generators/updateBallColor";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <canvas></canvas>
`;

export const canvas = document.querySelector("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
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
  12,
  12,
  10,
  BALL_PROP.color
);

function loop() {
  ball.update(canvas);
  // fillCanvas(); // animated canvas fill LATER
  ctx.fillStyle = "#00000045";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  // ctx.translate(TRANSLATE.x, TRANSLATE.y);
  borders.draw(ctx);
  ball.draw(ctx);
  ball.color = updateBallColor(30, -30);

  ball.sensors.draw(ctx);
  ctx.restore();
  requestAnimationFrame(loop);
  CONTROLLER.increment += WAVE.frequency;
}
loop();
