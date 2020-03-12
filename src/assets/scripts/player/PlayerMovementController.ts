import { Directions } from "../core/Directions.js";
import { Player } from "./Player.js";

// TODO: Refactor by mapping keyCodes to Directions
export class PlayerMovementController {
  private keysPressed = new Set();
  private keys = {
    UP: 87,
    DOWN: 83,
    LEFT: 65,
    RIGHT: 68,
  };

  constructor(
    private readonly player: Player,
  ) { }

  private setMovementDirectionBasedOnKeyPressed = (event: KeyboardEvent) => {
    if (this.keysPressed.has(event.keyCode)) {
      return;
    }

    if (event.keyCode === this.keys.LEFT) { // a
      this.player.startMoving(Directions.WEST);
    } else if (event.keyCode === this.keys.UP) { // w
      this.player.startMoving(Directions.NORTH);
    } else if (event.keyCode === this.keys.RIGHT) { // d
      this.player.startMoving(Directions.EAST);
    } else if (event.keyCode === this.keys.DOWN) { // s
      this.player.startMoving(Directions.SOUTH);
    }

    this.keysPressed.add(event.keyCode);
  };

  private stopMovementDirectionBasedOnKeyReleased = (event: KeyboardEvent) => {
    if (!this.keysPressed.has(event.keyCode)) {
      return;
    }
    
    if (event.keyCode === this.keys.LEFT) { // a
      this.player.stopMoving(Directions.WEST);
    } else if (event.keyCode === this.keys.UP) { // w
      this.player.stopMoving(Directions.NORTH);
    } else if (event.keyCode === this.keys.RIGHT) { // d
      this.player.stopMoving(Directions.EAST);
    } else if (event.keyCode === this.keys.DOWN) { // s
      this.player.stopMoving(Directions.SOUTH);
    }

    this.keysPressed.delete(event.keyCode);
  };

  public initialize() {
    window.addEventListener("keydown", this.setMovementDirectionBasedOnKeyPressed);
    window.addEventListener("keyup", this.stopMovementDirectionBasedOnKeyReleased);
  }

  public destroy() {
    window.removeEventListener("keydown", this.setMovementDirectionBasedOnKeyPressed);
    window.removeEventListener("keyup", this.stopMovementDirectionBasedOnKeyReleased);
  }
}
