System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Contact2DType, Collider2D, director, Prefab, instantiate, Vec3, tween, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, BallController;

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
      Contact2DType = _cc.Contact2DType;
      Collider2D = _cc.Collider2D;
      director = _cc.director;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      Vec3 = _cc.Vec3;
      tween = _cc.tween;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f07d4Xt4fdB9YKwqtM50llZ", "BallCtrl", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Contact2DType', 'Collider2D', 'IPhysics2DContact', 'director', 'Prefab', 'instantiate', 'Vec3', 'tween']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BallController", BallController = (_dec = ccclass('BallController'), _dec2 = property(Prefab), _dec(_class = (_class2 = class BallController extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "miniLabelPrefab", _descriptor, this);

          this.cameraOriginalPosition = null;
        }

        start() {
          // Store the original camera position once at start
          this.initializeCameraPosition(); // Get the collider and listen for ANY collision

          var collider = this.getComponent(Collider2D);

          if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onCollision, this);
          } else {
            console.error('❌ No Collider2D component found on ball!');
          } // Auto-destroy ball after 5 seconds


          setTimeout(() => {
            if (this.node) {
              console.log('⏰ Ball auto-destroyed after 5 seconds');
              this.node.destroy();
            }
          }, 5000);
        }

        initializeCameraPosition() {
          // Find and store the camera's original position once
          var canvas = this.node.scene.getChildByName('Canvas');

          if (canvas) {
            var camera = canvas.getChildByName('Camera') || canvas.getChildByName('Main Camera');

            if (camera) {
              this.cameraOriginalPosition = camera.position.clone();
            } else {
              console.warn('⚠️ Camera not found for shake initialization');
            }
          }
        }

        shakeCanvas() {
          // Use stored original position for shake
          if (!this.cameraOriginalPosition) {
            console.warn('⚠️ Camera original position not initialized');
            return;
          } // Find the camera inside the canvas to shake


          var canvas = this.node.scene.getChildByName('Canvas');

          if (canvas) {
            // Look for Camera node inside canvas
            var camera = canvas.getChildByName('Camera') || canvas.getChildByName('Main Camera');

            if (camera) {
              var originalPosition = this.cameraOriginalPosition;
              var shakeIntensity = 15;
              tween(camera).to(0.05, {
                position: new Vec3(originalPosition.x + shakeIntensity, originalPosition.y, originalPosition.z)
              }).to(0.05, {
                position: new Vec3(originalPosition.x - shakeIntensity, originalPosition.y, originalPosition.z)
              }).to(0.05, {
                position: new Vec3(originalPosition.x, originalPosition.y + shakeIntensity, originalPosition.z)
              }).to(0.05, {
                position: new Vec3(originalPosition.x, originalPosition.y - shakeIntensity, originalPosition.z)
              }).to(0.05, {
                position: new Vec3(originalPosition.x + shakeIntensity / 2, originalPosition.y, originalPosition.z)
              }).to(0.05, {
                position: new Vec3(originalPosition.x - shakeIntensity / 2, originalPosition.y, originalPosition.z)
              }).to(0.05, {
                position: new Vec3(originalPosition.x, originalPosition.y + shakeIntensity / 2, originalPosition.z)
              }).to(0.05, {
                position: new Vec3(originalPosition.x, originalPosition.y - shakeIntensity / 2, originalPosition.z)
              }).to(0.1, {
                position: originalPosition
              }) // Return to original position
              .start();
            } else {
              console.warn('⚠️ Camera not found inside Canvas');
            }
          }
        }

        onCollision(self, other, contact) {
          if (other && other.node && contact) {
            // Check if this is a golden ball
            var isGoldenBall = this.node.name === 'GoldenBall';

            if (other.node.name == 'Bottom-floor') {
              // Shake the canvas when floor is touched
              this.shakeCanvas();

              if (isGoldenBall) {
                director.emit('subtract-score', 200);
                this.instantiateMiniLabel(contact, 'golden-floor');
              } else {
                director.emit('subtract-score', 50);
                this.instantiateMiniLabel(contact, '-');
              }

              this.scheduleDestroy();
            } else if (other.node.name == 'Boundaries') {
              if (isGoldenBall) {
                director.emit('add-score', 100);
                this.instantiateMiniLabel(contact, 'golden-homerun');
              } else {
                director.emit('add-score', 4);
                this.instantiateMiniLabel(contact, '+');
              }

              this.scheduleDestroy();
            }
          }
        }

        instantiateMiniLabel(contact, type) {
          if (!this.miniLabelPrefab) {
            console.warn('⚠️ MiniLabel prefab not assigned to BallController');
            return;
          }

          var miniLabel = instantiate(this.miniLabelPrefab); // Get the MiniLabelCtrl component and set text/color

          var miniLabelCtrl = miniLabel.getComponent('MiniLabelCtrl');

          if (miniLabelCtrl) {
            if (type === '+') {
              miniLabelCtrl.setText('+4');
              miniLabelCtrl.setColor('green');
            } else if (type === '-') {
              miniLabelCtrl.setText('-50');
              miniLabelCtrl.setColor('red');
            } else if (type === 'golden-homerun') {
              miniLabelCtrl.setText('+100');
              miniLabelCtrl.setColor('gold');
            } else if (type === 'golden-floor') {
              miniLabelCtrl.setText('-200');
              miniLabelCtrl.setColor('darkred');
            }
          }

          var canvas = this.node.scene.getChildByName('Canvas') || this.node.parent;

          if (canvas) {
            canvas.addChild(miniLabel);
            miniLabel.setPosition(new Vec3(0, 120, 0));
          }
        }

        scheduleDestroy() {
          // Always delay destruction to avoid physics system conflicts
          setTimeout(() => {
            if (this.node) {
              this.node.destroy();
            }
          }, 50);
        }

        onDestroy() {//console.log('🏀 Ball destroyed');
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "miniLabelPrefab", [_dec2], {
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
//# sourceMappingURL=1639f57a1da21f0e167795c30f7ccf8935e31537.js.map