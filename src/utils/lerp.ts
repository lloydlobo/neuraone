/**
 * Linear Interpolation
 *
 * @example If offset is 1, the interpolated value is B. As A - A = 0
 * @example If offset is 0, the interpolated value is A. As (B - A) * 0 = 0
 * @param {number} A
 * @param {number} B
 * @param {number} offset
 * @returns {number}
 */
export function lerp(A: number, B: number, offset: number): number {
  return A + (B - A) * offset;
}
