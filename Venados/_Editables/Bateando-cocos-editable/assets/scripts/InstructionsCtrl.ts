import { _decorator, Component, Node, input, Input, EventTouch, EventMouse, PageView } from 'cc';
import { SceneRouter } from './SceneRouter';
const { ccclass, property } = _decorator;

@ccclass('InstructionsCtrl')
export class InstructionsCtrl extends Component {

  @property(Node) btnLeft!: Node;
  @property(Node) btnRight!: Node;
  @property(Node) btnPlay!: Node;
  @property(SceneRouter) router!: SceneRouter;
  @property(PageView) pageView!: PageView;

  private currentPage = 0;
  private pages = [];


  onEnable() {

    this.pages = this.pageView.getPages();

    this.btnLeft.on(Node.EventType.TOUCH_START, this.prev, this);
    this.btnRight.on(Node.EventType.TOUCH_START, this.next, this);
    this.btnPlay.on(Node.EventType.TOUCH_START, this.play, this);
    this.updatePages();
  }
  
  onDisable() {
    this.btnLeft.off(Node.EventType.TOUCH_START, this.prev, this);
    this.btnRight.off(Node.EventType.TOUCH_START, this.next, this);
    this.btnPlay.off(Node.EventType.TOUCH_START, this.play, this);
  }


  private updatePages() {
    console.log("Current Page: ", this.currentPage);
    this.pageView.setCurrentPageIndex(this.currentPage)
    
  }

  private prev() { 
    this.currentPage = (this.currentPage - 1 + this.pages.length) % this.pages.length; 
    this.updatePages(); 
  }

  private next() { 
    this.currentPage = (this.currentPage + 1) % this.pages.length; 
    this.updatePages(); 
  }
  private play() { this.router.go('20-game'); }
}