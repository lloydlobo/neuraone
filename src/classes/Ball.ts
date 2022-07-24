import { lerp } from "../utils/lerp";
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

    this.sensors = new Sensors(this);
    // this.angle = this.getAngle();
    this.angle = 0;
  }

  private getAngle() {
    let endY = 0;
    let endX = 0;
    const flipX = this.velX > 0 ? 1 : -1;
    const flipY = this.velY > 0 ? 1 : -1;

    endY = this.y * flipY - Math.cos(this.angle) * this.sensors.rayLength;
    endX = this.x * flipX - Math.sin(this.angle) * this.sensors.rayLength;
    // TODO Add flip feature
    const deltaY = endY - this.y * flipY;
    const deltaX = endX - this.x * flipX;
    // Vector 2 is now relative to origin, the angle is the same, we have just transformed it to use the origin.
    // https://stackoverflow.com/a/62296196

    //Angle returned as:
    //                      90
    //            135                45
    //
    //       180          Origin           0
    //
    //
    //           -135                -45
    //
    //                     -90

    // let angleInDegrees = (Math.atan2(deltaY, deltaX) * 180) / 3.141;
    let angle = (Math.atan2(deltaY, deltaX) * 180) / 3.141;

    // angle *= -1; // Y axis is inverted in computer windows, Y goes down, so invert the angle.
    console.log(this.angle, this.x, this.y, this.velX, this.velY);

    return (parseFloat(angle.toFixed(4)) / 180) * 3.141;
  }

  update(canvas: HTMLCanvasElement, borders: { x: number; y: number }[][]) {
    this.checkBounds(canvas);
    this.move();
    this.angle = this.getAngle();

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
