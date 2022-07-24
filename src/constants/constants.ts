export const HSLA = {
  hue: 0,
  sat: 50,
  light: 50,
  alpha: 0.25,
};

export const WAVE = {
  frequency: 0.01,
  amplitude: 100,
  wavelength: 20,
};

export const CONTROLLER = {
  speed: 0,
  increment: WAVE.frequency,
  angle: 0,
};

export const TRANSLATE = {
  x: -Math.sin(CONTROLLER.angle) * CONTROLLER.speed,
  y: -Math.cos(CONTROLLER.angle) * CONTROLLER.speed,
};
