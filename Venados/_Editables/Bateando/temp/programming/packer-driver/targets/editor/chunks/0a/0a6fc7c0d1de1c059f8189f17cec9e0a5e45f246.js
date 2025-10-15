System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Input, SceneRouter, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, SplashCtrl;

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
      Input = _cc.Input;
    }, function (_unresolved_2) {
      SceneRouter = _unresolved_2.SceneRouter;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4f3f8ikGYhFvLukkdXyt5Xz", "SplashCtrl", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'input', 'Input', 'EventTouch', 'EventMouse']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("SplashCtrl", SplashCtrl = (_dec = ccclass('SplashCtrl'), _dec2 = property(_crd && SceneRouter === void 0 ? (_reportPossibleCrUseOfSceneRouter({
        error: Error()
      }), SceneRouter) : SceneRouter), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = class SplashCtrl extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "router", _descriptor, this);

          _initializerDefineProperty(this, "btnInicio", _descriptor2, this);

          _initializerDefineProperty(this, "btnSalir", _descriptor3, this);
        }

        start() {
          this.btnInicio.on(Input.EventType.TOUCH_START, this.next, this);
          this.btnSalir.on(Input.EventType.TOUCH_START, this.onSalirClick, this);
        }

        onEnable() {}

        onDisable() {}

        next() {
          this.router.go('10-instructions');
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

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "router", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "btnInicio", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "btnSalir", [_dec4], {
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
//# sourceMappingURL=0a6fc7c0d1de1c059f8189f17cec9e0a5e45f246.js.map