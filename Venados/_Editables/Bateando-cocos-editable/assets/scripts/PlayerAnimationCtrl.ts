import { _decorator, Component, Input, EventTouch, Animation, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerAnimationCtrl')
export class PlayerAnimationCtrl extends Component {
    private animation: Animation = null!;
    private canTouch: boolean = true;

    onLoad() {
        this.animation = this.getComponent(Animation)!;
    }

    onEnable() {
        this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        this.animation.on(Animation.EventType.FINISHED, this.onAnimationFinished, this);
    }

    onDisable() {
        this.node.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        this.animation.off(Animation.EventType.FINISHED, this.onAnimationFinished, this);
    }

    private onTouchStart(event: EventTouch) {
        if (this.canTouch) {
            this.animation.play();
            director.emit('subtract-bateo', 1);
        }
    }

    private onAnimationFinished() {
        // Get the animation state and reset to first frame
        const clips = this.animation.clips;
        if (clips && clips.length > 0) {
            const clipName = clips[0].name;
            const state = this.animation.getState(clipName);
            if (state) {
                state.time = 0;
                state.sample();
            }
        }
        
    }
}