import "./style.css";
import * as dat from "dat.gui"; // dat exported as a namespace

import { createApp } from "./generators/createApp";
import { createBorders } from "./generators/createBorders";
import { controls } from "./constants/BALL";
import { createNewBall } from "./generators/createNewBall";
import { addDatGuiFolders } from "./interface/DatGui";
import { setCanvasDimensions } from "./generators/setCanvasDimensions";
import { loop } from "./logic/loop";
import { incrementControllerSpeed } from "./functions/incrementControllerSpeed";

createApp();
if (!createApp) throw new Error();
export const canvas = document.querySelector( "#canvasBall") as HTMLCanvasElement; // prettier-ignore
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
export const canvasNeuron = document.querySelector( "#canvasNeuron") as HTMLCanvasElement; // prettier-ignore
export const ctxNeuron = canvasNeuron.getContext( "2d") as CanvasRenderingContext2D; // prettier-ignore
setCanvasDimensions();
(async() => { if (!setCanvasDimensions) throw new Error(); })(); // prettier-ignore
export const borders = createBorders();
(async() => { if (!borders) throw new Error(); })(); // prettier-ignore
export const ball = createNewBall(controls.AI);
(async() => { if (!ball) throw new Error(); })(); // prettier-ignore

/**
 * It loops the canvas and canvasNeuron context and feedForward the network
 * @returns {void}
 */
function main(): void {
  /**
   * Setting the speed of the ball to the increment of the controller.
   * @returns {void}
   */
  incrementControllerSpeed();
  /**
   * Loops canvas and canvasNeuron context and feedForward the network
   * @param {number} [time] - the time in milliseconds since the page was loaded
   * @returns {void}
   */
  loop();
  /**
   * Creating a GUI and a subfolder.
   * @param {{ GUI: new () => any }} dat
   * @returns {void}
   */
  addDatGuiFolders(dat);
}

main();
