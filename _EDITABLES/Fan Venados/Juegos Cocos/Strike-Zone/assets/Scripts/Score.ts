import { _decorator, CCInteger, Component,Collider, instantiate, ICollisionEvent, Node, Prefab, CCFloat, Animation, AnimationClip } from 'cc';
import { Manager } from './Manager';
const { ccclass, property } = _decorator;

@ccclass('Score')
export class Score extends Component 
{
    @property(Manager) manager:Manager=null;
   
    @property(CCInteger) public tirosErrados: number=0;

    //@property(Node) public ball:Node=null;

    @property([Prefab]) public particle: Prefab[]=[];
    @property(Node) public padre:Node;

    @property(CCInteger) private meta = 5;

    @property([Node]) public strikes: Node[]=[];
    
   

    protected onLoad(): void 
    {
        this.tirosErrados=0;
        this.manager.score=0;
        //this.ball=this.node;

        const collider=this.getComponent(Collider);
        if(collider)
        {
            console.log("Collider");
            collider.on('onCollisionEnter',this.onCollisionEnter,this);
        }

        //this.Strikes(3,false);
    }

    StrikeOut()
    {
        if(this.tirosErrados>=this.manager.golpes)
        {
            this.node.active=false;
            this.scheduleOnce(function()
            {
                this.manager.GameOver();
            },2);
        }
    }
    onCollisionEnter(event: ICollisionEvent)
    {
        const otherCollider=event.otherCollider;

        console.log(otherCollider.getGroup()+" "+otherCollider.name);
        //8=10p
        //16=8p
        //32=6p
        //64=4p
        //4==1p
        if(otherCollider.getGroup()==4||otherCollider.getGroup()==8||otherCollider.getGroup()==16
            ||otherCollider.getGroup()==32||otherCollider.getGroup()==64)
        {   
            for(let i=1;i<otherCollider.node.parent.children.length;i++)
            {
                otherCollider.node.parent.children[i].getComponent(Collider).enabled=false;
            }
            switch(otherCollider.getGroup())
            {
                case 4:
                    this.SumaPuntos(1);
                    break;
                case 8:
                    this.SumaPuntos(10);
                    break;
                case 16:
                    this.SumaPuntos(8);
                    break;
                case 32:
                    this.SumaPuntos(6);
                    break;
                case 64:
                    this.SumaPuntos(4);
                    break;
            }
            
            otherCollider.node.parent.getComponent(Animation).play("Fin");
            this.scheduleOnce(function()
            {
                otherCollider.node.parent.active=false;
                
                //otherCollider.node.parent.destroy();
            }, 1);

            this.CrearPerticulas();
        }
        
    }

    
    SumaPuntos(puntos:number)
    {
        this.manager.score+=puntos;
        this.manager.Score(this.manager.score);
        this.tirosErrados=-1;
        //this.Strikes(3,false);
        if(this.manager.score%2==0)
        {
            this.meta = this.manager.score /5;
            this.manager.anotar=true;
        }
    }

    CrearPerticulas()
    {
        const node1=instantiate(this.particle[0]);
        node1.setParent(this.padre);
        const node2=instantiate(this.particle[1]);
        node2.setParent(this.padre);

        this.scheduleOnce(function(){
            node1.destroy();
            node2.destroy();
        },4);
    }

    Strikes(limite:number, activo: boolean)
    {
        if(activo)
        {
            for(let i=0;i<limite;i++)
            {
                this.strikes[i].active=true;
            }
        }
        else
        {
            for(let i=0;i<limite;i++)
            {
                this.strikes[i].active=false;
            }
        }
        
    }
}


