import { _decorator, Component, Node, Label, director } from 'cc';
import { SceneRouter } from './SceneRouter';
const { ccclass, property } = _decorator;

@ccclass('BateosCtrl')
export class BateosCtrl extends Component {
    @property(Label) bateosLabel!: Label;
    @property(SceneRouter) sceneRouter!: SceneRouter;
    
    private currentBateos: number = 100;
    private currentScore: number = 0;

    start() {
        // Initialize bateos display
        this.updateBateosDisplay();
        
        // Listen to score and bateos events
        director.on('add-bateo', this.onAddScore, this);
        director.on('subtract-bateo', this.onSubtractScore, this);
        
        // Listen to score events to track current score for game over
        director.on('add-score', this.onScoreAdd, this);
        director.on('subtract-score', this.onScoreSubtract, this);
    }

    onDestroy() {
        // Clean up event listeners
        director.off('add-bateo', this.onAddScore, this);
        director.off('subtract-bateo', this.onSubtractScore, this);
        director.off('add-score', this.onScoreAdd, this);
        director.off('subtract-score', this.onScoreSubtract, this);
    }

    private onAddScore(points: number): void {
        // Add points to bateos (positive events increase bateos)
        this.currentBateos += points;
        this.updateBateosDisplay();
        //console.log(`🎯 Bateos increased by ${points}. Current: ${this.currentBateos}`);
    }

    private onSubtractScore(points: number): void {
        // Subtract points from bateos (negative events decrease bateos)
        this.currentBateos -= points;
        
        // Prevent going below 0
        if (this.currentBateos <= 0) {
            this.currentBateos = 0;
            this.updateBateosDisplay();
            this.triggerGameOver();
        } else {
            this.updateBateosDisplay();
        }
        
        //console.log(`💥 Bateos decreased by ${points}. Current: ${this.currentBateos}`);
    }

    private onScoreAdd(points: number): void {
        this.currentScore += points;
        console.log(`📈 Score increased by ${points}. Current score: ${this.currentScore}`);
    }

    private onScoreSubtract(points: number): void {
        this.currentScore -= points;
        if (this.currentScore < 0) this.currentScore = 0; // Prevent negative score
        console.log(`📉 Score decreased by ${points}. Current score: ${this.currentScore}`);
    }

    private updateBateosDisplay(): void {
        if (this.bateosLabel) {
            this.bateosLabel.string = this.currentBateos.toString();
        }
    }

    private async triggerGameOver(): Promise<void> {
        console.log('🎮 GAME OVER! Bateos reached 0');
        console.log(`Final Score: ${this.currentScore}`);
        
        // Store the final score globally so it persists across scenes
        (globalThis as any).finalScore = this.currentScore;
        console.log(`💾 Stored final score globally: ${this.currentScore}`);
        
        // Also emit the event (in case the scene is already loaded)
        director.emit('set-final-score', this.currentScore);
        
        // Navigate to game over scene
        if (this.sceneRouter) {
            await this.sceneRouter.go('30-gameover');
        } else {
            console.warn('⚠️ SceneRouter not assigned! Cannot navigate to game over scene.');
            // Fallback: direct scene load
            director.loadScene('30-gameover');
        }
    }

    update(deltaTime: number) {
        
    }
}

