import { Drawable } from "./Drawable";

class Game {
  private readonly gameArea: HTMLCanvasElement;
  private readonly scenes: Drawable[];
  public readonly drawContext: CanvasRenderingContext2D;
  private activeScene: Drawable;

  constructor() {
    this.gameArea = <HTMLCanvasElement>document.getElementById('game-area');
    this.drawContext = this.gameArea.getContext('2d')!;
    this.scenes = [];
    this.activeScene = { draw(context) {} };
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

  setActiveScene(scene: Drawable) {
    this.activeScene = scene;
  }

  start(): void {
    const animationFrameCallback = (timestamp: number) => {
      this.activeScene.draw(this.drawContext);

      return window.requestAnimationFrame(animationFrameCallback);
    };

    window.requestAnimationFrame(animationFrameCallback);
  }
}

export const game = new Game();