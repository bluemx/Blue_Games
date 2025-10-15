System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Label, director, Input, SceneRouter, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, FinalScoreCtrl;

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
      Node = _cc.Node;
      Label = _cc.Label;
      director = _cc.director;
      Input = _cc.Input;
    }, function (_unresolved_2) {
      SceneRouter = _unresolved_2.SceneRouter;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1d49dG7El9HepJnLQ+SEmmF", "FinalScoreCtrl", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Label', 'director', 'Input']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("FinalScoreCtrl", FinalScoreCtrl = (_dec = ccclass('FinalScoreCtrl'), _dec2 = property(Label), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(_crd && SceneRouter === void 0 ? (_reportPossibleCrUseOfSceneRouter({
        error: Error()
      }), SceneRouter) : SceneRouter), _dec(_class = (_class2 = class FinalScoreCtrl extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "scoreLabel", _descriptor, this);

          _initializerDefineProperty(this, "btnVolver", _descriptor2, this);

          _initializerDefineProperty(this, "btnSalir", _descriptor3, this);

          _initializerDefineProperty(this, "sceneRouter", _descriptor4, this);
        }

        start() {
          // Listen for the final score event from BateosCtrl
          director.on('set-final-score', this.onSetFinalScore, this); // Check if there's a stored final score from the previous scene

          const storedScore = globalThis.finalScore;

          if (storedScore !== undefined) {
            console.log(`🔄 Found stored final score: ${storedScore}`);
            this.displayScore(storedScore); // Clean up the global storage

            delete globalThis.finalScore;
          } else {
            // Initialize with default text
            if (this.scoreLabel) {
              this.scoreLabel.string = '0';
            }
          } // Setup button event listeners


          this.setupButtons();
          console.log('🏆 FinalScoreCtrl initialized, waiting for score...');
        }

        onDestroy() {
          // Clean up event listener
          director.off('set-final-score', this.onSetFinalScore, this);
        }

        onSetFinalScore(finalScore) {
          console.log(`🏆 Final Score received via event: ${finalScore}`);
          this.displayScore(finalScore);
          window.parent.postMessage({
            score: finalScore
          }, '*');
        }

        displayScore(score) {
          if (this.scoreLabel) {
            this.scoreLabel.string = score.toString();
            console.log(`📱 Score label updated to: ${score}`);
          } else {
            console.warn('⚠️ Score label not assigned to FinalScoreCtrl!');
          }
        }

        setupButtons() {
          // Setup "Volver" sprite (return to splash screen)
          if (this.btnVolver) {
            this.btnVolver.on(Input.EventType.TOUCH_START, this.onVolverClick, this);
            console.log('🔄 Volver sprite event listener added');
          } else {
            console.warn('⚠️ btnVolver not assigned to FinalScoreCtrl!');
          } // Setup "Salir" sprite (exit game)


          if (this.btnSalir) {
            this.btnSalir.on(Input.EventType.TOUCH_START, this.onSalirClick, this);
            console.log('🚪 Salir sprite event listener added');
          } else {
            console.warn('⚠️ btnSalir not assigned to FinalScoreCtrl!');
          }
        }

        async onVolverClick() {
          console.log('🔄 Volver button clicked - returning to splash screen'); // Send postMessage to parent

          if (window.parent) {
            window.parent.postMessage({
              status: "reset"
            }, '*');
            console.log('📨 PostMessage sent to parent: {status:"reset"}');
          } // Navigate to splash scene


          if (this.sceneRouter) {
            await this.sceneRouter.go('0-splash');
          } else {
            console.warn('⚠️ SceneRouter not assigned! Using direct scene load.');
            director.loadScene('0-splash');
          }
        }

        onSalirClick() {
          console.log('🚪 Salir button clicked - exiting game'); // Send postMessage to parent

          if (window.parent) {
            window.parent.postMessage({
              state: "exit"
            }, '*');
            console.log('📨 PostMessage sent to parent: {state:"exit"}');
          }
        }

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scoreLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "btnVolver", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "btnSalir", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sceneRouter", [_dec5], {
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
//# sourceMappingURL=5212d8ef04906a4532cff6438cc23d4a214e06e3.js.map