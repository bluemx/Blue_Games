import { _decorator, Component, Node, Collider2D, IPhysics2DContact, Contact2DType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ZonaMuerte')
export class ZonaMuerte extends Component 
{
    onLoad()
    {
            
        const collider=this.getComponent(Collider2D);
    
        if(collider)
        {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onTriggerEnter, this)
        }
    
    }

    onTriggerEnter(selfCollider : Collider2D, otherCollider: Collider2D, contact : IPhysics2DContact)
    {
        
        this.scheduleOnce(function(){
            
            
            otherCollider.node.destroy();
        },0.5);


    }
}


