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

  constructor(ball: Ball) {
    this.ball = ball;
    this.rayCount = 3;
    this.rayLength = 250;
    this.raySpread = Math.PI / 2;

    this.rayWidth = 6;
    this.rayDefaultColor = "white";
    this.rayDetectColor = "black";

    this.rays = [];
    // this.borders = []
  }

  update() {
    if (this.rays) {
      this.castRays();
      // console.log("cast rays", this.rays);
    }
  }

  private castRays() {
    this.rays = [];
    let ray;

    for (let i = 0; i < this.rayCount; i += 1) {
      const rayAngle =
        lerp(
          this.raySpread / 26,
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
      // let end = this.rays[i][1];

      ctx.beginPath();
      ctx.lineWidth = this.rayWidth;
      ctx.strokeStyle = this.rayDefaultColor;
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
      // ctx.lineTo(end.x, end.y);
      ctx.lineTo(this.rays[i][0].x, this.rays[i][0].y);
      ctx.stroke();

      // ctx.beginPath();
      // ctx.lineWidth = this.rayWidth;
      // ctx.strokeStyle = this.rayDetectColor;
      // ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
      // ctx.lineTo(end.x, end.y);
      // ctx.stroke();
    }
  }
}
