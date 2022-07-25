import "./style.css";
import * as dat from "dat.gui"; // dat exported as a namespace

import { addDatGuiFolders } from "./interface/DatGui";
import { loop } from "./logic/loop";
import { incrementControllerSpeed } from "./functions/incrementControllerSpeed";

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
