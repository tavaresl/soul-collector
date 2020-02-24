export class Vector {
  constructor(
    public x: number,
    public y: number,
  ) { }

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
}
