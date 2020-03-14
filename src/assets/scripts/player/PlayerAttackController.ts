import { GameObject } from "../core/GameObject.js";

export class PlayerAttackController extends GameObject {
  private keyIsBeingPressed = false;

  private attack = (event: KeyboardEvent) => {
    if (event.keyCode !== 32 || this.keyIsBeingPressed) {
      return;
    }

    this.keyIsBeingPressed = true;
  };

  private setKeyAsNotBeingPressed = (event: KeyboardEvent) => {
    if (event.keyCode === 32) {
      this.keyIsBeingPressed = false;
    }
  };

  initialize() {
    window.addEventListener('keydown', this.attack);
    window.addEventListener('keyup', this.setKeyAsNotBeingPressed);

    super.initialize();
  }
}
