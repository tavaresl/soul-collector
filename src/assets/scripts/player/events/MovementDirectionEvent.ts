import { Directions } from "../../core/Directions.js";

export class MovementDirectionEvent extends CustomEvent<Directions> {
  constructor(name: string, direction: Directions) {
    super(name, { detail: direction });
  }
}
