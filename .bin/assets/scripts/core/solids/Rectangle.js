import { game } from "../Game.js";
export class Rectangle {
    static draw(x, y, width, height, rotationDegrees = 0, backgroundColor = '#000000') {
        const context = game.drawContext;
        context.save();
        context.translate(x + width / 2, y + height / 2);
        context.rotate((Math.PI / 180) * rotationDegrees);
        context.translate(-(x + width / 2), -(y + height / 2));
        context.fillStyle = backgroundColor;
        context.fillRect(x, y, width, height);
        context.fillStyle = '#00FF44';
        context.fillRect(x + width - 5, y, 5, height);
        context.restore();
    }
}
//# sourceMappingURL=Rectangle.js.map