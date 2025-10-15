import { _decorator, CCInteger, Component, instantiate, Label, Layout, Animation, LayoutComponent, Color, Vec2, Vec3, EventTouch, Node, Prefab, UITransform, Graphics, Sprite, SpriteFrame, debug, CCBoolean, RelativeJoint2D, color, animation, QuatInterpolationMode, Button, ButtonComponent } from 'cc';
import { Cronometro } from './Cronometro';
import { arrastrededo } from './arrastrededo';
import { ButtonMessage } from './ButtonMessage';
const { ccclass, property } = _decorator;

@ccclass('ManagerSopa')
export class ManagerSopa extends Component {

    @property(Prefab)
    public  cuadroPrefab : Node = null;
    @property([Node]) 
    gridCeldas: Node[] = [];
    @property([String])
    public arregloPalabras: String[] = [];
    private seleccion: Node[] = []; // Letras seleccionadas
    @property(CCInteger)
    public filas : number = 0;
    @property(CCInteger)
    public columnas : number = 0;
    @property(CCInteger)
    public size : number = 0;
    @property(CCInteger)
    private padding : number = 0;
    @property(CCInteger)
    private area : number = 0;
    @property (Node)
    public layout : Node = null;
    @property(SpriteFrame)
    public imagenencontrada : SpriteFrame = null;
    @property(SpriteFrame)
    public nodoEncontrado : SpriteFrame = null;
    @property(SpriteFrame)
    public nodonoencontrado : SpriteFrame = null;
    @property([Node])
    public nodosPalabras : Node[] = [];
    @property([CCBoolean])
    public boleanos : boolean [] = [];
    @property(Cronometro)
    public Reloj : Cronometro = null;
    @property(Node)
    public anim : Node = null;
    @property(Label)
    public labelpuntaje : Label = null;
    @property(Label)
    public contadorPalabras : Label = null;
    public indexPalabras : number = 0;
    public indexsopa = 0;
    public score : number = 0;

