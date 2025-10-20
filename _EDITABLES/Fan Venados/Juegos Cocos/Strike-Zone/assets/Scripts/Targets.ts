import { _decorator, AnimationClip,CCFloat,Prefab, Component,instantiate, Animation, Node, randomRange, randomRangeInt, CCInteger, Vec3, CCBoolean, Collider } from 'cc';
import { Manager } from './Manager';
const { ccclass, property } = _decorator;

@ccclass('Targets')
export class Targets extends Component 
{
    @property(Manager) public manager:Manager=null;

    @property([Node]) public posicionesSpawn:Node[]=[];
    @property(Vec3) public maxY=new Vec3(0,0,0);
    @property(Vec3) public minY=new Vec3(0,0,0);
    @property(Prefab) public target:Prefab=null;
    @property([AnimationClip]) public clips:AnimationClip[]=[];
    
    @property(CCFloat) public time: number=0;
    @property(CCBoolean) public yaSpawn: boolean=false;

    @property ( CCFloat) private speed : number = 0;
    @property(CCInteger) public contador:number=5;

    protected onLoad(): void 
    {
        
    }
    protected start(): void 
    {
        this.yaSpawn=false;
        
    }
    Spawn()
    {
        //console.log("Spawn");
        if(!this.manager.fin)
        {
            
            let randomTotal=randomRangeInt(0,5);
            this.contador-=randomTotal;
            for(let a=0;a<=randomTotal;a++)
            {
                let x= randomRangeInt(0,5); //random posiciones
                const node=instantiate(this.target);
                if(this.posicionesSpawn[x].children.length==0)
                {
                    node.setParent(this.posicionesSpawn[x]);
                }
                else
                {
                    continue;
                    /*for(let i=0;i<this.posicionesSpawn.length;i++)
                    {
                        if(this.posicionesSpawn[i].children.length==0)
                        {
                            node.setParent(this.posicionesSpawn[i]);
                            break;
                        }
                    }*/
                }
            }
            //this.Movimiento();
            this.TiempoVida();
            
            
        }
        //this.yaSpawn=false;
        //console.log(this.yaSpawn);
    }

    Movimiento()
    {
        let random=randomRangeInt(0,2);

        switch(random)
        {
            case 0:
                for(let i=0;this.posicionesSpawn.length;i++)
                {
                    if(this.posicionesSpawn[i].position.y==this.maxY.y)
                    {
                        if(this.posicionesSpawn[i].children.length>0)
                        {
                            this.posicionesSpawn[i].children[0].getComponent(Animation).play(this.clips[0].name);
                            if(this.manager.anotar)
                            {
                                this.CambiaAnim(this.posicionesSpawn[i].children[0].getComponent(Animation),this.clips[0]);
                            }
                        }
                    }
                    else if(this.posicionesSpawn[i].position.y==this.minY.y)
                    {
                        if(this.posicionesSpawn[i].children.length>0)
                        {
                            this.posicionesSpawn[i].children[0].getComponent(Animation).play(this.clips[1].name);

                            if(this.manager.anotar)
                            {
                                this.CambiaAnim(this.posicionesSpawn[i].children[0].getComponent(Animation),this.clips[1]);
                            }
                        }
                    }
                }
                break;
            case 1:
                for(let i=0;this.posicionesSpawn.length;i++)
                {
                    if(this.posicionesSpawn[i].position.y==this.maxY.y)
                    {
                        if(this.posicionesSpawn[i].children.length>0)
                        {
                            this.posicionesSpawn[i].children[0].getComponent(Animation).play(this.clips[1].name);
                            if(this.manager.anotar)
                            {
                                this.CambiaAnim(this.posicionesSpawn[i].children[0].getComponent(Animation),this.clips[1]);
                            }
                        }
                    }
                    else if(this.posicionesSpawn[i].position.y==this.minY.y)
                    {
                        if(this.posicionesSpawn[i].children.length>0)
                        {
                            this.posicionesSpawn[i].children[0].getComponent(Animation).play(this.clips[0].name);
                            if(this.manager.anotar)
                            {
                                this.CambiaAnim(this.posicionesSpawn[i].children[0].getComponent(Animation),this.clips[0]);
                            }
                        }
                    }
                }
                break;
        }

        
        this.manager.anotar=false;
    }

    Timer(deltaTime: number)
    {
        this.time-=deltaTime/20;
        if(this.time<=0.2)
        {
            this.time=0.2;
        }
    }

    update(deltaTime: number) 
    {
        //this.Timer(deltaTime);

        if(!this.yaSpawn)
        {
            this.yaSpawn=true;
            this.scheduleOnce(function()
            {
                if(this.contador==this.posicionesSpawn.length)
                {
                    //console.log("UpdateSpawn " + this.posicionesSpawn.length);
                    this.Spawn();
                }
            }, this.time);
        }
        /*if(this.manager.reset)
        {
            this.manager.reset=false;
            this.TiempoVida();
        }*/
    }

    CambioPos()
    {
        this.contador=0;
        for(let i=0;i<this.posicionesSpawn.length;i++)
            {
                if(this.posicionesSpawn[i].children.length>0)
                {
                    for(let j=1;j<this.posicionesSpawn[i].children[0].children.length;j++)
                    {
                        this.posicionesSpawn[i].children[0].children[j].getComponent(Collider).enabled=false;
                    }
                    this.posicionesSpawn[i].children[0].getComponent(Animation).play(this.clips[2].name);
                    this.scheduleOnce(function()
                    {
                        this.posicionesSpawn[i].children[0].destroy();
                       
                    },1);
                    this.contador++;
                }
                else
                {
                    this.contador++;
                }
            }
        this.yaSpawn=false;

    }

    CambiaAnim(anim:Animation, clip:AnimationClip)
    {
        if(this.manager.score <= 2)
        {
            anim.play(clip.name);
        }
        
        anim.getState(clip.name).speed = this.speed;
        this.speed +=.25;
    }

    TiempoVida()
    {
        //console.log("Tiempo vida");
        
        this.scheduleOnce(function()
            {
                this.CambioPos();
            }, 10);
    }
}


