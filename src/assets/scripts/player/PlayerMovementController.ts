import { Directions } from "../core/Directions.js";
import { game } from "../core/Game.js";
import { GameObject } from "../core/GameObject.js";
import { MovementDirectionEvent } from "./events/MovementDirectionEvent.js";
import { PositionEvent } from "./events/PositionEvent.js";

export class PlayerMovementController extends GameObject {
  private keysPressed = new Set();
  private keys = {
    UP: 87,
    DOWN: 83,
    LEFT: 65,
    RIGHT: 68,
  };

  private setMovementDirectionBasedOnKeyPressed = (event: KeyboardEvent) => {
    if (this.keysPressed.has(event.keyCode)) {
      return;
    }


    switch (event.keyCode) {
      case this.keys.LEFT:
        this.dispatchEvent(new MovementDirectionEvent('player-move', Directions.WEST));
        break;

      case this.keys.UP:
        this.dispatchEvent(new MovementDirectionEvent('player-move', Directions.NORTH));
        break;

      case this.keys.RIGHT:
        this.dispatchEvent(new MovementDirectionEvent('player-move', Directions.EAST));
        break;

      case this.keys.DOWN:
        this.dispatchEvent(new MovementDirectionEvent('player-move', Directions.SOUTH));
        break;
    }

    this.keysPressed.add(event.keyCode);
  };

  private stopMovementDirectionBasedOnKeyReleased = (event: KeyboardEvent) => {
    if (!this.keysPressed.has(event.keyCode)) {
      return;
    }

    switch (event.keyCode) {
      case this.keys.LEFT:
        this.dispatchEvent(new MovementDirectionEvent('player-stop', Directions.WEST));
        break;

      case this.keys.UP:
        this.dispatchEvent(new MovementDirectionEvent('player-stop', Directions.NORTH));
        break;

      case this.keys.RIGHT:
        this.dispatchEvent(new MovementDirectionEvent('player-stop', Directions.EAST));
        break;

      case this.keys.DOWN:
        this.dispatchEvent(new MovementDirectionEvent('player-stop', Directions.SOUTH));
        break;
    }
    

    this.keysPressed.delete(event.keyCode);
  };

  private rotateBasedOnMousePosition = (event: MouseEvent) => {
    const canvasBoundingBox = game.viewport.boundingBox;
    const mousePosition = {
      x: event.clientX - canvasBoundingBox.x,
      y: event.clientY - canvasBoundingBox.y,
    };


    this.dispatchEvent(new PositionEvent('player-facing-direction', mousePosition.x, mousePosition.y));

  }

  public initialize() {
    window.addEventListener("keydown", this.setMovementDirectionBasedOnKeyPressed);
    window.addEventListener("keyup", this.stopMovementDirectionBasedOnKeyReleased);
    window.addEventListener('mousemove', this.rotateBasedOnMousePosition);

    super.initialize();
  }

  public destroy() {
    window.removeEventListener("keydown", this.setMovementDirectionBasedOnKeyPressed);
    window.removeEventListener("keyup", this.stopMovementDirectionBasedOnKeyReleased);
    window.removeEventListener('mousemove', this.rotateBasedOnMousePosition);

    super.destroy();
  }
}
