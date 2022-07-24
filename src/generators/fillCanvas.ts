import { ctx, canvas } from "../main";
import { HSLA, CONTROLLER, WAVE } from "../constants/constants";

export function fillCanvas() {
  ctx.fillStyle = `hsla(
    ${
      HSLA.hue +
      (Math.sin(CONTROLLER.increment) / CONTROLLER.increment) * WAVE.amplitude +
      WAVE.amplitude * CONTROLLER.increment
    },
    ${HSLA.sat}%,
    ${HSLA.light}%,
    ${HSLA.alpha}
    )`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
