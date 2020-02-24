export class Game {
    constructor() {
        this.gameArea = document.getElementById('game-area');
        this.drawContext = this.gameArea.getContext('2d');
    }
    start() {
        const callback = () => this.draw(() => window.requestAnimationFrame(callback));
        window.requestAnimationFrame(callback);
    }
}
//# sourceMappingURL=Game.js.map