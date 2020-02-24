import { game } from "../core/Game.js";
import { MainCharacter } from "../character/MainCharacter.js";
import { MainCharacterController } from "../character/MainCharacterController.js";
export class Arena {
    constructor() {
        this.player = new MainCharacter();
        this.playerController = new MainCharacterController(this.player);
        this.playerController.initialize();
    }
    draw(context) {
        context.fillStyle = '#000000';
        context.fillRect(0, 0, game.VIEWPORT_WIDTH, game.VIEWPORT_WIDTH);
        this.player.draw(context);
    }
}
//# sourceMappingURL=Arena.js.map