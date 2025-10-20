import { _decorator, Component, Node } from 'cc';
import { Manager } from './Manager';
const { ccclass, property } = _decorator;

@ccclass('ButtonMessage')
export class ButtonMessage extends Component 
{
   @property(Manager) public mainScore: Manager=null;

   sendMessageToParent()
   {
        window.parent?.postMessage({
            score: this.mainScore.score
        }, '*');
   }

   sendMessageToRestart()
   {
        window.parent?.postMessage({
            state: 'reset'
        }, '*');
   }
    sendMessageToExit()
    {
        window.parent?.postMessage({
            state: 'exit'
        }, '*');
    }
     sendMessageToStart()
    {
        window.parent?.postMessage({
            state: 'start'
        }, '*');
    }
}


