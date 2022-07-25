import { CONTROLLER } from "../constants/constants";

/**
 * Setting the speed of the ball to the increment of the controller.
 * @returns {void}
 */
export function incrementControllerSpeed(): void {
  CONTROLLER.speed = CONTROLLER.increment;
}