    public gridSize = this.columnas; // Puede cambiar dinámicamente (ej. 10 para 10x10)
    @property([String])
    public palabras = ["HOME", "DEPOT", "PVC", "LLAVE", "LUZ","REPISA","CAJON","COCINA","",""]; // Palabras a colocar
    //public palabras8= ["JARDIN","CINTA","PERSIANA","LIJA","ESTUFA","TALADRO","TUBO","CEMENTO"];
    //public palabras9 = ["TABLAROCA","MALLA","CLAVO","PANELES","ADHESIVO","YESO","BROCHA","AEROSOL"];
    //public palabras10 = ["PINTURA","BARNIZ","MADERA","REGADERA","LAMPARA","INODORO","CABLEADO","VIGA"];
    //public palabaras11 = ["REGULADOR","RESINA","FUSIBLE","INTERRUPTOR","INTELIGENTE","DETECTOR","SELLADOR","REMOVEDOR"];
    public todasLasPalabras =[ "HOME", "DEPOT", "PVC", "LLAVE", "LUZ", "REPISA", "CAJON", "COCINA", 
                                "JARDIN", "CINTA", "PERSIANA", "LIJA", "ESTUFA", "TALADRO", "TUBO", "CEMENTO", 
                                "TABLAROCA", "MALLA", "CLAVO", "PANELES", "ADHESIVO", "YESO", "BROCHA", "AEROSOL", 
                                "PINTURA", "BARNIZ", "MADERA", "REGADERA", "LAMPARA", "INODORO", "CABLEADO", "VIGA", 
                                "RESINA", "FUSIBLE", "DETECTOR", "SELLADOR", "REMOVEDOR", "APAGADOR", "GRIFO", "ROSCA", 
                                "RODILLO", "SPRAY", "SIERRA", "SENSOR", "RIEL", "LIMA", "DUCHA", "BROCA", 
                                "TEJA", "PODADORA", "VIDRIO", "TIMER", "FOCO", "LOSA", "MURO", "PUNTA", 
                                "VARILLA", "ESMALTE", "LED", "GAS", "GRANO", "COBRE", "TINTE", "COLOR", 
                                "MANGUERA", "CAJA", "ESCALERA", "HORNO", "LAVABO", "ALICATE", "MARTILLO", "ESCUADRA", 
                                "PLAFON", "EMPALME", "TUERCA", "PERNO", "ARANDELA", "SOPORTE", "VENTILADOR", "CALAFATEO", 
                                "ALAMBRE", "TARJA", "ESPATULA", "BOMBA", "SOPLADOR", "REMACHE", "SARGENTO", "CINCEL", 
                                "CANDADO", "TRAMPA", "PULIDORA", "ALUMINIO", "DESTAPE", "BISAGRA", "TAPON", "AIRE", 
                                "COLECTOR", "CHIMENEA", "COLADERA", "BORDA", "CINTILLA", "TORNILLO", "PALANCA", "LLAVERO", 
                                "TALADRO", "MANGO", "PISTOLA", "GUANTES", "PERCHA", "TENAZAS", "TIJERAS", "SEGUETA", 
                                "CUBETA", "FLEXO", "PASTILLA", "SARGENTO", "PULIDOR", "CALOR", "LENTE", "BIDON",
                                "ABONO", "ACERO", "ADAPTADOR", "ADHESIVO", "AIREADOR", "AISLANTE", "ALACENA",
  "ALAMBRE", "ALFOMBRA", "ALICATE", "ANILLO", "ARBOL", "ARBUSTO", "ARENA",
  "ARMARIO", "ARNES", "AZULEJO", "BALCON", "BALDOSA", "BANCO", "BARBIJOS",
  "BARNIZ", "BASE", "BATERIA", "BATIDORA", "BATIENTE", "BEGONIA", "BIDET",
  "BISAGRA", "BOBINA", "BODEGA", "BOMBA", "BOMBILLA", "BONSAI", "BOTAS",
  "BOTIQUIN", "BRIDA", "BROCA", "BROCHA", "BURLETE", "BUTACA", "CABECERA",
  "CABLE", "CACTUS", "CAJA", "CAJON", "CAL", "CAMA", "CAMPANA", "CANASTA",
  "CANDADO", "CAPACITOR", "CARETA", "CARPETA", "CASCO", "CASCOS", "CELOSIA",
  "CEMENTO", "CEPILLO", "CERAMICA", "CERRADURA", "CERROJO", "CESPED", "CESTA",
  "CHALECO", "CHAPA", "CHIMENEA", "CINTA", "CINTURON", "CLAVO", "CLOSET",
  "COBRE", "CODERAS", "CODO", "COLOR", "COMODA", "CONECTOR", "CONGELAR",
  "COPLE", "CORREDIZO", "CORTINA", "CRISTAL", "CUTTER", "DALIA", "DELANTAL",
  "DIFUSOR", "DOSIFICAR", "EMPAQUE", "ENCHAPE", "ENCHUFE", "ENGRANE",
  "ESCRITOR", "ESMALTE", "ESPATULA", "ESPEJO", "ESPONJA", "ESTANTE", "ESTUCHE",
  "ESTUCO", "ESTUFA", "EXTENSOR", "FAROL", "FILTRO", "FLOR", "FOCO", "FOTOCELDA",
  "FUSIBLE", "GAFAS", "GANCHOS", "GAVETA", "GRANITO", "GRAPAS", "GRAVA",
  "GRIFO", "GUANTES", "HELECHO", "HERRERO", "HIDRO", "HORNO", "HUERTO",
  "ILUMINAR", "JABON", "JARDIN", "JAZMIN", "JUNTA", "LADRILLO", "LAMINADO",
  "LAMPARA", "LATEX", "LAVABLE", "LAVABO", "LAVADORA", "LAVAMANOS", "LAVANDA",
  "LED", "LIBRERO", "LICUADORA", "LIJA", "LIMA", "LINOLEO", "LLAVE", "LOSETA",
  "LUMINARIA", "LUZ", "MACETA", "MADERA", "MAMPARA", "MANGAS", "MANGUERA",
  "MANIJA", "MARCO", "MARMOL", "MARTILLO", "MECEDORA", "MESA", "METRO",
  "MICROOND", "MINISPLIT", "MODULAR", "MORTERO", "MOSAICO", "MOSQUIT",
  "NIPLE", "NIVELADOR", "OREJERAS", "ORQUIDEA", "OVEROL", "OXIDO", "PALMERAS",
  "PANEL", "PANTALLA", "PEGAMENTO", "PERCHA", "PERCHERO", "PERGOLA", "PERNO",
  "PERSIANA", "PETUNIA", "PICAPORTE", "PINTOR", "PINTURA", "PISO", "PISTOLA",
  "PIVOTE", "PLAFON", "PLANCHA", "PLASTICO", "PLOMERO", "POMO", "POSTIGO",
  "PRIMER", "PROTECTOR", "PUERTA", "PULIDO", "RADIADOR", "RECAMARA",
  "RECIBIDOR", "REFLECTOR", "REGADERA", "REGULADOR", "REJA", "REJILLA", "RELOJ",
  "REMACHE", "REPISA", "RESINA", "RESISTOR", "REVESTIR", "RIEGO", "RIEL",
  "ROCIADOR", "RODILLER", "RODILLO", "ROPERO", "ROSAL", "ROSCA", "SANITARIO",
  "SECADOR", "SECADORA", "SELLADOR", "SEMILLA", "SENSOR", "SERRUCHO", "SETO",
  "SIERRA", "SIFON", "SILLA", "SOFA", "SOLDADOR", "SOPORTE", "SPOT", "SUELO",
  "TABIQUE", "TABLERO", "TABURETE", "TALADRO", "TAPETE", "TAPON", "TARIMA",
  "TARUGO", "TAZA", "TECHO", "TEFLON", "TEJA", "TEMPERA", "TERMINAL", "TIERRA",
  "TINACO", "TOALLA", "TOALLERO", "TOCADOR", "TORNILLO", "TOSTADOR", "TRAGALUZ",
  "TRINCHAR", "TUBERIA", "TUERCA", "TULIPAN", "UMBRAL", "UNIFORME", "UNION",
  "VALVULA", "VENTANA", "VENTILAD", "VERNIZ", "VIDRIO", "VINILO", "VISOR",
  "VITRINA", "YESERO", "YESO", "CONSTRUIR", "REPARAR", "LIMPIAR", "PULIR",
  "RENOVAR", "REEMPLAZAR", "AMPLIAR", "DECORAR", "GUARDAR"
                            ];
    public letrasAleatorias = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    public grid: string[][] ;

