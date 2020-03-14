import { Updatable } from "./Updatable";
import { Drawable } from "./Drawable";

export class GameObject extends EventTarget implements Updatable, Drawable {
  private components: Map<string, GameObject> = new Map();

  addComponent(name: string, component: GameObject): GameObject{
    this.components.set(name, component);

    return this;
  }

  getComponent<T extends GameObject>(componentName: string): T | null {
    // @ts-ignore
    return this.components.get(componentName) || null;
  }

  initialize() {
    this.components.forEach(component => component.initialize());
  }

  destroy() {
    this.components.forEach(component => component.destroy());
  }

  update(timestamp?: number): void {
    this.components.forEach(component => component.update(timestamp));
  }

  draw(context: CanvasRenderingContext2D): void {
    this.components.forEach(component => component.draw(context));
  }
}
