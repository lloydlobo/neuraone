export const createApp = () => {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <canvas id="canvasBall"></canvas>
  <canvas id="canvasNeuron"></canvas>
  `;
};
