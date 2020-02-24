import { Drawable } from "../core/Drawable";
import { game } from "../core/Game.js";
import { MainCharacter } from "../character/MainCharacter.js";
import { MainCharacterController } from "../character/MainCharacterController.js";

export class Arena implements Drawable {
  private readonly player: MainCharacter;
  private readonly playerController: MainCharacterController;

  constructor() {
    this.player = new MainCharacter();
    this.playerController = new MainCharacterController(this.player);
    this.playerController.initialize();
  }
  
  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = '#000000';

    context.fillRect(0, 0, game.VIEWPORT_WIDTH, game.VIEWPORT_WIDTH);
    this.player.draw(context);
  }
}