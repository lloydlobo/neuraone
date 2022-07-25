export class Controls {
  up: boolean;

  down: boolean;

  left: boolean;

  right: boolean;

  isActive: boolean;

  constructor(controlType: string) {
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.isActive = false;

    switch (controlType) {
      case "KEYS": {
        this.addKeyboardEventListener();
        break;
      }
      case "AI": {
        this.up = true;
        this.left = true;
        break;
      }
      default: {
        break;
      }
    } // switch (controlType)
  } // constructor()

  private addKeyboardEventListener() {
    window.onkeydown = (event) => {
      this.isActive = true;
      this.move(event, true);
    };

    window.onkeyup = (event) => {
      this.isActive = false;
      this.move(event, false);
    };
  } // private addKeyboardEventListener()

  private move(event: KeyboardEvent, isTrueOrFalse: boolean) {
    if (
      event.key === "ArrowUp" ||
      event.key === "Up" ||
      event.key === "w"
      // event.key === "W"
    ) {
      this.up = isTrueOrFalse;
    }
    if (
      event.key === "ArrowDown" ||
      event.key === "Down" ||
      event.key === "s"
    ) {
      this.down = isTrueOrFalse;
    }
    if (
      event.key === "ArrowLeft" ||
      event.key === "Left" ||
      event.key === "a"
    ) {
      this.left = isTrueOrFalse;
    }
    if (
      event.key === "ArrowRight" ||
      event.key === "Right" ||
      event.key === "d"
    ) {
      this.right = isTrueOrFalse;
    }
  } // private move(event)
} // class Controls
