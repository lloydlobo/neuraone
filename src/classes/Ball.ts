import { Sensors } from "./Sensors";

export class Ball {
  x: number;

  y: number;

  velX: number;

  velY: number;

  size: number;

  color: string;

  sensors: Sensors;

  angle: number;

  constructor(
    x: number,
    y: number,
    velX: number,
    velY: number,
    size: number,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.size = size;
    this.color = color;

    this.angle = 0;
    this.sensors = new Sensors(this);
  }

  update(canvas: HTMLCanvasElement, borders: { x: number; y: number }[][]) {
    this.checkBounds(canvas);
    this.move();

    if (this.sensors) {
      this.sensors.update(borders);
      // console.log("sensor update");
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();

    if (this.sensors) {
      this.sensors.draw(ctx);
    }
  }

  private move() {
    this.x += this.velX;
    this.y += this.velY;
  }

  private checkBounds(canvas: HTMLCanvasElement) {
    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }
    if (this.x + this.size >= canvas.width) {
      this.velX = -this.velX;
    }
    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }
    if (this.y + this.size >= canvas.height) {
      this.velY = -this.velY;
    }
  }
}
