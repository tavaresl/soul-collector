import { game } from "../Game.js";

export class Rectangle {
  static draw(
    x: number,
    y: number,
    width: number,
    height: number,
    rotationDegrees: number = 0,
    backgroundColor: string = '#000000',
  ): void {
    const context = game.drawContext;

    context.save();

    context.translate(x + width / 2, y + height / 2);
    context.rotate((Math.PI / 180) * rotationDegrees);
    context.translate(-(x + width / 2), -(y + height / 2));

    context.fillStyle = backgroundColor;
    context.fillRect(
      x,
      y,
      width,
      height,
    );

    // Temporary solution to see which way the rectangle is facing
    context.fillStyle = '#00FF44';
    context.fillRect(
      x + width - 5,
      y,
      5,
      height,
    );


    context.restore();
  }
}