    private nodoActual: Node = null; // Última celda seleccionada
    private startLetter: Node = null;
    private endLetter: Node  = null;
    private graphics: Graphics = null;
    @property(arrastrededo)
    public linea : arrastrededo = null;
    @property(ButtonMessage)
    public Message : ButtonMessage = null;
   ////////////////////////////
   
    protected onLoad(): void {
        this.labelpuntaje.string="0";
        this.graphics = this.node.children[0].children[0].getComponent(Graphics);
        this.boleanos = [false,false,false,false,false,false,false,false,false,false];
       
        if(this.columnas<7){
            this.columnas = 7;
            this.filas = 7;
        }
        else if(this.columnas > 11){
            this.columnas = 11;
        }
        this.CambioPrefab(this.columnas);
        this.area = this.filas * this.columnas;
        this.grid = Array(this.columnas).fill(null).map(() => Array(this.columnas).fill(""));
        this.RellenaSopa(this.area, this.size);
        this.CambiaPadiing(this.padding);

        this.colocarPalabras();
        this.rellenarLetrasAleatorias();
        this.actualizarLabels();
        this.PalabrasLabel();
        
    }
    start() {
       this.touchSatrt();
    }
    public touchSatrt(){
        this.gridCeldas.forEach(celda => {
            console.log("Asignar touch");
            celda.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
            celda.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
            celda.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
            celda.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        });
    }
    public PalabrasLabel(){
        for(let i= 0; i < this.nodosPalabras.length; i++){
            this.nodosPalabras[i].children[0].getComponent(Label).string = this.palabras[i];
        }
    }
    public onTouchStart(event: EventTouch){
        console.log("Entre");
       
        this.seleccion = []; // Limpiar selección anterior
        this.nodoActual = null; // Reiniciar nodo anterior
        let nodo = this.obtenerNodoTocado(event);
        if (nodo) this.agregarCelda(nodo);
        //const target = event as unknown as Node;
        this.startLetter = nodo;
       
    }
    public onTouchMove(event: EventTouch){
        let nodo = this.obtenerNodoTocado(event);
        if (nodo && nodo !== this.nodoActual) { // Solo agregar si es una nueva celda
            this.agregarCelda(nodo);
            this.nodoActual = nodo; // Guardamos la última celda seleccionada
             //const target = event as unknown as Node;
            this.endLetter = nodo;
        }
    }
    public onTouchEnd(event: EventTouch){
        console.log("Termine de seleccionar");
        this.seleccion.forEach(n => n.children[0].getComponent(Label).color = new Color(255, 255, 255)); // Resetear color
        
        if (this.startLetter && this.endLetter) {
        console.log("nodo inicio es igual a " + this.startLetter.name + " y nombre de nodo final es igual a " + this.endLetter.name );

            this.verificarPalabra(this.startLetter, this.endLetter);
            //this.drawLineBetweenLetters();
            //this.linea.creaLineaNueva(this.startLetter, this.endLetter);
            //this.linea.drawRoundedRect(this.node, this.startLetter, this.endLetter, this.size, 10);
            
        }
        this.startLetter = null;
        this.endLetter = null;
        
    }
    private obtenerNodoTocado(event: EventTouch): Node{
        let localPos = event.getUILocation(); // Obtiene la posición del toque
        for (let nodo of this.gridCeldas) {
            let uiTransform = nodo.children[1].getComponent(UITransform);
            if (!uiTransform) continue; // Evita errores si el nodo no tiene UITransform

            let worldPos = nodo.worldPosition;
            let halfWidth = uiTransform.contentSize.width / 2; // Mitad del ancho
            let halfHeight = uiTransform.contentSize.height / 2; // Mitad de la altura

            if (
                localPos.x >= worldPos.x - halfWidth && localPos.x <= worldPos.x + halfWidth &&
                localPos.y >= worldPos.y - halfHeight && localPos.y <= worldPos.y + halfHeight
            ) {
                return nodo; // Devuelve el nodo tocado
            }
        }
        return null; // No se encontró un nodo
    
    }
    public resetGrid() {
        this.grid = Array.from({ length: this.columnas }, () => Array(this.columnas).fill(""));
    }
    
