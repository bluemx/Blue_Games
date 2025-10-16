System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Contact2DType, Collider2D, director, sys, Label, BallController, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, Tag, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfBallController(extras) {
    _reporterNs.report("BallController", "./BallCtrl", _context.meta, extras);
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
      Contact2DType = _cc.Contact2DType;
      Collider2D = _cc.Collider2D;
      director = _cc.director;
      sys = _cc.sys;
      Label = _cc.Label;
    }, function (_unresolved_2) {
      BallController = _unresolved_2.BallController;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ebeeeZtNrpCDqwb9o9/6XsD", "GameManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Contact2DType', 'Collider2D', 'IPhysics2DContact', 'director', 'sys', 'Label']);

      ({
        ccclass,
        property
      } = _decorator);

      Tag = /*#__PURE__*/function (Tag) {
        Tag[Tag["BALL"] = 1] = "BALL";
        Tag[Tag["CATCHER"] = 2] = "CATCHER";
        Tag[Tag["BAT"] = 3] = "BAT";
        Tag[Tag["BOUNDS"] = 4] = "BOUNDS";
        return Tag;
      }(Tag || {});

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property(_crd && BallController === void 0 ? (_reportPossibleCrUseOfBallController({
        error: Error()
      }), BallController) : BallController), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property([Node]), _dec6 = property(Label), _dec7 = property(Label), _dec(_class = (_class2 = class GameManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "ball", _descriptor, this);

          _initializerDefineProperty(this, "catcherZone", _descriptor2, this);

          // CircleCollider2D (Sensor)  Tag: CATCHER
          _initializerDefineProperty(this, "batSwing", _descriptor3, this);

          // BoxCollider2D (Sensor)    Tag: BAT
          _initializerDefineProperty(this, "boundsSensors", _descriptor4, this);

          // Top/Left/Right (Sensor) Tag: BOUNDS
          // UI Elements (optional)
          _initializerDefineProperty(this, "scoreLabel", _descriptor5, this);

          _initializerDefineProperty(this, "hitsLabel", _descriptor6, this);

          this.score = 0;
          this.batterHits = 0;
          this.maxHits = 3;
        }

        start() {
          // Asegura tags en tus colliders desde el Editor:
          // Ball CircleCollider2D -> tag = Tag.BALL
          // Catcher -> tag = Tag.CATCHER
          // Bat -> tag = Tag.BAT
          // Bounds -> tag = Tag.BOUNDS
          // Safety checks for required components
          if (!this.ball) {
            //console.error('BallController not assigned to GameManager');
            return;
          }

          if (!this.catcherZone) {
            //console.error('CatcherZone not assigned to GameManager');
            return;
          }

          if (!this.batSwing) {
            //console.error('BatSwing not assigned to GameManager');
            return;
          }

          var all = [this.catcherZone, this.batSwing, ...this.boundsSensors];
          all.forEach((n, index) => {
            if (!n) {
              //console.error(`Node at index ${index} is null in GameManager`);
              return;
            }

            var col = n.getComponent(Collider2D);

            if (col) {
              col.on(Contact2DType.BEGIN_CONTACT, this.onBegin, this);
            } else {
              console.warn("Collider2D component not found on node: " + n.name);
            }
          }); // Initialize UI

          this.updateUI();
        }

        updateUI() {
          if (this.scoreLabel) {
            this.scoreLabel.string = "Score: " + this.score;
          }

          if (this.hitsLabel) {
            this.hitsLabel.string = "Hits: " + this.batterHits + "/" + this.maxHits;
          }
        }

        onBegin(self, other, _contact) {
          // Safety checks
          if (!self || !other || !this.ball) {
            console.error('Invalid colliders or missing ball reference');
            return;
          }

          var a = self.tag,
              b = other.tag;

          var isBallVs = tag => a === Tag.BALL && b === tag || b === Tag.BALL && a === tag;

          if (isBallVs(Tag.CATCHER)) {
            // punto a favor del pitcher
            this.score += 1; //console.log(`Score increased: ${this.score}`);

            this.updateUI();
            this.ball.resetBall();
            return;
          }

          if (isBallVs(Tag.BAT)) {
            // el bateador conectó
            this.batterHits += 1; //console.log(`Batter hits: ${this.batterHits}`);

            this.updateUI();
            this.ball.resetBall();

            if (this.batterHits >= this.maxHits) {
              // fin del juego
              try {
                // persistimos score en localStorage para leerlo en GameOver
                sys.localStorage.setItem('lastScore', String(this.score));
                director.loadScene('GameOver');
              } catch (error) {
                console.error('Error loading GameOver scene:', error);
              }
            }

            return;
          }

          if (isBallVs(Tag.BOUNDS)) {
            // balón se fue por bordes/superior → resetea
            //console.log('Ball hit bounds, resetting...');
            this.ball.resetBall();
            return;
          }
        } // Cleanup method


        onDestroy() {
          var all = [this.catcherZone, this.batSwing, ...this.boundsSensors];
          all.forEach(n => {
            if (n) {
              var col = n.getComponent(Collider2D);

              if (col) {
                col.off(Contact2DType.BEGIN_CONTACT, this.onBegin, this);
              }
            }
          });
        } // Public getters for HUD or other systems


        getScore() {
          return this.score;
        }

        getHits() {
          return this.batterHits;
        }

        getMaxHits() {
          return this.maxHits;
        }

        getRemainingHits() {
          return Math.max(0, this.maxHits - this.batterHits);
        } // Reset game state (useful for restarting)


        resetGame() {
          this.score = 0;
          this.batterHits = 0;
          this.updateUI();

          if (this.ball) {
            this.ball.resetBall();
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ball", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "catcherZone", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "batSwing", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "boundsSensors", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "scoreLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "hitsLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=27c58e4372eed3e5fac33f285a27faef33fc3fb1.js.map