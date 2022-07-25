import { Ball } from "../classes/Ball";
import { x, y, velX, velY, size, color, controls } from "../constants/BALL";
import { canvas } from "../main";

/**
 * It creates a new ball object with the given parameters
 * @param {string} controlsType=controls.AI
 * @returns {Ball}
 */

export const createNewBall = (controlsType = controls.AI as string): Ball =>
  new Ball(x(canvas), y(canvas), velX, velY, size, color, controlsType);