    private agregarCelda(nodo: Node) {
        if (!this.seleccion.some(n => n == nodo)) {
            this.seleccion.push(nodo);
            nodo.children[0].getComponent(Label).color = new Color(0, 0, 0,150); // Resaltar selección
        }
    }
    public verificaTodasPalabras(){
        let index = 0;
        for(let i = 0 ; i < this.boleanos.length; i++){
            if(this.boleanos[i]== true){
                index++;
                if(index >= this.boleanos.length){
                    console.log("YA GANASTE");
                    this.Reloj.gameOver = false;
                    this.Reloj.gana = true;
                    this.scheduleOnce(function(){
                        this.linea.EliminaNuevoNodos();
                    },1)
                    
                    
                }
                continue;
            }
            else{
                console.log("AUN FALTAN PALABRAS")
                this.Reloj.gameOver = true;
                break;
            }
        }
    }
    private elimnaSopa(){
        this.layout.destroyAllChildren();
    }
    reiniciaSopa() {
        this.indexsopa+=1
        this.Message.historial = [];
        this.Message.historial.push(this.arregloPalabras);
        this.Reloj.getComponent(Sprite).spriteFrame = this.Reloj.imagenescronometro[6];
       this.anim.getComponent(Animation).play("BG-Static");
       this.elimnaSopa();
        this.scheduleOnce(function(){
            
            this.Reloj.reinicia();
            this.columnas++;
            this.filas ++;
            this.boleanos = [false,false,false,false,false,false,false,false,false,false];
        if(this.columnas<7){
            this.columnas = 7;
            this.filas =7;
        }
        else if(this.columnas > 11){
            this.columnas = 11;
            this.filas =11;
        }
        this.CambioPrefab(this.columnas);
        this.area = this.columnas * this.columnas;
        this.grid = Array(this.columnas).fill(null).map(() => Array(this.columnas).fill(""));
        this.RellenaSopa(this.area, this.size);
        this.CambiaPadiing(this.padding);

        this.colocarPalabras();
        this.rellenarLetrasAleatorias();
        this.actualizarLabels();
        this.PalabrasLabel();
        //this.nodosPalabras.forEach(n=>n.getComponent(Sprite).spriteFrame = this.nodonoencontrado);
        this.nodosPalabras.forEach(n =>n.children[0].getComponent(Label).color = new Color(245,132,39));
        this.touchSatrt();
        
        
        },1);
        
        
    }
    private verificarPalabra(inicio : Node, final : Node) {
        console.log("Se selecciono algo?");
        let palabraSeleccionada = this.seleccion.map(n => n.children[0].getComponent(Label).string).join("");

        const index = this.nodosPalabras.findIndex(n => n.children[0].getComponent(Label).string == palabraSeleccionada);

        if (index !== -1) { // Si la palabra fue encontrada en la lista
            console.log("Cambia en pantalla la palabra encontrada");
            //this.nodosPalabras[index].getComponent(Sprite).spriteFrame = this.nodoEncontrado;
            this.nodosPalabras[index].children[0].getComponent(Label).color = new Color(200,200,200);
            this.boleanos[index] = true;
            //suma score
            
            this.verificaTodasPalabras();
        }    
        if (this.palabras.some(n => n == palabraSeleccionada)) {
            console.log(`✅ ¡Encontraste: ${palabraSeleccionada}!`);
            this.linea.creaLineaNueva(inicio,final);
            this.indexPalabras++;
            this.contadorPalabras.string = this.indexPalabras.toString();
            //this.seleccion.forEach(n => n.getComponent(Sprite).spriteFrame = this.imagenencontrada);
            this.seleccion.forEach(n => n.children[0].getComponent(Label).color = new Color(255, 255, 255));
             // Marcar como encontrada
             this.ScoreSuma(palabraSeleccionada);
             
        } else {
            console.log(`❌ No es una palabra válida: ${palabraSeleccionada}`);
            this.seleccion.forEach(n => n.children[0].getComponent(Label).color = new Color(255, 255, 255)); // Resetear color
        }

        this.seleccion = [];
    }
    
