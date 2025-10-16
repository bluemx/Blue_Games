System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, tween, Node, UIOpacity, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, SceneRouter;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
      director = _cc.director;
      tween = _cc.tween;
      Node = _cc.Node;
      UIOpacity = _cc.UIOpacity;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "cce314MRhBCTJ4fD6Ei8Pv1", "SceneRouter", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'tween', 'Node', 'UIOpacity']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("SceneRouter", SceneRouter = (_dec = ccclass('SceneRouter'), _dec2 = property(Node), _dec(_class = (_class2 = class SceneRouter extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "fader", _descriptor, this);
        }

        // opcional: un Node con UIOpacity para fade
        go(name) {
          var _this = this;

          return _asyncToGenerator(function* () {
            if (_this.fader) {
              var ui = _this.fader.getComponent(UIOpacity);

              if (ui) {
                ui.opacity = 0;
                yield new Promise(r => tween(ui).to(0.15, {
                  opacity: 255
                }).call(() => r()).start());
              }
            }

            yield director.loadScene(name);
          })();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "fader", [_dec2], {
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
//# sourceMappingURL=c1f7fe414b5e1052903c3467737800e52b801b03.js.map