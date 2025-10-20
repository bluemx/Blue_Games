import { _decorator, Component, Node, Label, CCBoolean, CCInteger } from 'cc';
import { ButtonMessage } from './ButtonMessage';
const { ccclass, property } = _decorator;

@ccclass('Manager')
export class Manager extends Component 
{
    @property(Label) public scoreText: Label=null;
    @property(CCInteger)public score:number=0;
    
    @property(Node) public gameOver:Node=null;
    @property(Label) public finalScoreText: Label=null;

    @property(CCBoolean) public fin: boolean=false;

    @property(CCInteger) public golpes: number=3;
    @property(Node)
    public mensaje : Node = null;

    @property(Label) felicitacion:Label=null;

    start() {

    }

    update(deltaTime: number) {
        
    }

    Score(score: number)
    {

        this.scoreText.string=score.toString();
    }
    
    GameOver()
    {
        this.fin=true;
        this.gameOver.active=true;
        this.mensaje.getComponent(ButtonMessage).sendMessageToParent();
        if(this.score<=0)
        {
            this.finalScoreText.string="0"+this.score.toString();
            this.felicitacion.string="Vuelve a intentar...";
            this.felicitacion.fontSize=40;
        }
        else
        {
            this.finalScoreText.string=this.score.toString();
            this.felicitacion.string="Felicidades";
            this.felicitacion.fontSize=70;
        }
        
    }
}


