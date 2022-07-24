// import { lerp } from "../utils/lerp";
import { Network } from "../Network";
import { Controls } from "./Controls";
import { Sensors } from "./Sensors";

type sType = {
  x: number;
  y: number;
  offset: number;
}[];
export class Ball {
  acceleration: number;

  angle: number;

  brain: Network;

  color: string;

  controls: Controls;

  controlsType: string;

  damaged: boolean;

  friction: number;

  maxSpeed: number;

  sensors: Sensors;

  size: number;

  speed: number;

  turningFactor: number;

  useBrain: boolean;

  velX: number;

  velY: number;

  x: number;

  y: number;

  constructor(
    x: number,
    y: number,
    velX: number,
    velY: number,
    size: number,
    color: string,
    controlsType = "KEYS",
    maxSpeed = 3,
    turningFactor = 0.03
  ) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.size = size;

    this.color = color;
    this.damaged = false;

    this.controlsType = controlsType;
    this.controls = new Controls(this.controlsType);
    this.sensors = new Sensors(this);
    this.brain = new Network([this.sensors.rayCount, 6, 4]);

    this.acceleration = 0.2;
    this.angle = 0;
    this.friction = 0.05;
    this.maxSpeed = maxSpeed;
    this.speed = 0;
    this.turningFactor = turningFactor;
    this.useBrain = true || controlsType === "AI";
  }

  update(canvas: HTMLCanvasElement, borders: { x: number; y: number }[][]) {
    if (!this.damaged) {
      this.checkBounds(canvas);
      this.move();
    }
    const arrayOffsets: number[][] = [];
    if (this.sensors) {
      this.sensors.update(borders);
      // this.getOffsets();

      const outputs = Network.feedForward(arrayOffsets, this.brain);
      if (!this.controls.isActive) {
        if (this.useBrain) {
          // this.controls.up = outputs[0];
          // this.controls.left = outputs[1];
          // this.controls.right = outputs[2];
          this.controls.down = outputs[3];
        }
      }
      // else if (this.controls.isActive) {
      //   // this.move();
      //   // this.controls.up = false;
      //   // this.controls.left = false;
      //   // this.controls.right = false;
      //   // this.controls.down = false;
      // }
      // //  else {
      //   this.controls.up = false;
      //   this.controls.left = false;
      //   this.controls.right = false;
      //   this.controls.down = false;
      // }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.sensors) {
      this.sensors.draw(ctx);
    }
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  private move() {
    if (this.controlsType === "KEYS") {
      this.moveManualControls();
      this.x -= Math.sin(this.angle) * this.speed;
      this.y -= Math.cos(this.angle) * this.speed;
    } else if (this.controlsType === "AI") {
      this.x += this.velX;
      this.y += this.velY;
    }
  }

  private moveManualControls() {
    if (this.controls.up) this.speed += this.acceleration;
    if (this.controls.down) this.speed -= this.acceleration;
    if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
    if (this.speed < -this.maxSpeed) this.speed = -this.maxSpeed;
    if (this.speed > 0) this.speed -= this.friction;
    if (this.speed < 0) this.speed += this.friction;
    if (Math.abs(this.speed) < this.friction) this.speed = 0;
    if (this.speed !== 0) {
      const flipPolarity = this.speed > 0 ? 1 : -1;
      if (this.controls.left) this.angle += 0.03 * flipPolarity;
      if (this.controls.right) this.angle -= 0.03 * flipPolarity;
    }
  }

  private checkBounds(canvas: HTMLCanvasElement) {
    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
      this.x = this.size;
    }
    if (this.x + this.size >= canvas.width) {
      this.velX = -this.velX;
      this.x = -this.size + canvas.width;
    }
    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
      this.y = this.size;
    }
    if (this.y + this.size >= canvas.height) {
      this.velY = -this.velY;
      this.y = -this.size + canvas.height;
    }
  }
  private getOffsets(arrayOffsets: number[][]) {
    const offsetWhat = (s: sType) => {
      let offset;
      let result = 0;
      for (const [key, value] of Object.entries(s)) {
        if (value) {
          offset = value.offset;
        }
      }
      if (offset) {
        result = offset;
      }
      return result;
    };
    const offsets = this.sensors.readings.map((s): number =>
      s == null ? 0 : 1 - offsetWhat(s)
    );
    if (offsets) {
      arrayOffsets.push(offsets);
      console.log(offsets);
    }
  }
}

// private getAngle() { //   let endY = 0; //   let endX = 0; //   const flipX = this.velX > 0 ? 1 : -1; //   const flipY = this.velY > 0 ? 1 : -1; //   endY = //     this.y * flipY - //     Math.cos(this.angle * flipY) * this.sensors.rayLength * flipY; //   endX = //     this.x * flipX - //     Math.sin(this.angle * flipX) * this.sensors.rayLength * flipX; //   // TODO Add flip feature //   const deltaY = endY - this.y; //   const deltaX = endX - this.x; //   // Vector 2 is now relative to origin, the angle is the same, we have just transformed it to use the origin.  //   // https://stackoverflow.com/a/62296196 //    let angleInDegrees = (Math.atan2(deltaY, deltaX) * 180) / 3.141; //   let angle = (Math.atan2(deltaY * flipY, deltaX * flipX) * 180) / 3.141; //   angle *= -1; // Y axis is inverted in computer windows, Y goes down, so invert the angle.  //   console.log(this.angle, this.x, this.y, this.velX, this.velY); //   return (parseFloat(angle.toFixed(4)) / 180) * 3.141; // }
