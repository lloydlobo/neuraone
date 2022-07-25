import { fillCanvas } from "./generators/fillCanvas";
import { ball, canvas, canvasNeuron, ctx, ctxNeuron } from "./main";

export function fillCtx() {
  ctx.fillStyle = "#00000045";
  fillCanvas(ctx, canvas, Math.abs(ball.speed) * 2); // animated canvas fill LATER
  fillCanvas(ctxNeuron, canvasNeuron, 50); // animated canvas fill LATER
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctxNeuron.fillRect(0, 0, canvasNeuron.width, canvasNeuron.height);
}
