import { _decorator, Component, Node, input, Input, EventTouch, EventMouse } from 'cc';
import { SceneRouter } from './SceneRouter';
const { ccclass, property } = _decorator;

@ccclass('SplashCtrl')
export class SplashCtrl extends Component {
  @property(SceneRouter) router!: SceneRouter;
  @property(Node) btnInicio!: Node;
  @property(Node) btnSalir!: Node;


  start() { 
    this.btnInicio.on(Input.EventType.TOUCH_START, this.next, this);
    this.btnSalir.on(Input.EventType.TOUCH_START, this.onSalirClick, this);
  }

  onEnable() {
  }
  onDisable() {

  }
  private next() {
    // Send postMessage to parent
    if (window.parent) {
        window.parent.postMessage({ state: "start" }, '*');
    }
    this.router.go('10-instructions');
  }
  private onSalirClick(): void {
        //console.log('🚪 Salir button clicked - exiting game');
        
        // Send postMessage to parent
        if (window.parent) {
            window.parent.postMessage({ state: "exit" }, '*');
            //console.log('📨 PostMessage sent to parent: {state:"exit"}');
        }
    }
}