import { _decorator, CCString, Component, director, SceneAsset, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CambioEscena')
export class CambioEscena extends Component 
{
    @property(CCString)
    public escena: String="";

    onLoad()
    {
        this.Cambio();
    }


    Cambio()
    {
        var progress=0;
        director.preloadScene(this.escena.toString(), (completedCount: number, totalCount: number, item: any) => {
        progress = completedCount / totalCount;
        }, (error: Error, asset: SceneAsset) => {
        //do something after preloaded scene
        console.log("Cargando...");
        });
    }

    Carga()
    {
        director.loadScene(this.escena.toString());
    }
}


