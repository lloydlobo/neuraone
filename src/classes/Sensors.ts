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

  readings;

  constructor(ball: Ball) {
    this.ball = ball;
    this.rayCount = 3;
    this.raySpread = Math.PI / 2;
    this.rayLength = this.ball.size * 1.618 * this.raySpread * this.rayCount;

    this.rayWidth = 2;
    this.rayDefaultColor = "yellow";
    this.rayDetectColor = "green";

    this.rays = [];
    this.readings = [];
  }

  update(borders: { x: number; y: number }[][]) {
    this.castRays();
    this.readings = [];

    for (let i = 0; i < this.rays.length; i += 1) {
      const reading = this.getReading(this.rays[i], borders);
      if (!reading) return;
      // console.log({ i, reading });
      this.readings.push(reading);
    }

    console.log(
      "file: Sensors.ts | line 45 | Sensors | update | this.readings",
      this.readings
    );

  }

  private getReading(
    ray: { x: number; y: number }[],
    borders: { x: number; y: number }[][]
  ): { x: number; y: number; offset: number }[] | null {
    let arrayTouches = [] as { x: number; y: number; offset: number }[];
    for (let i = 0; i < borders.length; i += 1) {
      const touch = getIntersection(
        ray[0],
        ray[1],
        borders[i][0],
        borders[i][1]
      ) as { x: number; y: number; offset: number } | null;
      if (touch) {
        arrayTouches.push(touch);
      }
    } // end for loop
    if (arrayTouches.length === 0) {
      return null; // no intersection ==> break function call
    } else {
      const arrayOffsets = this.mapArrayTouchesOffsets(arrayTouches);
      const offsetMinimum = Math.min(...arrayOffsets) as number; // spread
      return this.findArrayMinTouchOffset(arrayTouches, offsetMinimum);
    } // end of if else
  }

  private castRays() {
    this.rays = [];

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

      this.rays.push([start, end]);
    }
  } // end private castRays()

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.rayCount; i += 1) {
      let end = this.rays[i][1];
      if (this.readings[i]) {
        end = this.readings[i];
      }

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
  } // end draw()

  // HELPER FUNCTIONS ----------------------------------------------------------

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
  ): { x: number; y: number; offset: number }[] {
    const arrayMinTouchOffset = [];
    for (let i = 0; i < arrayTouches.length; i += 1) {
      if (arrayTouches[i].offset === offsetMinimum) {
        arrayMinTouchOffset.push(arrayTouches[i]);
      }
    }

    return arrayMinTouchOffset;
  }
}
