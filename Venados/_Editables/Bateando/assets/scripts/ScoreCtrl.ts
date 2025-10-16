import { _decorator, Component, Label, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreCtrl')
export class ScoreCtrl extends Component {
    @property(Label) scoreLabel!: Label;
    @property({ tooltip: 'Animation speed - points added per step' })
    animationStep: number = 2;
    @property({ tooltip: 'Time between animation steps in milliseconds' })
    animationDelay: number = 50;
    
    private currentScore: number = 0;
    private displayedScore: number = 0;
    private targetScore: number = 0;
    private animationTimer: any = null;

    start() {
        // Listen for score events from balls
        director.on('add-score', this.onAddScore, this);
        director.on('subtract-score', this.onSubtractScore, this);
        
        // Initialize score display
        this.updateScoreDisplay();
        
        //console.log('🎯 ScoreCtrl started - listening for add-score and subtract-score events');
    }

    onDestroy() {
        // Clean up event listeners and animation
        director.off('add-score', this.onAddScore, this);
        director.off('subtract-score', this.onSubtractScore, this);
        this.stopScoreAnimation();
    }

    private onAddScore(points: number) {
        this.currentScore += points;
        this.targetScore = this.currentScore;
        
        // Start animated counting
        this.startScoreAnimation();
        
        //console.log(`🎉 Score will animate UP from ${this.displayedScore} to ${this.currentScore}!`);
    }

    private onSubtractScore(points: number) {
        this.currentScore = Math.max(0, this.currentScore - points); // Prevent negative scores
        this.targetScore = this.currentScore;
        
        // Start animated counting
        this.startScoreAnimation();
        
        //console.log(`💔 Score will animate DOWN from ${this.displayedScore} to ${this.currentScore}!`);
    }

    private startScoreAnimation() {
        // Clear any existing animation
        this.stopScoreAnimation();
        
        // Start the animation loop
        this.animateScoreStep();
    }

    private animateScoreStep() {
        if (this.displayedScore !== this.targetScore) {
            if (this.displayedScore < this.targetScore) {
                // Animate UP - increase displayed score
                this.displayedScore = Math.min(
                    this.displayedScore + this.animationStep, 
                    this.targetScore
                );
            } else {
                // Animate DOWN - decrease displayed score  
                this.displayedScore = Math.max(
                    this.displayedScore - this.animationStep, 
                    this.targetScore
                );
            }
            
            // Update the display
            this.updateScoreDisplay();
            
            // Schedule next step if not finished
            if (this.displayedScore !== this.targetScore) {
                this.animationTimer = setTimeout(() => {
                    this.animateScoreStep();
                }, this.animationDelay);
            } else {
                //console.log(`✨ Score animation completed! Final score: ${this.displayedScore}`);
            }
        }
    }

    private stopScoreAnimation() {
        if (this.animationTimer) {
            clearTimeout(this.animationTimer);
            this.animationTimer = null;
        }
    }

    private updateScoreDisplay() {
        if (this.scoreLabel) {
            this.scoreLabel.string = `${this.displayedScore}`;
        }
    }

    // Public methods for external access
    public getScore(): number {
        return this.currentScore;
    }

    public resetScore(): void {
        this.stopScoreAnimation();
        this.currentScore = 0;
        this.displayedScore = 0;
        this.targetScore = 0;
        this.updateScoreDisplay();
        //console.log('🔄 Score reset to 0');
    }

    public addScore(points: number): void {
        this.onAddScore(points);
    }

    public subtractScore(points: number): void {
        this.onSubtractScore(points);
    }
}