    private ScoreSuma(string : string){
       let puntaje = this.Reloj.index * string.length;
       

       //Crear array de cada sopa si no existe.
       if(!this.arregloPalabras[this.indexsopa]){
            this.arregloPalabras[this.indexsopa] = []
       }
       //Añade las palabras al array de la sopa
       this.arregloPalabras[this.indexsopa].push({"palabra": string,  "puntos": puntaje });

       //console.log("Los puntos por " + string + " es " + puntaje.toString())
       this.score += puntaje;
       this.labelpuntaje.string = this.score.toString();

    }


    
    public CambioPrefab(col : number){
        switch(col){
            case 7:
                this.size = 85;
                this.padding = 20;
                const palabrasFiltradas = this.todasLasPalabras.filter(palabra => palabra.length <= 5);
                this.palabras = [];
                while (this.palabras.length < 10 && palabrasFiltradas.length > 0) {
                    const indice = Math.floor(Math.random() * palabrasFiltradas.length);
                    this.palabras.push(palabrasFiltradas.splice(indice, 1)[0]); // Evita repeticiones
                }
                
                break;
            case 8: 
                this.size = 75;
                this.padding = 15;
                
                const palabrasFiltradas8 = this.todasLasPalabras.filter(palabra => palabra.length <= 8);
                this.palabras = [];
                while (this.palabras.length < 10 && palabrasFiltradas8.length > 0) {
                    const indice = Math.floor(Math.random() * palabrasFiltradas8.length);
                    this.palabras.push(palabrasFiltradas8.splice(indice, 1)[0]); // Evita repeticiones
                }
                break;
            case 9: 
                this.size = 65;
                this.padding = 20;
                
                const palabrasFiltradas9 = this.todasLasPalabras.filter(palabra => palabra.length <= 9);
                this.palabras = [];
                while (this.palabras.length < 10 && palabrasFiltradas9.length > 0) {
                    const indice = Math.floor(Math.random() * palabrasFiltradas9.length);
                    this.palabras.push(palabrasFiltradas9.splice(indice, 1)[0]); // Evita repeticiones
                }
                break;
            case 10 : 
                this.size = 60;
                this.padding = 15;
                const palabrasFiltradas10 = this.todasLasPalabras.filter(palabra => palabra.length <= 10);
                this.palabras = [];
                while (this.palabras.length < 10 && palabrasFiltradas10.length > 0) {
                    const indice = Math.floor(Math.random() * palabrasFiltradas10.length);
                    this.palabras.push(palabrasFiltradas10.splice(indice, 1)[0]); // Evita repeticiones
                }
                break;
            case 11:
                this.size = 55
                this.padding = 15;
                const palabrasFiltradas11 = this.todasLasPalabras.filter(palabra => palabra.length <= 11);
                this.palabras = [];
                while (this.palabras.length < 10 && palabrasFiltradas11.length > 0) {
                    const indice = Math.floor(Math.random() * palabrasFiltradas11.length);
                    this.palabras.push(palabrasFiltradas11.splice(indice, 1)[0]); // Evita repeticiones
                }
                break;
            
        }
        
    }
    public RellenaSopa(area : number, size : number ){
        this.anim.getComponent(Animation).play("BG-Move");
        this.gridCeldas.length = area;
        let index = 0;
        for (let fila = 0; fila < this.filas; fila++) {
            
            for (let columna = 0; columna < this.columnas; columna++) {
                const node1 = instantiate(this.cuadroPrefab);
                node1.setParent(this.layout);
                node1.getComponent(UITransform)!.setContentSize(size,size);
                node1.children[1].getComponent(UITransform)!.setContentSize(size-20,size-20);
                node1.name =(`cuadro${fila}_${columna}`);
                this.gridCeldas[index]= node1;
                index++;
               // console.log("cuadro igual a " + nodoCelda.name.toString());
               
            }
        }
        
        
    }
    public CambiaPadiing( pa : number){
        const pading = this.layout.getComponent(Layout);
        pading.paddingLeft = this.padding;
        pading.paddingTop = this.padding;
    }

