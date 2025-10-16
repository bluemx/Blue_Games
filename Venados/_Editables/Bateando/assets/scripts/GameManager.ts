import { _decorator, Component, Node, Contact2DType, Collider2D, IPhysics2DContact, director, sys, Label } from 'cc';
import { BallController } from './BallCtrl';
const { ccclass, property } = _decorator;

enum Tag {
  BALL = 1,
  CATCHER = 2,
  BAT = 3,
  BOUNDS = 4,
}

@ccclass('GameManager')
export class GameManager extends Component {
  @property(BallController) ball!: BallController;

  @property(Node) catcherZone!: Node;     // CircleCollider2D (Sensor)  Tag: CATCHER
  @property(Node) batSwing!: Node;        // BoxCollider2D (Sensor)    Tag: BAT
  @property([Node]) boundsSensors: Node[] = []; // Top/Left/Right (Sensor) Tag: BOUNDS
  
  // UI Elements (optional)
  @property(Label) scoreLabel: Label = null!;
  @property(Label) hitsLabel: Label = null!

  private score = 0;
  private batterHits = 0;
  private maxHits = 3;

  start() {
    // Asegura tags en tus colliders desde el Editor:
    // Ball CircleCollider2D -> tag = Tag.BALL
    // Catcher -> tag = Tag.CATCHER
    // Bat -> tag = Tag.BAT
    // Bounds -> tag = Tag.BOUNDS

    // Safety checks for required components
    if (!this.ball) {
      //console.error('BallController not assigned to GameManager');
      return;
    }
    
    if (!this.catcherZone) {
      //console.error('CatcherZone not assigned to GameManager');
      return;
    }
    
    if (!this.batSwing) {
      //console.error('BatSwing not assigned to GameManager');
      return;
    }

    const all: Node[] = [this.catcherZone, this.batSwing, ...this.boundsSensors];
    all.forEach((n, index) => {
      if (!n) {
        //console.error(`Node at index ${index} is null in GameManager`);
        return;
      }
      
      const col = n.getComponent(Collider2D);
      if (col) {
        col.on(Contact2DType.BEGIN_CONTACT, this.onBegin, this);
      } else {
        console.warn(`Collider2D component not found on node: ${n.name}`);
      }
    });
    
    // Initialize UI
    this.updateUI();
  }

  private updateUI(): void {
    if (this.scoreLabel) {
      this.scoreLabel.string = `Score: ${this.score}`;
    }
    if (this.hitsLabel) {
      this.hitsLabel.string = `Hits: ${this.batterHits}/${this.maxHits}`;
    }
  }

  private onBegin(self: Collider2D, other: Collider2D, _contact: IPhysics2DContact|null) {
    // Safety checks
    if (!self || !other || !this.ball) {
      console.error('Invalid colliders or missing ball reference');
      return;
    }

    const a = self.tag, b = other.tag;
    const isBallVs = (tag: number) => (a === Tag.BALL && b === tag) || (b === Tag.BALL && a === tag);

    if (isBallVs(Tag.CATCHER)) {
      // punto a favor del pitcher
      this.score += 1;
      //console.log(`Score increased: ${this.score}`);
      this.updateUI();
      this.ball.resetBall();
      return;
    }

    if (isBallVs(Tag.BAT)) {
      // el bateador conectó
      this.batterHits += 1;
      //console.log(`Batter hits: ${this.batterHits}`);
      this.updateUI();
      this.ball.resetBall();
      
      if (this.batterHits >= this.maxHits) {
        // fin del juego
        try {
          // persistimos score en localStorage para leerlo en GameOver
          sys.localStorage.setItem('lastScore', String(this.score));
          director.loadScene('GameOver');
        } catch (error) {
          console.error('Error loading GameOver scene:', error);
        }
      }
      return;
    }

    if (isBallVs(Tag.BOUNDS)) {
      // balón se fue por bordes/superior → resetea
      //console.log('Ball hit bounds, resetting...');
      this.ball.resetBall();
      return;
    }
  }

  // Cleanup method
  protected onDestroy() {
    const all: Node[] = [this.catcherZone, this.batSwing, ...this.boundsSensors];
    all.forEach(n => {
      if (n) {
        const col = n.getComponent(Collider2D);
        if (col) {
          col.off(Contact2DType.BEGIN_CONTACT, this.onBegin, this);
        }
      }
    });
  }

  // Public getters for HUD or other systems
  public getScore(): number { 
    return this.score; 
  }
  
  public getHits(): number { 
    return this.batterHits; 
  }
  
  public getMaxHits(): number {
    return this.maxHits;
  }
  
  public getRemainingHits(): number {
    return Math.max(0, this.maxHits - this.batterHits);
  }
  
  // Reset game state (useful for restarting)
  public resetGame(): void {
    this.score = 0;
    this.batterHits = 0;
    this.updateUI();
    if (this.ball) {
      this.ball.resetBall();
    }
  }
}