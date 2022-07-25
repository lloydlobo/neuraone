/**
 * Gets angle ratio to convert even rays for 360Deg coverage like a clock
 *
 * @param {number} countRandomSensor
 * @returns {number} innerRayRatio
 *
 * @example
 *  - (360 - 360/12) = 330 ; 5.75959 radian
 *  - 180Deg × π/180 = 3.14159Rad
 *  - 55/30 = 1.8333333333 => 55*2*3/30*2*3 => 330/180
 *  - 5.75959/3.14159 = 1.8333359859 * Math.PI
 *
 */
export function getAngleRatioForFullSpread(countRandomSensor: number): number {
  const angleUnitCircle = 2 * 180; // 360Deg

  // 360/12 = 30
  const angleForEachInnerRay = angleUnitCircle / countRandomSensor;
  // 360 - 30 = 330
  const angleDiffOuter = angleUnitCircle - angleForEachInnerRay;
  // 330/180 ~~~ radDiff/(Math.Pi)
  const innerRayRatio = angleDiffOuter / 180;

  return innerRayRatio;
}
