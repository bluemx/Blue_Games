import { _decorator, Component, Contact2DType, Collider2D, IPhysics2DContact, director, Prefab, instantiate, Vec3, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BallController')
export class BallController extends Component {
  @property(Prefab) miniLabelPrefab!: Prefab;
  
  private cameraOriginalPosition: Vec3 | null = null;

  start() {
    // Store the original camera position once at start
    this.initializeCameraPosition();
    
    
    // Get the collider and listen for ANY collision
    const collider = this.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onCollision, this);

    } else {
      console.error('❌ No Collider2D component found on ball!');
    }

    // Auto-destroy ball after 5 seconds
    setTimeout(() => {
      if (this.node) {
        console.log('⏰ Ball auto-destroyed after 5 seconds');
        this.node.destroy();
      }
    }, 5000);
  }

  private initializeCameraPosition(): void {
    // Find and store the camera's original position once
    const canvas = this.node.scene.getChildByName('Canvas');
    if (canvas) {
      const camera = canvas.getChildByName('Camera') || canvas.getChildByName('Main Camera');
      if (camera) {
        this.cameraOriginalPosition = camera.position.clone();

      } else {
        console.warn('⚠️ Camera not found for shake initialization');
      }
    }
  }

  private shakeCanvas(): void {
    // Use stored original position for shake
    if (!this.cameraOriginalPosition) {
      console.warn('⚠️ Camera original position not initialized');
      return;
    }

    // Find the camera inside the canvas to shake
    const canvas = this.node.scene.getChildByName('Canvas');
    if (canvas) {
      // Look for Camera node inside canvas
      const camera = canvas.getChildByName('Camera') || canvas.getChildByName('Main Camera');
      if (camera) {
        const originalPosition = this.cameraOriginalPosition;
        const shakeIntensity = 15;
        
        tween(camera)
          .to(0.05, { position: new Vec3(originalPosition.x + shakeIntensity, originalPosition.y, originalPosition.z) })
          .to(0.05, { position: new Vec3(originalPosition.x - shakeIntensity, originalPosition.y, originalPosition.z) })
          .to(0.05, { position: new Vec3(originalPosition.x, originalPosition.y + shakeIntensity, originalPosition.z) })
          .to(0.05, { position: new Vec3(originalPosition.x, originalPosition.y - shakeIntensity, originalPosition.z) })
          .to(0.05, { position: new Vec3(originalPosition.x + shakeIntensity/2, originalPosition.y, originalPosition.z) })
          .to(0.05, { position: new Vec3(originalPosition.x - shakeIntensity/2, originalPosition.y, originalPosition.z) })
          .to(0.05, { position: new Vec3(originalPosition.x, originalPosition.y + shakeIntensity/2, originalPosition.z) })
          .to(0.05, { position: new Vec3(originalPosition.x, originalPosition.y - shakeIntensity/2, originalPosition.z) })
          .to(0.1, { position: originalPosition }) // Return to original position
          .start();
        

      } else {
        console.warn('⚠️ Camera not found inside Canvas');
      }
    }
  }

  private onCollision(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null) {
      
    if (other && other.node && contact) {
        // Check if this is a golden ball
        const isGoldenBall = this.node.name === 'GoldenBall';

        if(other.node.name == 'Bottom-floor'){
            // Shake the canvas when floor is touched
            this.shakeCanvas();
            
            if (isGoldenBall) {

                director.emit('subtract-score', 200);
                this.instantiateMiniLabel(contact, 'golden-floor');
            } else {

                director.emit('subtract-score', 50);
                this.instantiateMiniLabel(contact, '-');
            }
            this.scheduleDestroy();

        } else if(other.node.name == 'Boundaries'){
            if (isGoldenBall) {

                director.emit('add-score', 100);
                this.instantiateMiniLabel(contact, 'golden-homerun');
            } else {

                director.emit('add-score', 4);
                this.instantiateMiniLabel(contact, '+');
            }
            this.scheduleDestroy();
        }
            
    }
    
  }

  private instantiateMiniLabel(contact: IPhysics2DContact, type: string): void {
    if (!this.miniLabelPrefab) {
      console.warn('⚠️ MiniLabel prefab not assigned to BallController');
      return;
    }
    const miniLabel = instantiate(this.miniLabelPrefab);
    
    // Get the MiniLabelCtrl component and set text/color
    const miniLabelCtrl = miniLabel.getComponent('MiniLabelCtrl');
    if (miniLabelCtrl) {
        if(type === '+') {
            miniLabelCtrl.setText('+4');
            miniLabelCtrl.setColor('green');
        } else if(type === '-') {
            miniLabelCtrl.setText('-50');
            miniLabelCtrl.setColor('red');
        } else if(type === 'golden-homerun') {
            miniLabelCtrl.setText('+100');
            miniLabelCtrl.setColor('gold');
        } else if(type === 'golden-floor') {
            miniLabelCtrl.setText('-200');
            miniLabelCtrl.setColor('darkred');
        }
    }
    
    const canvas = this.node.scene.getChildByName('Canvas') || this.node.parent;
    if (canvas) {
      canvas.addChild(miniLabel);
      miniLabel.setPosition(new Vec3(0, 120, 0));
    }
  }

  private scheduleDestroy() {
    // Always delay destruction to avoid physics system conflicts
    setTimeout(() => {

        if (this.node) {
            this.node.destroy();
        }
    }, 50);
  }
  onDestroy() {
    //console.log('🏀 Ball destroyed');
  }
}