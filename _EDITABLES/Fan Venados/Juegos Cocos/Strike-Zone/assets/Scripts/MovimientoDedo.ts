import { _decorator, Component, Node, Vec3, Graphics, Vec2, CCBoolean, CCInteger, UITransform, Touch, RigidBody, EventTouch } from 'cc';
import { Manager } from './Manager';
import { Score } from './Score';
const { ccclass, property } = _decorator;

@ccclass('MovimientoDedo')
export class MovimientoDedo extends Component 
{
    @property(Node) public pelota:Node=null;
    @property(Vec3) public posUI:Vec3=new Vec3;

    private flecha:Graphics=null;

    private lineWidth:number=5;
    private arrowLength:number=20;
    private arrowAngle:number=12/Math.PI;

    @property(Vec2) public posInicial:Vec2=new Vec2;
    @property(Vec2) public posFinal:Vec2=new Vec2;

    @property(Vec3) public posicionInicial:Vec3=null;
    @property(CCBoolean) public tirando:boolean=false;

    @property(Manager) public manager:Manager=null;

    @property(CCInteger) public tiros:number=0;
    

    onLoad()
    {
        this.flecha=this.node.getComponent(Graphics);
        this.node.on(Node.EventType.TOUCH_START, this.OnStart,this);
        this.node.on(Node.EventType.TOUCH_MOVE,this.OnMove,this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.OffMove,this);
        this.node.on(Node.EventType.TOUCH_END, this.OffMove,this);
        this.pelota.getComponent(RigidBody).setAngularVelocity(new Vec3(1,0,5));
    }

    OnStart(event: Touch)
    {
        this.posUI=new Vec3(0,0,0);
        this.posInicial=new Vec2(0,50);
        
    }

    OnMove(event:Touch)
    {
        const screenPos=event.getUILocation();
        this.posUI=new Vec3(screenPos.x, screenPos.y,0);

        this.posFinal=event.getUILocation();
        this.posFinal.x-=300;
        this.DibujaFlecha(this.posInicial, new Vec2(this.posFinal.x, this.posFinal.y));
    }

    OffMove(event:Touch)
    {
        if(!this.tirando)
        {
            this.tirando=true;
            this.posFinal=event.getUILocation();
            this.posFinal.x-=300;
            this.DibujaFlecha(this.posInicial, new Vec2(this.posFinal.x, this.posFinal.y));
            this.pelota.getComponent(RigidBody).useGravity=true;
            this.pelota.getComponent(RigidBody).setLinearVelocity(new Vec3((this.posFinal.x)/-35, this.posFinal.y/50,this.posFinal.y/15));
            this.pelota.getComponent(RigidBody).setAngularVelocity(new Vec3(20,0,0));

            this.flecha.clear();

            this.scheduleOnce(function(){
                if(this.tiros>=this.manager.golpes)
                {
                    //this.manager.GameOver();
                }
                else
                {
                    this.Reset();
                }
            },5);
        }
        else
        {
            this.flecha.clear();
        }
        this.manager.reset=false;
    }

    DibujaFlecha(inicio: Vec2, final:Vec2)
    {
        this.flecha.clear( );

        this.flecha.moveTo(inicio.x, inicio.y)
        this.flecha.lineTo(final.x,final.y)
        //calcular la direccion de la linea 
        let angle = Math.atan2(final.y - inicio.y , final.x -inicio.x)

        //dibuja primera linea de flecha 
        this.flecha.moveTo(final.x, final.y )
        this.flecha.lineTo (
            final.x + this.arrowLength * Math.cos(angle - this.arrowAngle),
            final.y + this.arrowLength * Math.sin(angle - this.arrowAngle)
        )
       
        this.flecha.moveTo(final.x, final.y )
        this.flecha.lineTo (
            final.x +  this.arrowLength * Math.cos(angle + this.arrowAngle),
            final.y + this.arrowLength * Math.sin(angle + this.arrowAngle)
        )
       
       
        this.flecha.stroke();
    }   

    Reset()
    {
        this.manager.reset=true;

        

        this.pelota.getComponent(RigidBody).useGravity=false;
        this.pelota.getComponent(Score).tirosErrados+=1;
        //this.pelota.getComponent(Score).Strikes(this.pelota.getComponent(Score).tirosErrados,true);
        this.pelota.getComponent(RigidBody).clearVelocity();

        this.pelota.getComponent(RigidBody).setAngularVelocity(new Vec3(1,0,5));
        this.tirando=false;
        this.pelota.setPosition(this.posicionInicial);
        //this.pelota.getComponent(Score).StrikeOut();
    }

    
   
}


