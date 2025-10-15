import { _decorator, Component, Button } from 'cc';
import { ManagerSopa } from './ManagerSopa';
const { ccclass, property } = _decorator;

@ccclass('ButtonMessage')
export class ButtonMessage extends Component {
    @property(ManagerSopa)
    private MS : ManagerSopa = null;
    @property({type:[[String]]})
    public historial :String[][]= [];


// Llamar a este método antes de enviar el mensaje
public sendMessageGameClose(){
    window.parent?.postMessage(
    'closegame','*');
}

public sendMessageToBt_Next(){
    window.parent?.postMessage(JSON.stringify({
        state: 'btn_next'
    }), '*');
}
public sendMessageToBt_Back(){
    window.parent?.postMessage(JSON.stringify({
        state: 'btn_back'
    }), '*');
}
public sendMessageToStart(){
    window.parent?.postMessage(JSON.stringify({
        state: 'bt_start'
    }), '*');
}

public sendMessageToGameOver(){
    window.parent?.postMessage(JSON.stringify({
        state: 'gameover',
        score: this.MS.score,
        points: this.historial
    }), '*');
}
}