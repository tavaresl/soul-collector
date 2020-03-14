import { game } from "../core/Game.js";
import { GameObject } from "../core/GameObject.js";
import { Directions } from "../core/Directions.js";
import { Vector } from "../core/Vector.js";
import { Rectangle } from "../core/geometry/Rectangle.js";
import { PlayerMovementController } from "./PlayerMovementController.js";
import { PositionEvent } from "./events/PositionEvent.js";
import { MovementDirectionEvent } from "./events/MovementDirectionEvent.js";

export class Player extends GameObject {
  private position: Vector;
  private velocity: Vector;
  private speed = 5;
  private rotation = 0;
  private width = 20;
  private height = 20;

  constructor() {
    super();
    this.position = new Vector(game.VIEWPORT_WIDTH / 2, game.VIEWPORT_HEIGHT / 2);
    this.velocity = new Vector(0, 0);
  }

  onDirectionalPressed = (event: MovementDirectionEvent) => {
    switch (event.detail) {
      case Directions.NORTH:
        if (this.velocity.y === 0) {
          this.velocity.normalize().add(new Vector(0, -1));
        }

        break;

      case Directions.SOUTH:
        if (this.velocity.y === 0) {
          this.velocity.normalize().add(new Vector(0, 1));
        }

        break;

      case Directions.WEST:
        if (this.velocity.x === 0) {
          this.velocity.normalize().add(new Vector(-1, 0));
        }

        break;

      case Directions.EAST:
        if (this.velocity.x === 0) {
          this.velocity.normalize().add(new Vector(1, 0));
        }

        break;
    }

    this.velocity.magnitude = this.speed;
  }

  onDirectionalReleased = (event: MovementDirectionEvent) => {
    switch (event.detail) {
      case Directions.NORTH:
      case Directions.SOUTH:
        this.velocity.subtract(new Vector(0, this.velocity.y));
        break;

      case Directions.WEST:
      case Directions.EAST:
        this.velocity.subtract(new Vector(this.velocity.x, 0));
        break;
    }

    this.velocity.magnitude = this.speed;
  }

  onFacingDirectionChange = (event: PositionEvent) => {
    const targetPosition = new Vector(event.detail.x, event.detail.y);
    const angle = Math.atan2(
      targetPosition.y - this.position.y - this.height / 2,
      targetPosition.x - this.position.x - this.width  / 2,
    ) * (180 / Math.PI);

    this.rotation = angle;
  }

  update(deltatime: number) {
    this.position.add(this.velocity);
    super.update(deltatime);
  }

  draw(context: CanvasRenderingContext2D): void {
    Rectangle.draw(
      this.position.x,
      this.position.y,
      this.width,
      this.height,
      this.rotation,
      '#8172ac',
    );

    super.draw(context);
  }
  
  initialize() {
    const controller = this.getComponent<PlayerMovementController>('PlayerMovementController');

    controller?.addEventListener('player-move', this.onDirectionalPressed);
    controller?.addEventListener('player-stop', this.onDirectionalReleased);
    controller?.addEventListener('player-facing-direction', this.onFacingDirectionChange);

    super.initialize();
  }
}

export enum PlayerState {
  IDLE,
  MOVING,
  ATTACKING,
  MOVING_AND_ATTACKING,
};
