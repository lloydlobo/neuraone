import { updateBallColor } from "../generators/updateBallColor";

export class Borders {
  x: number;

  y: number;

  width: number;

  height: number;

  laneCountX: number;

  laneCountY: number;

  left: number;

  right: number;

  top: number;

  bottom: number;

  topLeft: { x: number; y: number };

  bottomLeft: { x: number; y: number };

  topRight: { x: number; y: number };

  bottomRight: { x: number; y: number };

  borders: { x: number; y: number }[][];

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    laneCountX = 3,
    laneCountY = 3
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.laneCountX = laneCountX;
    this.laneCountY = laneCountY;
    // x & y - midpoints of canvas width & height
    this.left = this.x - width / 2;
    this.right = this.x + width / 2;
    this.top = this.y - height / 2;
    this.bottom = this.y + height / 2;

    this.topLeft = { x: this.left, y: this.top };
    this.bottomLeft = { x: this.left, y: this.bottom };
    this.topRight = { x: this.right, y: this.top };
    this.bottomRight = { x: this.right, y: this.bottom };

    this.borders = [
      [this.topLeft, this.topRight],
      [this.topRight, this.bottomRight],
      [this.bottomRight, this.bottomLeft],
      [this.bottomLeft, this.topLeft],
    ]; // consistent as the rays[[start, end]] type
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.borders.length; i += 1) {
      ctx.beginPath();
      ctx.strokeStyle = updateBallColor(-10, -30);
      ctx.lineWidth = 8;
      ctx.moveTo(this.borders[i][0].x, this.borders[i][0].y);
      ctx.lineTo(this.borders[i][1].x, this.borders[i][1].y);
      ctx.stroke();
    }
  }
}
