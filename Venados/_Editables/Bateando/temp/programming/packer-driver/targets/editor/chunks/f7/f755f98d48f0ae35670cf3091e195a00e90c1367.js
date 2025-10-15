System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, director, SceneRouter, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, BateosCtrl;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfSceneRouter(extras) {
    _reporterNs.report("SceneRouter", "./SceneRouter", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Label = _cc.Label;
      director = _cc.director;
    }, function (_unresolved_2) {
      SceneRouter = _unresolved_2.SceneRouter;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "75749kZuKZPmr8T9AAesQU4", "BateosCtrl", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Label', 'director']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BateosCtrl", BateosCtrl = (_dec = ccclass('BateosCtrl'), _dec2 = property(Label), _dec3 = property(_crd && SceneRouter === void 0 ? (_reportPossibleCrUseOfSceneRouter({
        error: Error()
      }), SceneRouter) : SceneRouter), _dec(_class = (_class2 = class BateosCtrl extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "bateosLabel", _descriptor, this);

          _initializerDefineProperty(this, "sceneRouter", _descriptor2, this);

          this.currentBateos = 100;
          this.currentScore = 0;
        }

        start() {
          // Initialize bateos display
          this.updateBateosDisplay(); // Listen to score and bateos events

          director.on('add-bateo', this.onAddScore, this);
          director.on('subtract-bateo', this.onSubtractScore, this); // Listen to score events to track current score for game over

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

        onAddScore(points) {
          // Add points to bateos (positive events increase bateos)
          this.currentBateos += points;
          this.updateBateosDisplay(); //console.log(`🎯 Bateos increased by ${points}. Current: ${this.currentBateos}`);
        }

        onSubtractScore(points) {
          // Subtract points from bateos (negative events decrease bateos)
          this.currentBateos -= points; // Prevent going below 0

          if (this.currentBateos <= 0) {
            this.currentBateos = 0;
            this.updateBateosDisplay();
            this.triggerGameOver();
          } else {
            this.updateBateosDisplay();
          } //console.log(`💥 Bateos decreased by ${points}. Current: ${this.currentBateos}`);

        }

        onScoreAdd(points) {
          this.currentScore += points; //console.log(`📈 Score increased by ${points}. Current score: ${this.currentScore}`);
        }

        onScoreSubtract(points) {
          this.currentScore -= points;
          if (this.currentScore < 0) this.currentScore = 0; // Prevent negative score

          console.log(`📉 Score decreased by ${points}. Current score: ${this.currentScore}`);
        }

        updateBateosDisplay() {
          if (this.bateosLabel) {
            this.bateosLabel.string = this.currentBateos.toString();
          }
        }

        async triggerGameOver() {
          //console.log('🎮 GAME OVER! Bateos reached 0');
          //console.log(`Final Score: ${this.currentScore}`);
          // Store the final score globally so it persists across scenes
          globalThis.finalScore = this.currentScore; //console.log(`💾 Stored final score globally: ${this.currentScore}`);
          // Also emit the event (in case the scene is already loaded)

          director.emit('set-final-score', this.currentScore); // Navigate to game over scene

          if (this.sceneRouter) {
            await this.sceneRouter.go('30-gameover');
          } else {
            console.warn('⚠️ SceneRouter not assigned! Cannot navigate to game over scene.'); // Fallback: direct scene load

            director.loadScene('30-gameover');
          }
        }

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bateosLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sceneRouter", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f755f98d48f0ae35670cf3091e195a00e90c1367.js.map