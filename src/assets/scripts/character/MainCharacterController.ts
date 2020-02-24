import { Directions } from "../core/Directions.js";
import { MainCharacter } from "./MainCharacter.js";

export class MainCharacterController {
  private isMovingLeft: boolean = false;
  private isMovingUp: boolean = false;
  private isMovingRight: boolean = false;
  private isMovingDown: boolean = false;

  constructor(
    private readonly player: MainCharacter,
  ) { }

  private setMovementDirectionBasedOnKeyPressed = (event: KeyboardEvent) => {
    if (event.keyCode === 65) { // a
      this.player.startMoving(Directions.WEST);
    } else if (event.keyCode === 87) { // w
      this.player.startMoving(Directions.NORTH);
    } else if (event.keyCode === 68) { // d
      this.player.startMoving(Directions.EAST);
    } else if (event.keyCode === 83) { // s
      this.player.startMoving(Directions.SOUTH);
    }
  };

  private stopMovementDirectionBasedOnKeyReleased = (event: KeyboardEvent) => {
    if (event.keyCode === 65 && !this.player.isMoving(Directions.EAST)) {
      this.player.stopMoving(Directions.WEST);
    } else if (event.keyCode === 87 && !this.player.isMoving(Directions.SOUTH)) {
      this.player.stopMoving(Directions.NORTH);
    } else if (event.keyCode === 68 && !this.player.isMoving(Directions.WEST)) {
      this.player.stopMoving(Directions.EAST);
    } else if (event.keyCode === 83 && !this.player.isMoving(Directions.NORTH)) {
      this.player.stopMoving(Directions.SOUTH);
    }
  };

  public initialize() {
    window.addEventListener("keydown", this.setMovementDirectionBasedOnKeyPressed);
    window.addEventListener("keyup", this.stopMovementDirectionBasedOnKeyReleased);
  }

  public destroy() {
    window.removeEventListener("keydown", this.setMovementDirectionBasedOnKeyPressed);
    window.removeEventListener("keydown", this.stopMovementDirectionBasedOnKeyReleased);
  }
}
