import { Viewport } from "./Viewport.js";
import { GameObject } from "./GameObject";

class Game {
  public readonly viewport: Viewport;
  private activeScene?: GameObject;

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

  setActiveScene(scene: GameObject) {
    this.activeScene = scene;
  }

  start(): void {
    if (!this.activeScene) {
      throw new Error('Game cannot start without an active scene.');
    }

    this.activeScene.initialize();

    const animationFrameCallback = (timestamp: number) => {

      this.activeScene?.draw(this.drawContext);
      this.activeScene?.update(timestamp);

      return window.requestAnimationFrame(animationFrameCallback);
    };

    window.requestAnimationFrame(animationFrameCallback);
  }
}

export const game = new Game();
