export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
}
//# sourceMappingURL=Vector.js.map