import { _decorator, Component, Node, Prefab, instantiate, Vec3, UITransform, math, RigidBody2D, Vec2, Sprite, Color } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BallSpawner')
export class BallSpawner extends Component {
    @property(Prefab) ballPrefab!: Prefab;
    @property(Node) canvas!: Node;
    @property({ tooltip: 'Chance for golden ball (0.0 to 1.0)' })
    goldenBallChance: number = 0.05;
    @property({ tooltip: 'Initial spawn interval in seconds' })
    initialSpawnInterval: number = 2.0;
    @property({ tooltip: 'Minimum spawn interval (fastest speed)' })
    minSpawnInterval: number = 0.3;
    @property({ tooltip: 'How much to reduce interval every second' })
    speedIncreaseRate: number = 0.05;
    @property spawnHeight: number = 200;
    @property({ tooltip: 'Minimum downward force to apply' })
    minDownwardForce: number = 0;
    @property({ tooltip: 'Maximum downward force to apply' })
    maxDownwardForce: number = 50;

    private spawnTimer: number = 0;
    private gameTime: number = 0;
    private currentSpawnInterval: number = 2.0;

    start() {
        this.currentSpawnInterval = this.initialSpawnInterval;
    }

    update(deltaTime: number) {
        // Update game time
        this.gameTime += deltaTime;
        
        // Update spawn speed over time
        this.updateSpawnSpeed();
        
        // Update spawn timer
        this.spawnTimer += deltaTime;

        if (this.spawnTimer >= this.currentSpawnInterval) {
            this.spawnBall();
            this.spawnTimer = 0;
        }
    }

    private updateSpawnSpeed() {
        // Gradually decrease spawn interval (increase speed)
        const speedReduction = this.speedIncreaseRate * this.gameTime;
        this.currentSpawnInterval = Math.max(
            this.minSpawnInterval,
            this.initialSpawnInterval - speedReduction
        );
    }

    spawnBall(): void {
        if (!this.ballPrefab) {
            console.error('Ball prefab not assigned!');
            return;
        }

        const ball = instantiate(this.ballPrefab);
        const canvasTransform = this.canvas.getComponent(UITransform);
        const worldSize = canvasTransform?.contentSize || { width: 800, height: 600 };

        // Check if this should be a golden ball (5% chance)
        const isGoldenBall = Math.random() < this.goldenBallChance;
        
        if (isGoldenBall) {
            // Make it golden by tinting the sprite
            const sprite = ball.getComponent(Sprite);
            if (sprite) {
                sprite.color = new Color(255, 215, 0, 255); // Gold color
            }
            
            // Tag it as golden for the collision detection
            ball.name = 'GoldenBall';
            console.log('✨ GOLDEN BALL spawned!');
        }

        // Random X position within screen bounds (with padding)
        const padding = 50;
        const randomX = math.lerp(-worldSize.width / 2 + padding, worldSize.width / 2 - padding, Math.random());
        const spawnY = worldSize.height / 2 + this.spawnHeight; // Above screen

        ball.setPosition(new Vec3(randomX, spawnY, 0));
        this.canvas.addChild(ball);
        
        // Apply random downward force to vary fall speed
        const rigidBody = ball.getComponent(RigidBody2D);
        if (rigidBody) {
            const randomForce = math.lerp(this.minDownwardForce, this.maxDownwardForce, Math.random());
            // Apply downward velocity (negative Y direction)
            rigidBody.linearVelocity = new Vec2(0, -randomForce);
            console.log(`Ball spawned at: ${randomX}, ${spawnY} with downward force: ${randomForce}`);
        } else {
            console.log(`Ball spawned at: ${randomX}, ${spawnY} (no RigidBody2D found)`);
        }
    }
}