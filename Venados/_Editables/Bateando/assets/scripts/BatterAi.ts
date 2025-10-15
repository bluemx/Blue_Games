import { _decorator, Component, Node, math, Vec3, UITransform } from 'cc';
import { BallController } from './BallCtrl';
const { ccclass, property } = _decorator;

@ccclass('BatterAI')
export class BatterAI extends Component {
  @property(Node) batSwing!: Node; // BoxCollider2D sensor
  @property(BallController) ball!: BallController;
  @property(Node) strikeZone!: Node; // un Node referencia (rect) donde puede aparecer el bat

  @property({tooltip:'cada cuántos seg. intenta swing (rango min-max)'})
  swingIntervalRange: math.Vec2 = new math.Vec2(0.45, 0.9);

  @property({tooltip:'duración visible del swing en seg.'})
  swingDuration: number = 0.12;

  private timer = 0;
  private nextSwingAt = 0.5;
  private swingTimeoutId: any = null;

  protected start() {
    // Use setTimeout as fallback due to TypeScript config issues
    setTimeout(() => this.planNext(), 100);
    if (this.batSwing) {
      this.batSwing.active = false;
    }
  }

  protected update(dt: number) {
    // Safety check for ball reference
    if (!this.ball || this.ball.isIdle()) return;
    
    this.timer += dt;
    if (this.timer >= this.nextSwingAt) {
      this.doSwingOnce();
      this.planNext();
    }
  }

  private planNext(): void {
    this.timer = 0;
    const r = this.swingIntervalRange;
    this.nextSwingAt = math.randomRange(r.x, r.y);
  }

  private doSwingOnce(): void {
    // Safety checks
    if (!this.strikeZone || !this.batSwing) {
      console.error('Missing required components: strikeZone or batSwing');
      return;
    }

    // posicion aleatoria dentro del rect del strikeZone
    const t = this.strikeZone.getComponent(UITransform);
    if (!t) {
      console.error('UITransform component not found on strikeZone');
      return;
    }
    
    const w = t.width * 0.4;  // más estrecho que el rect total
    const h = t.height * 0.4;
    const rx = math.randomRange(-w/2, w/2);
    const ry = math.randomRange(-h/2, h/2);

    this.batSwing.setPosition(new Vec3(rx, ry, 0));
    this.batSwing.active = true;
    
    // Clear any previous timeout
    if (this.swingTimeoutId) {
      clearTimeout(this.swingTimeoutId);
    }
    
    // Schedule swing to hide after duration
    this.swingTimeoutId = setTimeout(() => this.hideSwing(), this.swingDuration * 1000);
  }

  private hideSwing(): void {
    if (this.batSwing) {
      this.batSwing.active = false;
    }
    this.swingTimeoutId = null;
  }

  protected onDestroy(): void {
    // Clean up any scheduled callbacks
    if (this.swingTimeoutId) {
      clearTimeout(this.swingTimeoutId);
      this.swingTimeoutId = null;
    }
  }
}