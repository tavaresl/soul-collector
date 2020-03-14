export class PositionEvent extends CustomEvent<{ x: number, y: number }> {
  constructor(name: string, x: number, y: number) {
    super(name, { detail: { x, y } });
  }
}
