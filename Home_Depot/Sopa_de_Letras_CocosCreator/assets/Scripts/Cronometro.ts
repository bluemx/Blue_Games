import { _decorator, Button, Component, Label, labelAssembler, Node, Sprite, SpriteFrame } from 'cc';
import { ManagerSopa } from './ManagerSopa';
import { ButtonMessage } from './ButtonMessage';
const { ccclass, property } = _decorator;


@ccclass('Cronometro')
export class Cronometro extends Component {
    @property([Label])
    public Tiempo : Label = null;
    @property(Node)
    public cronometro : Node = null;
    @property([SpriteFrame])
    public imagenescronometro : SpriteFrame[] = [];
    public index : number = 0;
    @property(Node)
    public Gameover : Node = null;
    @property(Label)    
    public scoreLabel : Label = null;
    @property(Label)
    public contadorPalabras : Label = null;
    @property(ButtonMessage)
    private Mesage : ButtonMessage = null;
    public gameOver : boolean = false;
    public gana : Boolean = false;
    @property(ManagerSopa)
    public MS : ManagerSopa = null;


    protected onLoad(): void {
        this.cronometro = this.node;
        this.Mesage = this.node.getComponent(ButtonMessage);
        this.cronometro.getComponent(Sprite).spriteFrame = this.imagenescronometro[6];
        this.index=60;
        this.Gameover.active =false;
        this.gameOver = false;
        this.gana = false;
        this.schedule(this.reloj,1);
    }
    start() {

        
    }
    public reinicia(){
        
       
        
        this.index=60;
        this.gana=false;
        this.gameOver = false;
        this.schedule(this.reloj,1);
        
    }
    public reloj(){
        if(this.gana){
            this.unschedule(this.reloj);
            this.MS.reiniciaSopa();
            this.gana=false;
        }
        if(this.index == 1){
            this.MS.verificaTodasPalabras();
        }
        else if(this.index == 0 && this.gameOver){
            
            //this.Tiempo.string= "0:00";
            this.Gameover.active = true;
            this.Mesage.historial.push(this.MS.arregloPalabras);
            this.Mesage.sendMessageToGameOver();
            
            this.scoreLabel.string = this.MS.score.toString();
            this.contadorPalabras.string = this.MS.indexPalabras.toString();
            this.unschedule(this.reloj);
        }
        switch(this.index){
            case 59:
                this.cronometro.getComponent(Sprite).spriteFrame = this.imagenescronometro[5];
                break;
            case 49:
                this.cronometro.getComponent(Sprite).spriteFrame = this.imagenescronometro[4];

            break;
            case 39:
                this.cronometro.getComponent(Sprite).spriteFrame = this.imagenescronometro[3];

            break;
            case 29:
                this.cronometro.getComponent(Sprite).spriteFrame = this.imagenescronometro[2];

            break;
            case 19:
                this.cronometro.getComponent(Sprite).spriteFrame = this.imagenescronometro[1];

            break;
            case 1:
                this.cronometro.getComponent(Sprite).spriteFrame = this.imagenescronometro[0];

            break;
        }
       /*     
        //this.Tiempo.string= "0:"+ this.index.toString();
        
        if(this.index < 10){
           // this.Tiempo.string= "0:0"+ this.index.toString();
        }
        
        
       else if(this.index < 0 && !this.gameOver){
                this.unschedule(this.reloj);
                this.index = 59;
                //this.Tiempo.string= "1:00";
        }
                */
        this.index--;
       
               
        
    }
    private cancelacronometro(){
        this.unschedule(this.reloj());
    }
    update(deltaTime: number) {
        
    }
}


