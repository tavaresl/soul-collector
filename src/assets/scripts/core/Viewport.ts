export class Viewport {
  private readonly gameArea: HTMLCanvasElement;

  constructor(gameArea: string | HTMLCanvasElement) {
    if (typeof gameArea === "string") {
      this.gameArea = <HTMLCanvasElement>document.querySelector(gameArea);
    } else {
      this.gameArea = gameArea;
    }

    this.gameArea.style.display = 'block';
    this.resizeGameArea();
  }

  get height() {
    return this.gameArea.height;
  }

  get width() {
    return this.gameArea.width;
  }

  get x() {
    const boundingRectangle = this.gameArea.getBoundingClientRect();
    return boundingRectangle.left;
  }

  get y() {
    const boundingRectangle = this.gameArea.getBoundingClientRect();
    return boundingRectangle.top;
  }

  get drawContext() {
    return this.gameArea.getContext('2d')!;
  }

  get boundingBox() {
    return this.gameArea.getBoundingClientRect();
  }

  private resizeGameArea = (event?: UIEvent) => {
    const gameAreaParentObj = this.gameArea.parentElement;

    if (gameAreaParentObj) {
      const gameAreaParentObjBoudaries = gameAreaParentObj.getBoundingClientRect();

      this.gameArea.width = gameAreaParentObjBoudaries.width;
      this.gameArea.height = gameAreaParentObjBoudaries.height;
    }
  }

  initialize() {
    window.addEventListener('resize', this.resizeGameArea);
  }
}
