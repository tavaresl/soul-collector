import { Drawable } from "../Drawable";

export class Circle implements Drawable {
  constructor(
    private readonly radius: number,
    private readonly x: number,
    private readonly y: number,
  ) { }

  draw(context: CanvasRenderingContext2D): void {
    context.save();
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2,
    );
    context.strokeStyle = '#ffffff';
    context.stroke();
    context.restore();
  }
}