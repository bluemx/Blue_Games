import { _decorator, CCFloat, Component, instantiate, Node, Prefab, randomRangeInt, RigidBody2D, Sprite, SpriteFrame, SpriteRenderer } from 'cc';
import { Manager } from './Manager';
const { ccclass, property } = _decorator;

@ccclass('Spawn')
export class Spawn extends Component 
{
    @property (Manager) public manager: Manager=null;
    @property([Prefab]) public objetos: Prefab[] =[];
    @property([Node]) public posiciones: Node[]=[];

    @property(CCFloat) public time: number=0;
    private yaSpawn: boolean=false;
    private index: number[]=[0,0,0,0,0];


    protected onLoad(): void {
        
    }

    Spawn()
    {
        if(!this.manager.fin)
        {
            let x= randomRangeInt(0,5) //random posiciones
        let rand=randomRangeInt(0,10)//random objetos
        const node=instantiate(this.objetos[rand]);
        node.setParent(this.node);
        let randomGiro=randomRangeInt(-5,5);
        if(randomGiro==0)
            randomGiro=1;
        node.getComponent(RigidBody2D).angularVelocity=randomGiro;

        switch(x)
        {
            case 0: 
                    node.setPosition(this.posiciones[0].position);
                    this.index[0]++;
                    if(this.index[0] >=1)
                    {
                        node.setPosition(this.posiciones[3].position);
                        this.index[0] =0;
                    }
            break;
            case 1: 
                    node.setPosition(this.posiciones[1].position);
                    this.index[1]++;
                    if(this.index[1] >=1)
                    {
                        node.setPosition(this.posiciones[0].position);
                        this.index[1] =0;
                    }
            break;
            case 2: 
                    node.setPosition(this.posiciones[2].position);
                    this.index[2]++;
                    if(this.index[2] >=1)
                    {
                        node.setPosition(this.posiciones[4].position);
                        this.index[2] =0;
                    }
            break;
            case 3:
                    node.setPosition(this.posiciones[3].position);
                    this.index[3]++;
                    if(this.index[3] >=1)
                    {
                        node.setPosition(this.posiciones[2].position);
                        this.index[3] =0;
                    }
            break;
            case 4:
                    node.setPosition(this.posiciones[4].position);
                    this.index[4]++;
                    if(this.index[4] >=1)
                    {
                        node.setPosition(this.posiciones[1].position);
                        this.index[4] =0;
                    }
            break;
        }//fin switch
        this.yaSpawn=false;
        }
        
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
        this.Timer(deltaTime);
        if(!this.yaSpawn)
        {
            this.yaSpawn=true;
            this.scheduleOnce(function()
            {
                this.Spawn();
            }, this.time)
        }
    }
}


