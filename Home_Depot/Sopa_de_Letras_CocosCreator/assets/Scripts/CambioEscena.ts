import { _decorator, Component, director, SceneAsset, CCString } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CambioEscena')
export class CambioEscena extends Component {
    @property(CCString)
    public name2 : String = "";
    onLoad() {
        // Agrega un evento de clic al botón
       
       
    }

    //cc.director.preloadScene("table", function () {
    //    cc.log("Next scene preloaded");
    //});
    cambio() {
        // Cambia a la nueva escena ("GameScene" en este ejemplo)
        //director.preloadScene(this.name2.toString());
       /* director.preloadScene(this.name2.toString(), function() {
            console.log("Next scene preloaded");
            director.loadScene(this.name2.toString());
        });*/
var progress = 0;
       director.preloadScene(this.name2.toString(), (completedCount: number, totalCount: number, item: any) => {
        progress = completedCount / totalCount;
    }, (error: Error, asset: SceneAsset) => {
        //do something after preloaded scene
        director.loadScene(this.name2.toString());
    });
       
    }
}


