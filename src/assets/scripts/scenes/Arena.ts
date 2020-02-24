import { Drawable } from "../core/Drawable";
import { game } from "../core/Game.js";
import { Player } from "../player/Player.js";
import { PlayerMovementController } from "../player/PlayerMovementController.js";

export class Arena implements Drawable {
  private readonly player: Player;
  private readonly playerController: PlayerMovementController;

  constructor() {
    this.player = new Player();
    this.playerController = new PlayerMovementController(this.player);
    this.playerController.initialize();
  }
  
  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = '#000000';

    context.fillRect(0, 0, game.VIEWPORT_WIDTH, game.VIEWPORT_WIDTH);
    this.player.draw(context);
  }
}