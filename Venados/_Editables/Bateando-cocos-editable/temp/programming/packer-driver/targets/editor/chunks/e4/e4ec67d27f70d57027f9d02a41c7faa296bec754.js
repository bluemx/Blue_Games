System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, tween, Label, Color, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, MiniLabelCtrl;

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
      Vec3 = _cc.Vec3;
      tween = _cc.tween;
      Label = _cc.Label;
      Color = _cc.Color;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "78d31q5ptlAmIT70YkgRTYS", "MiniLabelCtrl", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'tween', 'Label', 'Color']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("MiniLabelCtrl", MiniLabelCtrl = (_dec = ccclass('MiniLabelCtrl'), _dec2 = property({
        tooltip: 'Animation duration in seconds'
      }), _dec3 = property({
        tooltip: 'Target scale for the animation'
      }), _dec(_class = (_class2 = class MiniLabelCtrl extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "animationDuration", _descriptor, this);

          _initializerDefineProperty(this, "targetScale", _descriptor2, this);
        }

        start() {
          this.playAnimation();
          const randomRotationZ = (Math.random() - 0.5) * 100; // Range: -20 to +20

          this.node.eulerAngles = new Vec3(0, 0, randomRotationZ);
        }

        setText(text) {
          const label = this.getComponent(Label);

          if (label) {
            label.string = text;
          }
        }

        setColor(colorName) {
          const label = this.getComponent(Label);

          if (label) {
            if (colorName === 'green') {
              label.color = new Color(0, 255, 0, 255); // Green
            } else if (colorName === 'red') {
              label.color = new Color(255, 0, 0, 255); // Red
            } else if (colorName === 'gold') {
              label.color = new Color(255, 215, 0, 255); // Gold
            } else if (colorName === 'darkred') {
              label.color = new Color(139, 0, 0, 255); // Dark Red
            }
          }
        }

        playAnimation() {
          // Scale up animation
          tween(this.node).to(this.animationDuration * 0.3, {
            scale: new Vec3(this.targetScale, this.targetScale, 1)
          }).to(this.animationDuration * 0.3, {
            scale: new Vec3(0, 0, 1)
          }).call(() => {
            // Destroy the node after animation completes
            this.node.destroy();
          }).start();
        }

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "animationDuration", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1.0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "targetScale", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1.2;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e4ec67d27f70d57027f9d02a41c7faa296bec754.js.map