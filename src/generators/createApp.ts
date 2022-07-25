export const createApp = () => {
  const app = document.querySelector<HTMLDivElement>("#app") as HTMLDivElement;

  app.innerHTML = `
  <canvas id="canvasBall"></canvas>
  <canvas id="canvasNeuron"></canvas>
  `;

  return app;
};
