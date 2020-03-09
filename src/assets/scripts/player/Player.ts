import { Drawable } from "../core/Drawable";
import { Directions } from "../core/Directions.js";
import { Vector } from "../core/Vector.js";
import { Rectangle } from "../core/geometry/Rectangle.js";
import { game } from "../core/Game.js";
import { Circle } from "../core/geometry/Circle.js";

export class Player implements Drawable {
  private position: Vector;
  private velocity: Vector;
  private state: PlayerState = PlayerState.IDLE;
  private lookDirection: Directions;
  private lookDirectionAngles: Record<Directions, number> = {
    [Directions.EAST]: 0,
    [Directions.SOUTHEAST]: 45,
    [Directions.SOUTH]: 90,
    [Directions.SOUTHWEST]: 135,
    [Directions.WEST]: 180,
    [Directions.NORTHWEST]: 225,
    [Directions.NORTH]: 270,
    [Directions.NORTHEAST]: 315,
  };

  constructor() {
    this.position = new Vector(game.VIEWPORT_WIDTH / 2, game.VIEWPORT_HEIGHT / 2);
    this.velocity = new Vector(0, 0);
    this.lookDirection = Directions.SOUTH;
  }

  startMoving(direction: Directions) {
    if (direction === Directions.NORTH) {
      if (!this.isMoving(Directions.NORTH) && !this.isMoving(Directions.SOUTH)) {
        this.velocity.add(new Vector(0, -2));
  
        if (this.isMoving(Directions.EAST)) {
          this.lookDirection = Directions.NORTHEAST;
        } else if (this.isMoving(Directions.WEST)) {
          this.lookDirection = Directions.NORTHWEST;
        } else {
          this.lookDirection = Directions.NORTH;
        }
      }
    } else if (direction === Directions.SOUTH) {
      if (!this.isMoving(Directions.NORTH) && !this.isMoving(Directions.SOUTH)) {
        this.velocity.add(new Vector(0, 2));
  
        if (this.isMoving(Directions.EAST)) {
          this.lookDirection = Directions.SOUTHEAST;
        } else if (this.isMoving(Directions.WEST)) {
          this.lookDirection = Directions.SOUTHWEST;
        } else {
          this.lookDirection = Directions.SOUTH;
        }
      }
    } else if (direction === Directions.WEST) {
      if (!this.isMoving(Directions.WEST) && !this.isMoving(Directions.EAST)) {
        this.velocity.add(new Vector(-2, 0));
  
        if (this.isMoving(Directions.NORTH)) {
          this.lookDirection = Directions.NORTHWEST;
        } else if (this.isMoving(Directions.SOUTH)) {
          this.lookDirection = Directions.SOUTHWEST;
        } else {
          this.lookDirection = Directions.WEST;
        }
      }
    } else if (direction === Directions.EAST) {
      if (!this.isMoving(Directions.EAST) && !this.isMoving(Directions.WEST)) {
        this.velocity.add(new Vector(2, 0));
  
        if (this.isMoving(Directions.NORTH)) {
          this.lookDirection = Directions.NORTHEAST;
        } else if (this.isMoving(Directions.SOUTH)) {
          this.lookDirection = Directions.SOUTHEAST;
        } else {
          this.lookDirection = Directions.EAST;
        }
      }
    }
  }

  stopMoving(direction: Directions) {
    if (direction === Directions.NORTH || direction === Directions.SOUTH) {
      this.velocity.subtract(new Vector(0, this.velocity.y));

      if (this.isMoving(Directions.EAST)) {
        this.lookDirection = Directions.EAST;
      } else if (this.isMoving(Directions.WEST)) {
        this.lookDirection =  Directions.WEST;
      }
    } else {
      this.velocity.subtract(new Vector(this.velocity.x, 0));

      if (this.isMoving(Directions.NORTH)) {
        this.lookDirection = Directions.NORTH;
      } else if (this.isMoving(Directions.SOUTH)) {
        this.lookDirection = Directions.SOUTH;
      }
    }
  }

  isMoving(direction: Directions): boolean {
    const isMovingAtAll = this.velocity.x !== 0 || this.velocity.y !== 0;

    // TODO: Get rid of this tragic pile of trash
    if ([
      Directions.NORTHEAST,
      Directions.NORTHWEST,
      Directions.SOUTHEAST,
      Directions.SOUTHWEST,
    ].includes(direction)) {
      return isMovingAtAll && this.lookDirection === direction;
    }

    if (direction === Directions.NORTH) {
      return this.velocity.y < 0;
    }

    if (direction === Directions.EAST) {
      return this.velocity.x > 0;
    }

    if (direction === Directions.SOUTH) {
      return this.velocity.y > 0;
    }

    return this.velocity.x < 0;
  }

  is(state: PlayerState) {
    return this.state === state;
  }

  attack(): void {
    this.state = PlayerState.ATTACKING;

    console.log('Player attacked');

    window.setTimeout(() => {
      this.state = PlayerState.IDLE;
    }, 1000);
  }

  draw(context: CanvasRenderingContext2D): void {
    Rectangle.draw(
      this.position.add(this.velocity).x,
      this.position.add(this.velocity).y,
      20,
      20,
      this.lookDirectionAngles[this.lookDirection],
      '#8172ac',
    );

    if (this.state === PlayerState.ATTACKING) {
      new Circle(
        10,
        this.position.x + 20,
        this.position.y + 10,
      )
      .draw(context);
    }
  }
}

export enum PlayerState {
  IDLE,
  MOVING,
  ATTACKING,
  MOVING_AND_ATTACKING,
};
