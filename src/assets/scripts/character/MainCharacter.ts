import { Drawable } from "../core/Drawable";
import { Directions } from "../core/Directions.js";
import { Vector } from "../core/Vector.js";
import { Rectangle } from "../core/solids/Rectangle.js";
import { game } from "../core/Game.js";

export class MainCharacter implements Drawable {
  private position: Vector;
  private velocity: Vector;
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

  isMoving(direction: Directions) {
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

    if (direction === Directions.WEST) {
      return this.velocity.x < 0;
    }
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
  }
}
