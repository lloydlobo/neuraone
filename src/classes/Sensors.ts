import { lerp } from "../utils/lerp";
import { Ball } from "./Ball";
import { getAngleRatioForFullSpread } from "../functions/getAngleRatioForFullSpread";
import { getReading } from "../functions/getReading";

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
    const innerRayRatio = getAngleRatioForFullSpread(countRandomSensor); // 330/180 ~~~ radDiff/(Math.Pi)

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
      const reading = getReading(this.rays[i], borders);
      this.readings.push(reading!);
    }
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
        // eslint-disable-next-line no-restricted-syntax, no-unused-vars
        for (const [key, value] of Object.entries(this.readings[i])) {
          endX = value.x;
          endY = value.y;
          // eslint-disable-next-line no-console
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
}
