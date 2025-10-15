import { _decorator, Component, Node, Label, director, Input } from 'cc';
import { SceneRouter } from './SceneRouter';
const { ccclass, property } = _decorator;

@ccclass('FinalScoreCtrl')
export class FinalScoreCtrl extends Component {
    @property(Label) scoreLabel!: Label;
    @property(Node) btnVolver!: Node;
    @property(Node) btnSalir!: Node;
    @property(SceneRouter) sceneRouter!: SceneRouter;
    
    start() {
        // Listen for the final score event from BateosCtrl
        director.on('set-final-score', this.onSetFinalScore, this);
        
        // Check if there's a stored final score from the previous scene
        const storedScore = (globalThis as any).finalScore;
        if (storedScore !== undefined) {
            console.log(`🔄 Found stored final score: ${storedScore}`);
            this.displayScore(storedScore);
            // Clean up the global storage
            delete (globalThis as any).finalScore;
        } else {
            // Initialize with default text
            if (this.scoreLabel) {
                this.scoreLabel.string = '0';
            }
        }
        
        // Setup button event listeners
        this.setupButtons();
        
        console.log('🏆 FinalScoreCtrl initialized, waiting for score...');
    }

    onDestroy() {
        // Clean up event listener
        director.off('set-final-score', this.onSetFinalScore, this);
    }

    private onSetFinalScore(finalScore: number): void {
        console.log(`🏆 Final Score received via event: ${finalScore}`);
        this.displayScore(finalScore);

        window.parent.postMessage({ score: finalScore }, '*');

    }

    private displayScore(score: number): void {
        if (this.scoreLabel) {
            this.scoreLabel.string = score.toString();
            console.log(`📱 Score label updated to: ${score}`);
        } else {
            console.warn('⚠️ Score label not assigned to FinalScoreCtrl!');
        }
    }

    private setupButtons(): void {
        // Setup "Volver" sprite (return to splash screen)
        if (this.btnVolver) {
            this.btnVolver.on(Input.EventType.TOUCH_START, this.onVolverClick, this);
            console.log('🔄 Volver sprite event listener added');
        } else {
            console.warn('⚠️ btnVolver not assigned to FinalScoreCtrl!');
        }

        // Setup "Salir" sprite (exit game)
        if (this.btnSalir) {
            this.btnSalir.on(Input.EventType.TOUCH_START, this.onSalirClick, this);
            console.log('🚪 Salir sprite event listener added');
        } else {
            console.warn('⚠️ btnSalir not assigned to FinalScoreCtrl!');
        }
    }

    private async onVolverClick(): Promise<void> {
        console.log('🔄 Volver button clicked - returning to splash screen');
        
        // Send postMessage to parent
        if (window.parent) {
            window.parent.postMessage({ status: "reset" }, '*');
            console.log('📨 PostMessage sent to parent: {status:"reset"}');
        }
        
        // Navigate to splash scene
        if (this.sceneRouter) {
            await this.sceneRouter.go('0-splash');
        } else {
            console.warn('⚠️ SceneRouter not assigned! Using direct scene load.');
            director.loadScene('0-splash');
        }
    }

    private onSalirClick(): void {
        console.log('🚪 Salir button clicked - exiting game');
        
        // Send postMessage to parent
        if (window.parent) {
            window.parent.postMessage({ state: "exit" }, '*');
            console.log('📨 PostMessage sent to parent: {state:"exit"}');
        }
    }

    update(deltaTime: number) {
        
    }
}