    public colocarPalabras() {
        let intentosTotales = 0;
        let exito = false;
    
        while (!exito && intentosTotales < 500) {  // Máximo 50 intentos
            this.resetGrid();
            exito = true; 
    
            let palabrasRestantes = [...this.palabras];
    
            // Seleccionar dos palabras aleatorias para la diagonal
            let palabrasDiagonales: string[] = [];
    
            while (palabrasDiagonales.length < 2 && palabrasRestantes.length > 0) {
                let indice = Math.floor(Math.random() * palabrasRestantes.length);
                palabrasDiagonales.push(palabrasRestantes.splice(indice, 1)[0]);
            }
    
            let direccionesDiagonales = ["D1", "D2"];
    
            for (let i = 0; i < palabrasDiagonales.length; i++) { 
                let palabra = palabrasDiagonales[i];
                let colocada = false;
                let intentos = 0;
    
                while (!colocada && intentos < 100) {
                    const fila = Math.floor(Math.random() * this.filas);
                    const columna = Math.floor(Math.random() * this.columnas);
                    let direccion = direccionesDiagonales[i];
    
                    if (this.puedeColocarPalabra(palabra, fila, columna, direccion)) {
                        this.colocarPalabraEnGrid(palabra, fila, columna, direccion);
                        colocada = true;
                    }
                    intentos++;
                }
    
                if (!colocada) { 
                    exito = false;
                    break;
                }
            }
    
            // Colocar el resto de las palabras en H o V
            for (const palabra of palabrasRestantes) {
                let colocada = false;
                let intentos = 0;
                let direcciones = ["H", "V"];
    
                while (!colocada && intentos < 100) {
                    const fila = Math.floor(Math.random() * this.columnas);
                    const columna = Math.floor(Math.random() * this.columnas);
                    let direccion = direcciones[intentos % 2];
    
                    if (this.puedeColocarPalabra(palabra, fila, columna, direccion)) {
                        this.colocarPalabraEnGrid(palabra, fila, columna, direccion);
                        colocada = true;
                    }
                    intentos++;
                }
    
                if (!colocada) { 
                    exito = false;
                    break;
                }
            }
    
            intentosTotales++;
        }
    
        if (!exito){
            console.error("No se pudo generar una sopa de letras válida después de varios intentos.");
            console.log("Intenta de nuevo")
            this.colocarPalabras();
        } 
    }
    
    
    // Función para colocar una palabra en el grid
    private colocarPalabraEnGrid(palabra: string, fila: number, columna: number, direccion: string) {
        for (let i = 0; i < palabra.length; i++) {
            if (direccion === "H") this.grid[fila][columna + i] = palabra[i];
            else if (direccion === "V") this.grid[fila + i][columna] = palabra[i];
            else if (direccion === "D1") this.grid[fila + i][columna + i] = palabra[i];
            else if (direccion === "D2") this.grid[fila + i][columna - i] = palabra[i];
        }
    }
      
    
    public puedeColocarPalabra(palabra: string, fila: number, columna: number, direccion: string): boolean {
        const palabraLength = palabra.length;
    
        // Verifica que la palabra cabe dentro del grid
        if (direccion === "H" && (columna + palabraLength > this.columnas)) return false;
        if (direccion === "V" && (fila + palabraLength > this.filas)) return false;
        if (direccion === "D1" && (fila + palabraLength > this.filas || columna + palabraLength > this.columnas)) return false; // ↘️ Diagonal derecha-abajo
        if (direccion === "D2" && (fila + palabraLength > this.filas || columna - palabraLength < -1)) return false; // ↙️ Diagonal izquierda-abajo
    
        for (let i = 0; i < palabraLength; i++) {
            let targetFila = fila;
            let targetColumna = columna;
    
            if (direccion === "H") targetColumna += i;
            else if (direccion === "V") targetFila += i;
            else if (direccion === "D1") { targetFila += i; targetColumna += i; }
            else if (direccion === "D2") { targetFila += i; targetColumna -= i; }
    
            // Verifica que la celda no tenga una letra diferente
            if (this.grid[targetFila][targetColumna] !== "" && this.grid[targetFila][targetColumna] !== palabra[i]) {
                return false;
            }
        }
    
        return true;
    }
    
    
    
