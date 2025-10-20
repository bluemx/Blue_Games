import { _decorator, CCInteger, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Instrucciones')
export class Instrucciones extends Component 
{
    @property([Node]) public instrucciones: Node[]=[];
    @property([Node]) public botones: Node[]=[];
    @property(CCInteger) private actual: number=0;

    onLoad()
    {
        for(let i=0;i<this.node.children.length; i++)
        {
            this.instrucciones[i]=this.node.children[i];
            this.instrucciones[i].active=false;
        }

        this.instrucciones[0].active=true;
        this.actual=0;
        
        if(this.instrucciones.length==1)
        {
            this.botones[0].active=false;
            this.botones[1].active=false;
        }
        else
        {
            this.botones[0].active=true;
            this.botones[1].active=false;
        }
    }

    start() {

    }

    update(deltaTime: number) 
    {
        
    }

    Botones(posActual: number)
    {
        if(posActual==0)
            {
                this.botones[1].active=false;
                this.botones[0].active=true;
            }
        else if(posActual==this.instrucciones.length-1)
            {
                this.botones[0].active=false;
                this.botones[1].active=true;
            }
        else if(posActual>0&&posActual<this.instrucciones.length-1)
        {
            this.botones[0].active=true;
            this.botones[1].active=true;
        }
        
        
    }

    Next()
    {
        let i=this.actual;
        for(;i<this.instrucciones.length;)
        {
           this.instrucciones[i+1].active=true;
           this.instrucciones[i].active=false;
           
           break;
        }

        
        i++;
        this.actual=i;
        this.Botones(this.actual);
    }

    Back()
    {
        let i=this.actual;
        for(;i>0;)
        {
            this.instrucciones[i].active=false;
            this.instrucciones[i-1].active=true;
            break;
        }

        i--;
        this.actual=i;
        this.Botones(this.actual);
    }
}


