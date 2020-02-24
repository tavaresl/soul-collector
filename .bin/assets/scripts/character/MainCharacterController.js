import { Directions } from "../core/Directions.js";
export class MainCharacterController {
    constructor(player) {
        this.player = player;
        this.setMovementDirectionBasedOnKeyPressed = (event) => {
            if (event.keyCode === 65) {
                this.player.startMoving(Directions.WEST);
            }
            else if (event.keyCode === 87) {
                this.player.startMoving(Directions.NORTH);
            }
            else if (event.keyCode === 68) {
                this.player.startMoving(Directions.EAST);
            }
            else if (event.keyCode === 83) {
                this.player.startMoving(Directions.SOUTH);
            }
        };
        this.stopMovementDirectionBasedOnKeyReleased = (event) => {
            if (event.keyCode === 65) {
                this.player.stopMoving(Directions.WEST);
            }
            else if (event.keyCode === 87) {
                this.player.stopMoving(Directions.NORTH);
            }
            else if (event.keyCode === 68) {
                this.player.stopMoving(Directions.EAST);
            }
            else if (event.keyCode === 83) {
                this.player.stopMoving(Directions.SOUTH);
            }
        };
    }
    initialize() {
        window.addEventListener("keydown", this.setMovementDirectionBasedOnKeyPressed);
        window.addEventListener("keyup", this.stopMovementDirectionBasedOnKeyReleased);
    }
    destroy() {
        window.removeEventListener("keydown", this.setMovementDirectionBasedOnKeyPressed);
        window.removeEventListener("keydown", this.stopMovementDirectionBasedOnKeyReleased);
    }
}
//# sourceMappingURL=MainCharacterController.js.map