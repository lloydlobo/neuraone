import { Ball } from "./classes/Ball";
import { x, y, velX, velY, size, color, controls } from "./BALL";
import { canvas } from "./main";

/**
 * It creates a new ball object with the given parameters
 */

export const newBall = () =>
  new Ball(x(canvas), y(canvas), velX, velY, size, color, controls.AI);
