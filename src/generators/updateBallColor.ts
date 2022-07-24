import { CONTROLLER, HSLA, WAVE } from "../constants/constants";

export function updateBallColor(saturation: number, brightness: number) {
  return `hsla(${HSLA.hue - Math.sin(CONTROLLER.increment) * WAVE.amplitude * WAVE.frequency + WAVE.amplitude * CONTROLLER.increment}, ${HSLA.sat + saturation + WAVE.frequency + Math.sin(CONTROLLER.increment) / CONTROLLER.increment}%, ${HSLA.light + brightness - Math.sin(CONTROLLER.increment) / CONTROLLER.increment}%, ${Math.max(HSLA.alpha, 1)})`; // prettier-ignore
}
