import { _decorator, Component, Node, UITransform, Touch, Vec2, Vec3, Graphics, math, RigidBody, Animation, CCInteger, CCBoolean,Color, color, PointLight, NodeEventType } from 'cc';
import { ManagerSopa } from './ManagerSopa';

const { ccclass, property } = _decorator;

@ccclass('arrastrededo')
export class arrastrededo extends Component {

    

    @property(Vec3)
    public posui : Vec3 = new Vec3;
    @property(Graphics)
    private flecha : Graphics = null;

    @property(Vec2)
    public posInicial : Vec2  = new Vec2;
   
    @property([Node])
    public NewNode : Node [] = [];
   // @property(Node)
    //public Portero : Node = null;
   
    //@property(Node)
    //public jugadorAnim : Node = null;
    @property(CCBoolean)
    public arrastrando : boolean = false;
    private  width : number = 0;
    private height : number = 0;
    private posicion : Vec3 = new Vec3(0,0,0);
   
    
    //
    @property(Node)
    public MS : Node = null;
    @property(Node)
    public GameO : Node = null;

    @property(CCInteger)
    public tiros : number = 0;


    protected onLoad(): void {

        
        //this.GameO.active=false;
        this.flecha = this.node.getComponent(Graphics);
        this.flecha.fillColor = color(255, 255, 255, 125); // Color blanco con 50% de transparencia
        this.flecha.strokeColor = color(255, 255, 255, 200); // Color blanco con 50% de transparencia
        this.node.on(Node.EventType.TOUCH_START, this.onStart, this)
        this.node.on(Node.EventType.TOUCH_MOVE, this.onMove, this)
        this.node.on(Node.EventType.TOUCH_END, this.onMoveEnd, this)
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onMoveEnd,this)
    }
    onStart(event: Touch){
        this.posui = new Vec3(0,0,0);
        let inicio : Vec3 = this.convertirPosicion(event.getUILocation());
        this.posInicial = new Vec2(inicio.x,inicio.y);
        this.flecha.moveTo(this.posInicial.x, this.posInicial.y);
        

    }
    onMove(event:Touch){
       
            this.posicion = this.convertirPosicion(event.getUILocation()); // Posición corregida
            this.width = this.posicion.x - this.posInicial.x;
            this.height = this.posicion.y - this.posInicial.y;
            this.flecha.clear();
            this.flecha.moveTo(this.posInicial.x, this.posInicial.y);
            //this.flecha.rect(this.posInicial.x, this.posInicial.y, width,height)
            //this.flecha.roundRect(this.posInicial.x, this.posInicial.y, this.width,this.height,10);
            this.flecha.lineTo(this.posicion.x, this.posicion.y);
            this.flecha.strokeColor = new Color(255, 255, 255.125); // 
            this.flecha.lineWidth = this.MS.getComponent(ManagerSopa).size-10; // Grosor de la línea
            this.flecha.stroke();
           //this.flecha.fill();
          
           
        

    }
    onMoveEnd(event:Touch){
       
        this.flecha.clear();
        //this.creaLineaNueva(event);
       
        
       

    }
    private convertirPosicion(posicionPantalla: Vec2): Vec3 {
        let posicionNodo = new Vec3();
        this.node.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(posicionPantalla.x, posicionPantalla.y, 0), posicionNodo);
        return posicionNodo;
    }
    
   /* public creaLineaNueva(inicial : Node , final : Node){
        const node = new Node();
        node.setParent(this.node); // Agregarlo al mismo padre que el nodo original
        
        
        let uiTransform = node.getComponent(UITransform);
        if (!uiTransform) {
            uiTransform = node.addComponent(UITransform);
        }

        // Obtener la posición corregida en el mundo desde la línea original
        let startWorldPos = this.node.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(this.posInicial.x, this.posInicial.y, 0));
        let endWorldPos = this.node.getComponent(UITransform).convertToWorldSpaceAR(this.posicion);
    
        // Convertir estas posiciones al espacio local del nuevo nodo
        let startLocalPos = node.getComponent(UITransform).convertToNodeSpaceAR(startWorldPos);
        let endLocalPos = node.getComponent(UITransform).convertToNodeSpaceAR(endWorldPos);
         // **Normalizar la diferencia de tamaño**
        let diffX = Math.abs(endLocalPos.x - startLocalPos.x);
        let diffY = Math.abs(endLocalPos.y - startLocalPos.y);

        // Escalar la línea si es necesario (puedes ajustar este valor según pruebas)
        let scaleFactor = 1; // Ajusta este factor si sigue siendo pequeña
        endLocalPos.x = startLocalPos.x + diffX * scaleFactor * Math.sign(endLocalPos.x - startLocalPos.x);
        endLocalPos.y = startLocalPos.y + diffY * scaleFactor * Math.sign(endLocalPos.y - startLocalPos.y);

    
        // Configurar la nueva línea
        const flecha2 = node.addComponent(Graphics);
       
        flecha2.fillColor = color(255, 255, 255, 125);
        flecha2.strokeColor = color(255, 255, 255, 255);
        
        // Dibujar la línea correctamente alineada
        
        const center = this.getCenterPoint(inicial,final);
        const angulos = this.getAngleBetweenNodes(inicial,final);
        const distancia = this.getDistanceBetweenNodes(inicial,final);
        this.drawRotatedRect(node,inicial,final,this.MS.getComponent(ManagerSopa).size);

    }*/
        public creaLineaNueva(nodoInicial: Node, nodoFinal: Node) {
            const node = new Node();
            this.NewNode.push(node);
            node.setParent(this.node.parent); // Mantenerlo en la misma jerarquía
        
            // Asegurar que tenga UITransform
            let uiTransform = node.getComponent(UITransform);
            if (!uiTransform) {
                uiTransform = node.addComponent(UITransform);
            }
        
            // Obtener UITransform de los nodos tocados
            let uiTransformInicial = nodoInicial.getComponent(UITransform);
            let uiTransformFinal = nodoFinal.getComponent(UITransform);
        
            if (!uiTransformInicial || !uiTransformFinal) {
                console.error("Uno de los nodos no tiene UITransform");
                return;
            }
        
            // Obtener posiciones en el mundo
            let startWorldPos = uiTransformInicial.convertToWorldSpaceAR(new Vec3(0, 0, 0));
            let endWorldPos = uiTransformFinal.convertToWorldSpaceAR(new Vec3(0, 0, 0));
        
            // Convertir al espacio local del nuevo nodo
            let startLocalPos = uiTransform.convertToNodeSpaceAR(startWorldPos);
            let endLocalPos = uiTransform.convertToNodeSpaceAR(endWorldPos);
        
            // **Calcular dimensiones del rectángulo**
            let width = Math.abs(endLocalPos.x - startLocalPos.x);
            let height = Math.abs(endLocalPos.y - startLocalPos.y);
        
            // Determinar la posición del rectángulo
            let rectX = Math.min(startLocalPos.x, endLocalPos.x);
            let rectY = Math.min(startLocalPos.y, endLocalPos.y);
        
            // Agregar y configurar el componente Graphics
            const rectGraphics = node.addComponent(Graphics);
            rectGraphics.lineWidth = 7;
            rectGraphics.fillColor = new Color(255, 255, 255, 100); // Color semitransparente
            rectGraphics.strokeColor = new Color(75, 75, 75, 255);
            
        
            // Dibujar el rectángulo
            rectGraphics.rect(rectX, rectY, width, height);
            rectGraphics.fill();
            rectGraphics.stroke();
            //this.drawRotatedRect(node,nodoInicial,nodoFinal,45);
            this.drawRoundedRect(node,nodoInicial,nodoFinal,this.MS.getComponent(ManagerSopa).size-10,0);
        }
        
    /*    public creaLineaNueva() {
            const node = new Node();
            node.setParent(this.node.parent); // Mantenerlo en la misma jerarquía
        
            // Asegurar que tenga UITransform
            let uiTransform = node.getComponent(UITransform);
            if (!uiTransform) {
                uiTransform = node.addComponent(UITransform);
            }
        
            // Obtener posiciones en el mundo
            let startWorldPos = this.node.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(this.posInicial.x, this.posInicial.y, 0));
            let endWorldPos = this.node.getComponent(UITransform).convertToWorldSpaceAR(this.posicion);
        
            // Convertir al espacio local del nuevo nodo
            let startLocalPos = uiTransform.convertToNodeSpaceAR(startWorldPos);
            let endLocalPos = uiTransform.convertToNodeSpaceAR(endWorldPos);
        
            // **Normalizar la diferencia de tamaño**
            let diffX = Math.abs(endLocalPos.x - startLocalPos.x);
            let diffY = Math.abs(endLocalPos.y - startLocalPos.y);
        
            // Escalar la línea si es necesario (puedes ajustar este valor según pruebas)
            let scaleFactor = 1.1; // Ajusta este factor si sigue siendo pequeña
            endLocalPos.x = startLocalPos.x + diffX * scaleFactor * Math.sign(endLocalPos.x - startLocalPos.x);
            endLocalPos.y = startLocalPos.y + diffY * scaleFactor * Math.sign(endLocalPos.y - startLocalPos.y);
        
            // Agregar y configurar el componente Graphics
            const flecha2 = node.addComponent(Graphics);
            flecha2.lineWidth = 5;
            flecha2.fillColor = color(255, 255, 255, 125);
            flecha2.strokeColor = color(255, 255, 255, 255);
        
            // Dibujar la nueva línea con el tamaño corregido
            flecha2.moveTo(startLocalPos.x, startLocalPos.y);
            flecha2.lineTo(endLocalPos.x, endLocalPos.y);
            flecha2.stroke();
            this.flecha.fill();
        }
    */  
    getCenterPoint(node1: Node, node2: Node): Vec2 {
        const pos1 = node1.position;
        const pos2 = node2.position;
    
        // Calcular el punto medio
        const centerX = (pos1.x + pos2.x) / 2;
        const centerY = (pos1.y + pos2.y) / 2;
    
        return new Vec2(centerX, centerY);
    }
    getAngleBetweenNodes(node1: Node, node2: Node): number {
        const pos1 = node1.position;
        const pos2 = node2.position;
    
        // Calcular el ángulo en radianes
        const angleRad = Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x);
    
        // Convertir a grados
        const angleDeg = angleRad * (180 / Math.PI);
    
        return angleDeg;
    }

    getDistanceBetweenNodes(node1: Node, node2: Node): number {
        const pos1 = node1.position;
        const pos2 = node2.position;
    
        // Calcular distancia euclidiana
        const distance = Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
        console.log("La distancia entre " + node1.name + " y " + node2.name +" es igual a " + distance.toString());
    
        return distance;
    }
    getNodeWorldPosition(node: Node): Vec2 {
        const uiTransform = node.getComponent(UITransform);
        const worldPos = uiTransform.convertToWorldSpaceAR(new Vec3(0,0, 0));
        return new Vec2(worldPos.x, worldPos.y);
    }
    
   /* drawRotatedRect(graphicsNode: Node, startNode: Node, endNode: Node, height: number) {
        graphicsNode.getComponent(Graphics).clear();
        let uiTransform = graphicsNode.getComponent(UITransform);
        if (!uiTransform) {
            uiTransform = graphicsNode.addComponent(UITransform);
        }
        // Obtener UITransform de los nodos
        /*const graphicsTransform = graphicsNode.getComponent(UITransform);
        const startTransform = startNode.getComponent(UITransform);
        const endTransform = endNode.getComponent(UITransform);
        *//*
        const graphicsTransform = graphicsNode.getComponent(UITransform);
        const startTransform = startNode.getPosition();
        const endTransform = endNode.getPosition();
        let uiTransformInicial = startNode.getComponent(UITransform);
        let uiTransformFinal = endNode.getComponent(UITransform);
    
        if (!uiTransformInicial || !uiTransformFinal) {
            console.error("Uno de los nodos no tiene UITransform");
            return;
        }
    
        // Obtener posiciones en el mundo
        let startWorldPos = uiTransformInicial.convertToWorldSpaceAR(new Vec3(0, 0, 0));
        let endWorldPos = uiTransformFinal.convertToWorldSpaceAR(new Vec3(0, 0, 0));
    
        // Convertir al espacio local del nuevo nodo
        let startLocalPos = uiTransform.convertToNodeSpaceAR(startWorldPos);
        let endLocalPos = uiTransform.convertToNodeSpaceAR(endWorldPos);
        // Obtener posiciones locales de los nodos
        
    
        // Calcular el centro entre las dos posiciones locales
        const center = new Vec2((startLocalPos.x + endLocalPos.x) / 2, (startLocalPos.y + endLocalPos.y) / 2);
    
        // Calcular la distancia entre las dos letras (será el ancho del rectángulo)
        //const width = Math.sqrt(Math.pow(startLocalPos.x - startLocalPos.x, 2) + Math.pow(endLocalPos.y - startLocalPos.y, 2));
        const width = Math.sqrt(Math.pow(endLocalPos.x - startLocalPos.x, 2) + Math.pow(endLocalPos.y - startLocalPos.y, 2));

        let direccion = new Vec2(endLocalPos.x - startLocalPos.x, endLocalPos.y - startLocalPos.y).normalize(); // Vector dirección

        // **Detectar si es horizontal, vertical o diagonal**
        let perpendicular: Vec2;
        if (Math.abs(direccion.x) > 0 && Math.abs(direccion.y) > 0) {
            // **Caso diagonal**
            perpendicular = new Vec2(-direccion.y, direccion.x);
        } else if (Math.abs(direccion.x) > 0) {
            // **Caso horizontal** (Mover en eje Y)
            perpendicular = new Vec2(0, 1);
        } else {
         // **Caso vertical** (Mover en eje X)
            perpendicular = new Vec2(1, 0);
        }
    
        // Obtener el ángulo de rotación entre las dos letras
        const angle = Math.atan2(endLocalPos.y - startLocalPos.y, endLocalPos.x - startLocalPos.x) * (180 / Math.PI);
        const rad = angle * (Math.PI / 180);
    
        // Calcular las esquinas del rectángulo con el centro y el ángulo
        const halfW = width / 2;
        const halfH = height / 2;
    
        const corners = [
            new Vec2(-halfW, -halfH),
            new Vec2(halfW, -halfH),
            new Vec2(halfW, halfH),
            new Vec2(-halfW, halfH),
        ].map(corner => {
            return new Vec2(
                center.x + (corner.x * Math.cos(rad) - corner.y * Math.sin(rad)),
                center.y + (corner.x * Math.sin(rad) + corner.y * Math.cos(rad))
            );
        });
    
        // Dibujar el rectángulo en el nodo graphicsNode
        const graphics = graphicsNode.getComponent(Graphics);
    graphics.moveTo(corners[0].x, corners[0].y);
    for (let i = 1; i < corners.length; i++) {
        graphics.lineTo(corners[i].x, corners[i].y);
    }
    graphics.close();
    graphics.fill();
    graphics.stroke();
}*/
drawRoundedRect(graphicsNode: Node, startNode: Node, endNode: Node, height: number, radius: number) {
    // Limpiar dibujo previo
    const graphics = graphicsNode.getComponent(Graphics);
    graphics.clear();

    let uiTransform = graphicsNode.getComponent(UITransform);
    if (!uiTransform) {
        uiTransform = graphicsNode.addComponent(UITransform);
    }

    // Obtener UITransform de los nodos
    const uiTransformInicial = startNode.getComponent(UITransform);
    const uiTransformFinal = endNode.getComponent(UITransform);

    if (!uiTransformInicial || !uiTransformFinal) {
        console.error("Uno de los nodos no tiene UITransform");
        return;
    }

    // Obtener posiciones en el mundo
    const startWorldPos = uiTransformInicial.convertToWorldSpaceAR(new Vec3(0, 0, 0));
    const endWorldPos = uiTransformFinal.convertToWorldSpaceAR(new Vec3(0, 0, 0));

    // Convertir al espacio local del nuevo nodo
    const startLocalPos = uiTransform.convertToNodeSpaceAR(startWorldPos);
    const endLocalPos = uiTransform.convertToNodeSpaceAR(endWorldPos);

    // Calcular el centro del rectángulo
    const center = new Vec2((startLocalPos.x + endLocalPos.x) / 2, (startLocalPos.y + endLocalPos.y) / 2);

    // Calcular tamaño y ángulo de rotación
    const width = Math.sqrt(Math.pow(endLocalPos.x - startLocalPos.x, 2) + Math.pow(endLocalPos.y - startLocalPos.y, 2)) +40 ;
    const angle = Math.atan2(endLocalPos.y - startLocalPos.y, endLocalPos.x - startLocalPos.x);
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    // Esquinas del rectángulo sin rotación
    const halfW = width / 2;
    const halfH = height / 2;

    const corners = [
        new Vec2(-halfW + radius, -halfH), // Arriba izquierda (inicio de la línea superior)
        new Vec2(halfW - radius, -halfH),  // Arriba derecha (fin de la línea superior)
        new Vec2(halfW, -halfH + radius),  // Punto de inicio del arco superior derecho
        new Vec2(halfW, halfH - radius),   // Abajo derecha (fin de la línea derecha)
        new Vec2(halfW - radius, halfH),   // Punto de inicio del arco inferior derecho
        new Vec2(-halfW + radius, halfH),  // Abajo izquierda (fin de la línea inferior)
        new Vec2(-halfW, halfH - radius),  // Punto de inicio del arco inferior izquierdo
        new Vec2(-halfW, -halfH + radius)  // Punto de inicio del arco superior izquierdo
    ].map(corner => {
        return new Vec2(
            center.x + (corner.x * cosA - corner.y * sinA),
            center.y + (corner.x * sinA + corner.y * cosA)
        );
    });

    // **Dibujar rectángulo con esquinas redondeadas usando `arc()`**
    graphics.moveTo(corners[0].x, corners[0].y);
    graphics.lineTo(corners[1].x, corners[1].y); // Lado superior
    //graphics.arc(corners[2].x, corners[2].y, radius, 0, Math.PI / 2, false); // Esquina superior derecha

    
    graphics.lineTo(corners[3].x, corners[3].y); // Lado derecho
    //graphics.arc(corners[4].x, corners[4].y, radius, Math.PI / 2, Math.PI, false); // Esquina inferior derecha

    graphics.lineTo(corners[5].x, corners[5].y); // Lado inferior
    //graphics.arc(corners[6].x, corners[6].y, radius, Math.PI, (Math.PI * 3) / 2, false); // Esquina inferior izquierda

    graphics.lineTo(corners[7].x, corners[7].y); // Lado izquierdo
    //graphics.arc(corners[0].x, corners[0].y, radius, (Math.PI * 3) / 2, 0, false); // Esquina superior izquierda
    
    

    graphics.close();
    graphics.fill();
    graphics.stroke();
}
   
    
public EliminaNuevoNodos():void{
    this.NewNode.forEach(n => {
        n.destroy();
    });
    this.NewNode = [];
}
    GameOver(){
        this.GameO.active=true;
        
    }
    resetea(){
        
    }
   
    start() {

    }

    update(deltaTime: number) {
        
    }
}


