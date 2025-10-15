System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Input, Animation, director, _dec, _class, _crd, ccclass, property, PlayerAnimationCtrl;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Input = _cc.Input;
      Animation = _cc.Animation;
      director = _cc.director;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8b276T815dLkYNnOuviyn7p", "PlayerAnimationCtrl", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Input', 'EventTouch', 'Animation', 'director']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PlayerAnimationCtrl", PlayerAnimationCtrl = (_dec = ccclass('PlayerAnimationCtrl'), _dec(_class = class PlayerAnimationCtrl extends Component {
        constructor() {
          super(...arguments);
          this.animation = null;
          this.canTouch = true;
        }

        onLoad() {
          this.animation = this.getComponent(Animation);
        }

        onEnable() {
          this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
          this.animation.on(Animation.EventType.FINISHED, this.onAnimationFinished, this);
        }

        onDisable() {
          this.node.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
          this.animation.off(Animation.EventType.FINISHED, this.onAnimationFinished, this);
        }

        onTouchStart(event) {
          if (this.canTouch) {
            this.animation.play();
            director.emit('subtract-bateo', 1);
          }
        }

        onAnimationFinished() {
          // Get the animation state and reset to first frame
          var clips = this.animation.clips;

          if (clips && clips.length > 0) {
            var clipName = clips[0].name;
            var state = this.animation.getState(clipName);

            if (state) {
              state.time = 0;
              state.sample();
            }
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=939cd88820a259ae08c27d1e5600de6bcd9aecac.js.map