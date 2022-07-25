export const canvasBall = document.getElementById(
  "canvasBall"
) as HTMLCanvasElement;
export const canvasNeuron = document.getElementById(
  "canvasNeuron"
) as HTMLCanvasElement;

export const canvas404 =
  (!canvasBall && !canvasNeuron) || !canvasBall || !canvasNeuron;

export const errorMsgCanvas404 = `Canvas: #1 Ball & #2 Neuron are not available`;
