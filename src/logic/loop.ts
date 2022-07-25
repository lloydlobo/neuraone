import { updateBallColor } from "../generators/updateBallColor";
import { Visualizer } from "../network/Visualizer";
import { fillCtx } from "../generators/fillCtx";
import {
  ball,
  borders,
  canvas,
  ctx,
  ctxNeuron,
} from "../generators/appIsCreated";
import { CONTROLLER, WAVE } from "../constants/constants";

/**
 * `loop` is a function that takes an optional parameter `time` and
 * updates the ball's position, draws the borders, and draws the ball
 * @param {number} [time] - the time in milliseconds since the page was loaded
 */
export function loop(time?: number) {
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
