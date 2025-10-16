System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, PageView, SceneRouter, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, InstructionsCtrl;

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
      PageView = _cc.PageView;
    }, function (_unresolved_2) {
      SceneRouter = _unresolved_2.SceneRouter;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2dbf3thpANK8apicETFHAHK", "InstructionsCtrl", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'input', 'Input', 'EventTouch', 'EventMouse', 'PageView']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("InstructionsCtrl", InstructionsCtrl = (_dec = ccclass('InstructionsCtrl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(_crd && SceneRouter === void 0 ? (_reportPossibleCrUseOfSceneRouter({
        error: Error()
      }), SceneRouter) : SceneRouter), _dec6 = property(PageView), _dec(_class = (_class2 = class InstructionsCtrl extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "btnLeft", _descriptor, this);

          _initializerDefineProperty(this, "btnRight", _descriptor2, this);

          _initializerDefineProperty(this, "btnPlay", _descriptor3, this);

          _initializerDefineProperty(this, "router", _descriptor4, this);

          _initializerDefineProperty(this, "pageView", _descriptor5, this);

          this.currentPage = 0;
          this.pages = [];
        }

        onEnable() {
          this.pages = this.pageView.getPages();
          this.btnLeft.on(Node.EventType.TOUCH_START, this.prev, this);
          this.btnRight.on(Node.EventType.TOUCH_START, this.next, this);
          this.btnPlay.on(Node.EventType.TOUCH_START, this.play, this);
          this.updatePages();
        }

        onDisable() {
          this.btnLeft.off(Node.EventType.TOUCH_START, this.prev, this);
          this.btnRight.off(Node.EventType.TOUCH_START, this.next, this);
          this.btnPlay.off(Node.EventType.TOUCH_START, this.play, this);
        }

        updatePages() {
          console.log("Current Page: ", this.currentPage);
          this.pageView.setCurrentPageIndex(this.currentPage);
        }

        prev() {
          this.currentPage = (this.currentPage - 1 + this.pages.length) % this.pages.length;
          this.updatePages();
        }

        next() {
          this.currentPage = (this.currentPage + 1) % this.pages.length;
          this.updatePages();
        }

        play() {
          this.router.go('20-game');
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnLeft", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "btnRight", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "btnPlay", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "router", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "pageView", [_dec6], {
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
//# sourceMappingURL=a3682cd8b97050d6de2576fa03f942e02791ef33.js.map