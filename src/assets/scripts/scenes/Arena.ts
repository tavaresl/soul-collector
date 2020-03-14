import { game } from "../core/Game.js";
import { GameObject } from "../core/GameObject.js";
import { Player } from "../player/Player.js";
import { PlayerMovementController } from "../player/PlayerMovementController.js";
import { PlayerAttackController } from "../player/PlayerAttackController.js";

export class Arena extends GameObject  {
  initialize() {
    const player = new Player();
    const playerMovementController = new PlayerMovementController();
    const playerAttackController = new PlayerAttackController();

    player.addComponent('PlayerMovementController', playerMovementController);
    player.addComponent('PlayerAttackController', playerAttackController);

    this.addComponent('Player', player);

    super.initialize();
  }

  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = '#000000';
    context.fillRect(0, 0, game.VIEWPORT_WIDTH, game.VIEWPORT_HEIGHT);

    super.draw(context);
  }
}