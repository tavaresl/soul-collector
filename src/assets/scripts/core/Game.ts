import { Drawable } from "./Drawable";
import { Viewport } from "./Viewport.js";

class Game {
  private readonly viewport: Viewport;
  private activeScene?: Drawable;

  constructor() {
    this.viewport = new Viewport('#game-area');
    this.viewport.initialize();
  }

  get VIEWPORT_HEIGHT() {
    return this.viewport.height;
  }

  get VIEWPORT_WIDTH() {
    return this.viewport.width;
  }

  get VIEWPORT_X() {
    return this.viewport.x;
  }

  get VIEWPORT_Y() {
    return this.viewport.y;
  }

  get drawContext() {
    return this.viewport.drawContext;
  }

  setActiveScene(scene: Drawable) {
    this.activeScene = scene;
  }

  start(): void {
    const animationFrameCallback = (timestamp: number) => {
      if (!this.activeScene) {
        throw new Error('Game cannot start without an active scene.');
      }

      this.activeScene.draw(this.drawContext);

      return window.requestAnimationFrame(animationFrameCallback);
    };

    window.requestAnimationFrame(animationFrameCallback);
  }
}

export const game = new Game();