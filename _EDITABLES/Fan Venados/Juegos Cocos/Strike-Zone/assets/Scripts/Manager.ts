import { _decorator, Component, Node, Label, CCBoolean, CCInteger, CCString, macro } from 'cc';
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

    @property(CCBoolean) public anotar: boolean=false;
    @property(CCBoolean) public reset: boolean=false;

    @property(Node) public mensaje:Node=null;

    @property(Label) timerLabel: Label | null = null;
    private remainingTime: number = 60; // 1 minuto = 60 segundos
    private isRunning: boolean = false;

    @property(Label) felicitacion:Label=null;

    start() {

        if(this.gameOver)
        {
            this.gameOver.active = false;
            this.scheduleOnce(function(){
                this.GameOver();
            },61);
            this.startCountdown();
        }
        
    }

    startCountdown() {
        this.isRunning = true;
        this.UpdateTiempo();

        // Ejecuta una función cada 1 segundo
        this.schedule(this.tick, 1, macro.REPEAT_FOREVER, 1);
    }

    tick() {
        if (!this.isRunning) return;

        this.remainingTime--;

        if (this.remainingTime <= 0) {
            this.remainingTime = 0;
            this.isRunning = false;
            this.unschedule(this.tick);
        }

        this.UpdateTiempo();
    }

    UpdateTiempo() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;

        const minStr = (minutes < 10 ? '0' : '') + minutes.toString();
        const secStr = (seconds < 10 ? '0' : '') + seconds.toString();

        if (this.timerLabel) {
            this.timerLabel.string = `${minStr}:${secStr}`;
        }
    }
    update(deltaTime: number) 
    {

        
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


