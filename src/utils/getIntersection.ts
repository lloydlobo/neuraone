import { lerp } from "./lerp";

// https://github.com/gniziemazity/Self-driving-car/blob/70b48f3900/3.%20Artificial%20sensors/utils.js
export function getIntersection(
  A: { x: number; y: number },
  B: { x: number; y: number },
  C: { x: number; y: number },
  D: { x: number; y: number }
) {
  const topT = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
  const topU = (A.x - B.x) * (C.y - A.y) - (A.y - B.y) * (C.x - A.x);
  const bottom = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);

  if (bottom !== 0) {
    const t = topT / bottom;
    const u = topU / bottom;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t,
      };
    }
  }
  return null;
}
