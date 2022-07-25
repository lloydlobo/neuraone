import { Ball } from "../classes/Ball";
import { x, y, velX, velY, size, color, controls } from "../constants/BALL";
import { canvas } from "../appIsCreated";

/**
 * It creates a new ball object with the given parameters
 */

export const newBall = () =>
  new Ball(x(canvas), y(canvas), velX, velY, size, color, controls.AI);
