export class Vector {
  constructor(
    public x: number,
    public y: number,
  ) { }

  get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  set magnitude(magnitude: number) {
    this.normalize().scaleBy(magnitude);
  }

  public scaleBy(scale: number): Vector {
    this.x *= scale;
    this.y *= scale;

    return this;
  }

  public normalize(): Vector {
    if (this.magnitude === 0) {
      return this;
    }

    return this.scaleBy(1 / this.magnitude);
  }

  public add(vector: Vector): Vector {
    this.x += vector.x;
    this.y += vector.y;

    return this;
  }

  public subtract(vector: Vector): Vector {
    this.x -= vector.x;
    this.y -= vector.y;

    return this;
  }

  public copy(): Vector {
    return new Vector(this.x, this.y);
  }
}
