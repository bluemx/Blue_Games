import { _decorator, CCInteger, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ManagerInstrucciones')
export class ManagerInstrucciones extends Component {

    @property([Node])
    public inst: Node[] = [];
    
    start() {

    }
    protected onLoad(): void {
        this.inst[0].active = true;
        this.inst[1].active=false;
        this.inst[2].active = false;
    }
    public Primera(){
        
                this.inst[0].active = true;
                this.inst[1].active=false;
                this.inst[2].active = false;
                
    }
    public segunda(){
        this.inst[0].active = false;
        this.inst[1].active = true;
        this.inst[2].active = false;
    }
    public tercer(){
        this.inst[0].active = false;
        this.inst[1].active = false;
        this.inst[2].active = true;
    }
    update(deltaTime: number) {
        
    }
}


