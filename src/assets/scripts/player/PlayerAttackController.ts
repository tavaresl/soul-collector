import { Player } from "./Player.js";

export class PlayerAttackController {
  private keyIsBeingPressed = false;

  constructor(
    private readonly player: Player,
  ) { }

  private attack = (event: KeyboardEvent) => {
    if (event.keyCode !== 32 || this.keyIsBeingPressed) {
      return;
    }

    this.keyIsBeingPressed = true;
    this.player.attack();
  };

  private setKeyAsNotBeingPressed = (event: KeyboardEvent) => {
    if (event.keyCode === 32) {
      this.keyIsBeingPressed = false;
    }
  };

  initialize() {
    window.addEventListener('keydown', this.attack);
    window.addEventListener('keyup', this.setKeyAsNotBeingPressed);
  }
}