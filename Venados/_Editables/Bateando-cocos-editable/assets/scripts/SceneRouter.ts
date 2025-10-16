import { _decorator, Component, director, tween, Node, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SceneRouter')
export class SceneRouter extends Component {
  @property(Node) fader?: Node; // opcional: un Node con UIOpacity para fade

  async go(name: string) {
    if (this.fader) {
      const ui = this.fader.getComponent(UIOpacity);
      if (ui) {
        ui.opacity = 0;
        await new Promise<void>(r => tween(ui).to(0.15, { opacity: 255 }).call(()=>r()).start());
      }
    }
    await director.loadScene(name);
  }
}