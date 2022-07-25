import { getIntersection } from "../utils/getIntersection";
import { lerp } from "../utils/lerp";
import { Ball } from "./Ball";

export class Sensors {
  rayCount: number;

  rayWidth: number;

  raySpread: number;

  rayLength: number;

  rays: { x: number; y: number }[][];

  ball: Ball;

  rayDefaultColor: string;

  rayDetectColor: string;

  readings: { x: number; y: number; offset: number }[][];
  sensorType: string;

  constructor(ball: Ball, sensorType = "DRIVE") {
    this.ball = ball;
    this.sensorType = sensorType;

    const countRandomSensor = 12;
    const countDriveAIKeysSensor = 3;
    this.rayCount =
      this.sensorType !== "RANDOM" ? countRandomSensor : countDriveAIKeysSensor;
    const innerRayRatio =
      getInnerRatioConverterForEvenRaysInUnitCircle(countRandomSensor); // 330/180 ~~~ radDiff/(Math.Pi)

    const raySpreadRandom =
      this.rayCount % 2 === 0 ? Math.PI * innerRayRatio : Math.PI;
    this.raySpread =
      this.sensorType !== "RANDOM" ? raySpreadRandom : Math.PI / 2;

    this.rayLength = 150;
    this.rayWidth = 2;

    this.rayDefaultColor = "yellow";
    this.rayDetectColor = "red";

    this.rays = [];
    this.readings = [];
  }

  update(borders: { x: number; y: number }[][]) {
    this.castRays();
    this.readings = [];
    for (let i = 0; i < this.rays.length; i += 1) {
      console.log(this.rays, this.rays[i], i);
      const reading = this.getReading(this.rays[i], borders);
      // if (!reading) {
      // return null; // this is iterating only once
      // }
      this.readings.push(reading!);
    }
    // console.log(
    //   "file: Sensors.ts | line 45 | Sensors | update | this.readings",
    //   this.readings
    // );
  }

  private getReading(
    ray: { x: number; y: number }[],
    borders: { x: number; y: number }[][]
  ): { x: number; y: number; offset: number }[] | null {
    console.log(ray);
    let arrayTouches = this.pushIntersectedTouch(borders, ray); // for loop

    if (arrayTouches.length === 0) {
      // no intersection ==> break function call
      return null;
    } else {
      const arrayOffsets = this.mapArrayTouchesOffsets(arrayTouches);
      const offsetMinimum = Math.min(...arrayOffsets) as number; // spread

      return this.findArrayMinTouchOffset(arrayTouches, offsetMinimum);
    } // end of if else
  }

  private castRays() {
    this.rays = [];
    let ray;

    for (let i = 0; i < this.rayCount; i += 1) {
      const rayAngle =
        lerp(
          this.raySpread / 2,
          -this.raySpread / 2,
          this.rayCount === 1 ? 0.5 : i / (this.rayCount - 1)
        ) + this.ball.angle;

      const start = { x: this.ball.x, y: this.ball.y };
      const end = {
        x: this.ball.x - Math.sin(rayAngle) * this.rayLength,
        y: this.ball.y - Math.cos(rayAngle) * this.rayLength,
      };
      ray = [start, end];

      this.rays.push(ray);
    }
  } // end private castRays()

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.rayCount; i += 1) {
      let end = this.rays[i][1];

      if (this.readings[i]) {
        let endX;
        let endY;
        for (const [key, value] of Object.entries(this.readings[i])) {
          endX = value.x;
          endY = value.y;
          console.log(key, end);
        }
        if (endX && endY) {
          end = { x: endX, y: endY };
        }
      }

      ctx.beginPath();
      ctx.lineWidth = this.rayWidth;
      ctx.strokeStyle = this.rayDefaultColor;
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = this.rayWidth;
      ctx.strokeStyle = this.rayDetectColor;
      ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
  } // end draw()

  // #1 Map out offsets to array
  private mapArrayTouchesOffsets(
    arrayTouches: { x: number; y: number; offset: number }[]
  ) {
    const arrayOffsets = [] as number[];
    for (let i = 0; i < arrayTouches.length; i += 1) {
      arrayOffsets.push(arrayTouches[i].offset);
    }
    return arrayOffsets;
  }

  // #3 Find touches with minimum offset
  private findArrayMinTouchOffset(
    arrayTouches: { x: number; y: number; offset: number }[],
    offsetMinimum: number
  ) {
    const arrayMinTouchOffset = [] as {
      x: number;
      y: number;
      offset: number;
    }[];
    for (let i = 0; i < arrayTouches.length; i += 1) {
      if (arrayTouches[i].offset === offsetMinimum) {
        arrayMinTouchOffset.push(arrayTouches[i]);
      }
    }

    return arrayMinTouchOffset;
  }

  private getArrTouchesIntersected(
    borders: { x: number; y: number }[][],
    ray: { x: number; y: number }[],
    arrayTouches: { x: number; y: number; offset: number }[]
  ) {
    for (let i = 0; i < borders.length; i += 1) {
      const touch = getIntersection(
        ray[0],
        ray[1],
        borders[i][0],
        borders[i][1]
      ) as { x: number; y: number; offset: number };

      if (touch) {
        arrayTouches.push(touch);
      }
    }
  }

  private pushIntersectedTouch(
    borders: { x: number; y: number }[][],
    ray: { x: number; y: number }[]
  ) {
    let arrayTouches = [] as { x: number; y: number; offset: number }[];
    this.getArrTouchesIntersected(borders, ray, arrayTouches); // for loop
    return arrayTouches;
  }
}

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
function getInnerRatioConverterForEvenRaysInUnitCircle(
  countRandomSensor: number
): number {
  const angleUnitCircle = 2 * 180; // 360Deg
  // 360/12 = 30
  const angleForEachInnerRay = angleUnitCircle / countRandomSensor;
  // 360 - 30 = 330
  const angleDiffOuter = angleUnitCircle - angleForEachInnerRay;
  // 330/180 ~~~ radDiff/(Math.Pi)
  const innerRayRatio = angleDiffOuter / 180;

  return innerRayRatio;
}
