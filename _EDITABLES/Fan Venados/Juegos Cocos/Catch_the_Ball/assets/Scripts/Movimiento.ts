import { _decorator, Component, Node, Input, EventTouch, Vec3, Animation, RigidBody2D, NodeEventType, Contact2DType, Collider2D, Touch, CCBoolean, IPhysics2DContact, SpriteFrame, Sprite, CapsuleCharacterController, Label, Vec2 } from 'cc';
import { Manager } from './Manager';
const { ccclass, property } = _decorator;

@ccclass('Movimiento')
export class Movimiento extends Component {

    @property (Manager) public manager: Manager=null;
    @property public limiteIzq: number=-300;
    @property public limiteDer: number=300;
    public posY:Vec3;

    @property public speed: number=500;
    @property(Vec3) public targetPosition: Vec3= new Vec3();
    @property(Vec3) public moveDirection: Vec3= new Vec3();
    @property(Vec3) public newPosition: Vec3= new Vec3();
    
    @property public flechas:boolean=false;
    @property public touch:boolean=false;
    @property(Vec3) public transf: Vec3=new Vec3();

    private prevMouseX: number=0;
    @property(CCBoolean) public choque: boolean=false;
    private tocando: boolean=false;

    @property(RigidBody2D) public body: RigidBody2D=null;

   

    onLoad()
    {
        this.choque=false;
        this.posY=this.node.getWorldPosition();

        this.node.on(NodeEventType.TOUCH_START,this.Touch,this)
        this.node.on(NodeEventType.TOUCH_MOVE,this.Move,this)
        this.node.on(NodeEventType.TOUCH_END,this.Stop,this)
        this.node.on(NodeEventType.TOUCH_CANCEL,this.Stop,this)

        const collider=this.getComponent(Collider2D);

        if(collider)
        {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onTriggerEnter, this)
        }

    }


    Touch(event:EventTouch)
    {
        this.tocando=true;
    }

    Stop()
    {
        this.tocando=false;
        this.Suelta();
    }

    Move(event:EventTouch)
    {
        if(this.tocando&&!this.choque)
        {
            let loc=event.getUILocation();
            const currentMouseX=event.getLocationX();

            this.prevMouseX=currentMouseX;

            if(loc.x<120)
            {
                loc.x=120;
            }
            if(loc.x>520)
            {
                loc.x=520;
            }
            this.node.setWorldPosition(new Vec3(loc.x, this.posY.y,0));

        }
        
    }
    
    onTriggerEnter(selfCollider : Collider2D, otherCollider: Collider2D, contact : IPhysics2DContact)
    {
        console.log(otherCollider.tag);
        const tag=otherCollider.tag;

        
        otherCollider.enabled=false;
        otherCollider.getComponent(Animation).play("desaparece");
        otherCollider.getComponent(RigidBody2D).linearVelocity=new Vec2(0,0);
        otherCollider.getComponent(RigidBody2D).gravityScale=0;

        

        switch(tag)
        {
            case 1:
                    this.node.getComponent(Animation).play("mala");
                    
                    this.tocando=false;
                    this.choque=true;
                    this.manager.golpes--;
                break;
            case 2:
                //Score
                this.node.getComponent(Animation).play("glow");
                this.manager.score+=10;
                this.manager.Score(this.manager.score);
                break;
        }

        this.scheduleOnce(function(){
            
            
            otherCollider.node.destroy();
        },1);

        if(this.choque)
        {
            if(this.manager.golpes>0)
            {
                this.choque=false;
            }
            else if(this.manager.golpes<=0)
            {
                //this.body.gravityScale=1;
                this.manager.GameOver();
                this.node.getComponent(Collider2D).enabled=false;
            }
        }

    }


    

    Suelta()
    {
        this.transf=this.node.getPosition();
        this.targetPosition=this.transf;
        this.node.getPosition(this.transf);
    }

    

    update(deltaTime: number) {
        
    }
}


