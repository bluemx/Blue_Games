import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Gamestart')
export class Gamestart extends Component {
    protected onLoad(): void {
        this.sendMessageToGameStart();
    }
    start() {

    }

    update(deltaTime: number) {
        
    }
    public sendMessageToGameStart(){
        window.parent?.postMessage(JSON.stringify({
            state: 'gamestart'
        }), '*');
    }
}


