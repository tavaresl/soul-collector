class Game {
    constructor() {
        this.gameArea = document.getElementById('game-area');
        this.drawContext = this.gameArea.getContext('2d');
        this.scenes = [];
        this.activeScene = { draw(context) { } };
    }
    get VIEWPORT_HEIGHT() {
        return this.gameArea.height;
    }
    get VIEWPORT_WIDTH() {
        return this.gameArea.width;
    }
    get VIEWPORT_X() {
        const boundingRectangle = this.gameArea.getBoundingClientRect();
        return boundingRectangle.left;
    }
    get VIEWPORT_Y() {
        const boundingRectangle = this.gameArea.getBoundingClientRect();
        return boundingRectangle.top;
    }
    setActiveScene(scene) {
        this.activeScene = scene;
    }
    start() {
        const animationFrameCallback = (timestamp) => {
            this.activeScene.draw(this.drawContext);
            return window.requestAnimationFrame(animationFrameCallback);
        };
        window.requestAnimationFrame(animationFrameCallback);
    }
}
export const game = new Game();
//# sourceMappingURL=Game.js.map