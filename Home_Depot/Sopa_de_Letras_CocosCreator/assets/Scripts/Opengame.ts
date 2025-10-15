import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Opengame')
export class Opengame extends Component {
    protected onLoad(): void {
        
    }
    start() {
        this.sendMessageToOpenGame();
    }

    update(deltaTime: number) {
        
    }
    public sendMessageToOpenGame(){
        window.parent?.postMessage(JSON.stringify({
            state: 'gameopen'
        }), '*');
    }
}


