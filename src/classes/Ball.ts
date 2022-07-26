// import { lerp } from "../utils/lerp";
import { Network } from "../network/Network";
import { Controls } from "./Controls";
import { Sensors } from "./Sensors";

type sType = {
  x: number;
  y: number;
  offset: number;
}[];
/* It's a ball that can move around the screen, and it has sensors that can detect the walls */
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

  speedX: number;

  speedY: number;

  outputs: any[] = [];

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

    this.speedX = 0;
    this.speedY = 0;

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
    this.useBrain = controlsType === "AI" || controlsType === "RANDOM";
  }

  update(canvas: HTMLCanvasElement, borders: { x: number; y: number }[][]) {
    if (!this.damaged) {
      this.checkBounds(canvas);
      this.move();
    }
    const arrayOffsets: number[][] = [];
    if (this.sensors) {
      this.sensors.update(borders);
      // console.log(this.sensors.readings);
      this.getOffsets(arrayOffsets);

      // const outputs = Network.feedForward(arrayOffsets, this.brain);
      this.outputs = Network.feedForward(arrayOffsets, this.brain);

      if (this.useBrain) {
        const index = 0;
        let [up, left, right, down] = this.outputs;
        up = this.outputs[index];
        left = this.outputs[index + 1];
        right = this.outputs[index + 2];
        down = this.outputs[index + 3];

        // eslint-disable-next-line no-console
        console.log(up, left, right, down);
        // this.speedX = 0;
        // this.speedY = 0;
        if (this.controlsType === "RANDOM") {
          const flipX = this.velX > 0 ? 1 : -1;
          const flipY = this.velY > 0 ? 1 : -1;
          this.speedX = flipX === 1 ? right * 1 : left * -1;
          this.speedY = flipY === 1 ? down * 1 : up * -1;
          // this.speedX = up * flipX * Math.sin(left + right);
          // this.speedY = down * flipY * Math.cos(left + right);
        } else if (this.controlsType === "AI") {
          this.controls.up = up;
          this.controls.left = left;
          this.controls.right = right;
          this.controls.down = down;
        }
        // this.controls.up = outputs[0]; this.controls.left = outputs[1]; this.controls.right = outputs[2]; this.controls.down = outputs[3];
      }
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
    const flipX = this.velX > 0 ? 1 : -1;
    const flipY = this.velY > 0 ? 1 : -1;
    if (this.controlsType === "KEYS" || this.controlsType === "AI") {
      this.moveManualControls();
      this.x -= Math.sin(this.angle) * this.speed;
      this.y -= Math.cos(this.angle) * this.speed;
    } else if (this.controlsType === "RANDOM") {
      if (this.useBrain) {
        if (this.outputs) {
          if (this.speedX !== 0 && this.speedY !== 0) {
            this.x -=
              Math.sin(this.angle) * this.velX * this.speedX +
              flipX * this.speedX * 4;
            this.y -=
              Math.cos(this.angle) * this.velY * this.speedY +
              flipY * this.speedY * 4;
          } else {
            this.x += this.velX;
            this.y += this.velY;
          }
        }
      }
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
      // eslint-disable-next-line no-restricted-syntax, no-unused-vars
      for (const [key, value] of Object.entries(s)) {
        if (value) {
          offset = value.offset;
          // eslint-disable-next-line no-console
          console.log(key);
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
    }
  }
}

// private getAngle() { //   let endY = 0; //   let endX = 0; //   const flipX = this.velX > 0 ? 1 : -1; //   const flipY = this.velY > 0 ? 1 : -1; //   endY = //     this.y * flipY - //     Math.cos(this.angle * flipY) * this.sensors.rayLength * flipY; //   endX = //     this.x * flipX - //     Math.sin(this.angle * flipX) * this.sensors.rayLength * flipX; //   //  Add flip feature //   const deltaY = endY - this.y; //   const deltaX = endX - this.x; //   // Vector 2 is now relative to origin, the angle is the same, we have just transformed it to use the origin.  //   // https://stackoverflow.com/a/62296196 //    let angleInDegrees = (Math.atan2(deltaY, deltaX) * 180) / 3.141; //   let angle = (Math.atan2(deltaY * flipY, deltaX * flipX) * 180) / 3.141; //   angle *= -1; // Y axis is inverted in computer windows, Y goes down, so invert the angle.  //   console.log(this.angle, this.x, this.y, this.velX, this.velY); //   return (parseFloat(angle.toFixed(4)) / 180) * 3.141; // }
