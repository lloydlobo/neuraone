import { HSLA } from "./constants";

const BALL = {
  x: (CANVAS: HTMLCanvasElement) => CANVAS.width / 2,
  y: (CANVAS: HTMLCanvasElement) => CANVAS.height / 2,
  velX: 2,
  velY: 2,
  size: 10,
  color: `hsla(${HSLA.hue}, ${HSLA.sat}%, ${HSLA.light}%, ${Math.max(
    HSLA.alpha,
    1
  )})`,
  controls: { AI: "AI" },
};
export const { x, y, velX, velY, size, color, controls } = BALL;
