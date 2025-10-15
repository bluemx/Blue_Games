System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, director, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, ScoreCtrl;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Label = _cc.Label;
      director = _cc.director;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "62cc94fDKtAIZVm9j4WTPjA", "ScoreCtrl", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Label', 'director']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ScoreCtrl", ScoreCtrl = (_dec = ccclass('ScoreCtrl'), _dec2 = property(Label), _dec3 = property({
        tooltip: 'Animation speed - points added per step'
      }), _dec4 = property({
        tooltip: 'Time between animation steps in milliseconds'
      }), _dec(_class = (_class2 = class ScoreCtrl extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "scoreLabel", _descriptor, this);

          _initializerDefineProperty(this, "animationStep", _descriptor2, this);

          _initializerDefineProperty(this, "animationDelay", _descriptor3, this);

          this.currentScore = 0;
          this.displayedScore = 0;
          this.targetScore = 0;
          this.animationTimer = null;
        }

        start() {
          // Listen for score events from balls
          director.on('add-score', this.onAddScore, this);
          director.on('subtract-score', this.onSubtractScore, this); // Initialize score display

          this.updateScoreDisplay();
          console.log('🎯 ScoreCtrl started - listening for add-score and subtract-score events');
        }

        onDestroy() {
          // Clean up event listeners and animation
          director.off('add-score', this.onAddScore, this);
          director.off('subtract-score', this.onSubtractScore, this);
          this.stopScoreAnimation();
        }

        onAddScore(points) {
          this.currentScore += points;
          this.targetScore = this.currentScore; // Start animated counting

          this.startScoreAnimation();
          console.log("\uD83C\uDF89 Score will animate UP from " + this.displayedScore + " to " + this.currentScore + "!");
        }

        onSubtractScore(points) {
          this.currentScore = Math.max(0, this.currentScore - points); // Prevent negative scores

          this.targetScore = this.currentScore; // Start animated counting

          this.startScoreAnimation();
          console.log("\uD83D\uDC94 Score will animate DOWN from " + this.displayedScore + " to " + this.currentScore + "!");
        }

        startScoreAnimation() {
          // Clear any existing animation
          this.stopScoreAnimation(); // Start the animation loop

          this.animateScoreStep();
        }

        animateScoreStep() {
          if (this.displayedScore !== this.targetScore) {
            if (this.displayedScore < this.targetScore) {
              // Animate UP - increase displayed score
              this.displayedScore = Math.min(this.displayedScore + this.animationStep, this.targetScore);
            } else {
              // Animate DOWN - decrease displayed score  
              this.displayedScore = Math.max(this.displayedScore - this.animationStep, this.targetScore);
            } // Update the display


            this.updateScoreDisplay(); // Schedule next step if not finished

            if (this.displayedScore !== this.targetScore) {
              this.animationTimer = setTimeout(() => {
                this.animateScoreStep();
              }, this.animationDelay);
            } else {
              console.log("\u2728 Score animation completed! Final score: " + this.displayedScore);
            }
          }
        }

        stopScoreAnimation() {
          if (this.animationTimer) {
            clearTimeout(this.animationTimer);
            this.animationTimer = null;
          }
        }

        updateScoreDisplay() {
          if (this.scoreLabel) {
            this.scoreLabel.string = "" + this.displayedScore;
          }
        } // Public methods for external access


        getScore() {
          return this.currentScore;
        }

        resetScore() {
          this.stopScoreAnimation();
          this.currentScore = 0;
          this.displayedScore = 0;
          this.targetScore = 0;
          this.updateScoreDisplay();
          console.log('🔄 Score reset to 0');
        }

        addScore(points) {
          this.onAddScore(points);
        }

        subtractScore(points) {
          this.onSubtractScore(points);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scoreLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "animationStep", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "animationDelay", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 50;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d4c2743339c57c85fda2abfc8d46921866a51cdd.js.map