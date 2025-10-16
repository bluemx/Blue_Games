System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, math, Vec3, UITransform, BallController, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, BatterAI;

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
      math = _cc.math;
      Vec3 = _cc.Vec3;
      UITransform = _cc.UITransform;
    }, function (_unresolved_2) {
      BallController = _unresolved_2.BallController;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "727b7ZfSQ1GSpovbZig1FS+", "BatterAi", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'math', 'Vec3', 'UITransform']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BatterAI", BatterAI = (_dec = ccclass('BatterAI'), _dec2 = property(Node), _dec3 = property(_crd && BallController === void 0 ? (_reportPossibleCrUseOfBallController({
        error: Error()
      }), BallController) : BallController), _dec4 = property(Node), _dec5 = property({
        tooltip: 'cada cuántos seg. intenta swing (rango min-max)'
      }), _dec6 = property({
        tooltip: 'duración visible del swing en seg.'
      }), _dec(_class = (_class2 = class BatterAI extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "batSwing", _descriptor, this);

          // BoxCollider2D sensor
          _initializerDefineProperty(this, "ball", _descriptor2, this);

          _initializerDefineProperty(this, "strikeZone", _descriptor3, this);

          // un Node referencia (rect) donde puede aparecer el bat
          _initializerDefineProperty(this, "swingIntervalRange", _descriptor4, this);

          _initializerDefineProperty(this, "swingDuration", _descriptor5, this);

          this.timer = 0;
          this.nextSwingAt = 0.5;
          this.swingTimeoutId = null;
        }

        start() {
          // Use setTimeout as fallback due to TypeScript config issues
          setTimeout(() => this.planNext(), 100);

          if (this.batSwing) {
            this.batSwing.active = false;
          }
        }

        update(dt) {
          // Safety check for ball reference
          if (!this.ball || this.ball.isIdle()) return;
          this.timer += dt;

          if (this.timer >= this.nextSwingAt) {
            this.doSwingOnce();
            this.planNext();
          }
        }

        planNext() {
          this.timer = 0;
          var r = this.swingIntervalRange;
          this.nextSwingAt = math.randomRange(r.x, r.y);
        }

        doSwingOnce() {
          // Safety checks
          if (!this.strikeZone || !this.batSwing) {
            console.error('Missing required components: strikeZone or batSwing');
            return;
          } // posicion aleatoria dentro del rect del strikeZone


          var t = this.strikeZone.getComponent(UITransform);

          if (!t) {
            console.error('UITransform component not found on strikeZone');
            return;
          }

          var w = t.width * 0.4; // más estrecho que el rect total

          var h = t.height * 0.4;
          var rx = math.randomRange(-w / 2, w / 2);
          var ry = math.randomRange(-h / 2, h / 2);
          this.batSwing.setPosition(new Vec3(rx, ry, 0));
          this.batSwing.active = true; // Clear any previous timeout

          if (this.swingTimeoutId) {
            clearTimeout(this.swingTimeoutId);
          } // Schedule swing to hide after duration


          this.swingTimeoutId = setTimeout(() => this.hideSwing(), this.swingDuration * 1000);
        }

        hideSwing() {
          if (this.batSwing) {
            this.batSwing.active = false;
          }

          this.swingTimeoutId = null;
        }

        onDestroy() {
          // Clean up any scheduled callbacks
          if (this.swingTimeoutId) {
            clearTimeout(this.swingTimeoutId);
            this.swingTimeoutId = null;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "batSwing", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ball", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "strikeZone", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "swingIntervalRange", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new math.Vec2(0.45, 0.9);
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "swingDuration", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.12;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=086bf7a62f19f298540f3e272f327267d07fc7f0.js.map