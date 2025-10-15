import { _decorator, Component, Node, Vec3, tween, Label, Color } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MiniLabelCtrl')
export class MiniLabelCtrl extends Component {
    @property({ tooltip: 'Animation duration in seconds' })
    animationDuration: number = 1.0;
    
    @property({ tooltip: 'Target scale for the animation' })
    targetScale: number = 1.2;

    start() {
        this.playAnimation();
        const randomRotationZ = (Math.random() - 0.5) * 100; // Range: -20 to +20
        this.node.eulerAngles = new Vec3(0, 0, randomRotationZ);
    }

    setText(text: string): void {
        const label = this.getComponent(Label);
        if (label) {
            label.string = text;
        }
    }

    setColor(colorName: string): void {
        const label = this.getComponent(Label);
        if (label) {
            if (colorName === 'green') {
                label.color = new Color(0, 255, 0, 255); // Green
            } else if (colorName === 'red') {
                label.color = new Color(255, 0, 0, 255); // Red
            } else if (colorName === 'gold') {
                label.color = new Color(255, 215, 0, 255); // Gold
            } else if (colorName === 'darkred') {
                label.color = new Color(139, 0, 0, 255); // Dark Red
            }
        }
    }

    playAnimation(): void {

        // Scale up animation
        tween(this.node)
            .to(this.animationDuration * 0.3, { 
                scale: new Vec3(this.targetScale, this.targetScale, 1) 
            })
            .to(this.animationDuration * 0.3, { 
                scale: new Vec3(0, 0, 1) 
            })
            .call(() => {
                // Destroy the node after animation completes
                this.node.destroy();
            })
            .start();
    }

    update(deltaTime: number) {
        
    }
}