    public rellenarLetrasAleatorias() {
        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                if (this.grid[fila][columna] === "") {
                    this.grid[fila][columna] = this.letrasAleatorias[Math.floor(Math.random() * this.letrasAleatorias.length)];
                }
            }
        }
    }
    
    // 🔹 Ejecutamos la generación del grid
   
    
    // 🔹 Ahora actualizamos los Labels en la escena de Cocos
    public actualizarLabels() {
        for (let fila = 0; fila < this.columnas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                const nodoCelda : Node = this.layout.getChildByName(`cuadro${fila}_${columna}`);
               // console.log("cuadro igual a " + nodoCelda.name.toString());
                if (nodoCelda) {
                    const label = nodoCelda.getChildByName(`label`).getComponent(Label);
                    label.string = this.grid[fila][columna];
                }
                //console.log("Continua");
            }
        }
    }
    
    drawLineBetweenLetters() {
        if (!this.graphics || !this.startLetter || !this.endLetter) return;
        console.log("el nodo inicial es " + this.startLetter.toString() + " y el nodo final es igual a " + this.endLetter.toString())
        const startPos = this.getNodeWorldPosition(this.startLetter);
        const endPos = this.getNodeWorldPosition(this.endLetter);

        // Limpiar dibujo anterior
        this.graphics.clear();

        // Dibujar la línea
        this.graphics.moveTo(startPos.x, startPos.y);
        this.graphics.lineTo(endPos.x, endPos.y);
        this.graphics.fill;
        this.graphics.stroke();
    }
    getNodeWorldPosition(node: Node): Vec2 {
        console.log("Nodo es igual a " + node.name.toString());
        const uiTransform = node.getComponent(UITransform);
        const worldPos = uiTransform.convertToWorldSpaceAR(new Vec3(0, 0,0));
        return new Vec2(worldPos.x, worldPos.y);
    }

    update(deltaTime: number) {
        
    }
}


