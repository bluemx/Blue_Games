System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Prefab, instantiate, Vec3, UITransform, math, RigidBody2D, Vec2, Sprite, Color, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _crd, ccclass, property, BallSpawner;

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
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      Vec3 = _cc.Vec3;
      UITransform = _cc.UITransform;
      math = _cc.math;
      RigidBody2D = _cc.RigidBody2D;
      Vec2 = _cc.Vec2;
      Sprite = _cc.Sprite;
      Color = _cc.Color;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "174b6dQOztBNqOnHIeujnDU", "BallSpawner", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Prefab', 'instantiate', 'Vec3', 'UITransform', 'math', 'RigidBody2D', 'Vec2', 'Sprite', 'Color']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BallSpawner", BallSpawner = (_dec = ccclass('BallSpawner'), _dec2 = property(Prefab), _dec3 = property(Node), _dec4 = property({
        tooltip: 'Chance for golden ball (0.0 to 1.0)'
      }), _dec5 = property({
        tooltip: 'Initial spawn interval in seconds'
      }), _dec6 = property({
        tooltip: 'Minimum spawn interval (fastest speed)'
      }), _dec7 = property({
        tooltip: 'How much to reduce interval every second'
      }), _dec8 = property({
        tooltip: 'Minimum downward force to apply'
      }), _dec9 = property({
        tooltip: 'Maximum downward force to apply'
      }), _dec(_class = (_class2 = class BallSpawner extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "ballPrefab", _descriptor, this);

          _initializerDefineProperty(this, "canvas", _descriptor2, this);

          _initializerDefineProperty(this, "goldenBallChance", _descriptor3, this);

          _initializerDefineProperty(this, "initialSpawnInterval", _descriptor4, this);

          _initializerDefineProperty(this, "minSpawnInterval", _descriptor5, this);

          _initializerDefineProperty(this, "speedIncreaseRate", _descriptor6, this);

          _initializerDefineProperty(this, "spawnHeight", _descriptor7, this);

          _initializerDefineProperty(this, "minDownwardForce", _descriptor8, this);

          _initializerDefineProperty(this, "maxDownwardForce", _descriptor9, this);

          this.spawnTimer = 0;
          this.gameTime = 0;
          this.currentSpawnInterval = 2.0;
        }

        start() {
          this.currentSpawnInterval = this.initialSpawnInterval;
        }

        update(deltaTime) {
          // Update game time
          this.gameTime += deltaTime; // Update spawn speed over time

          this.updateSpawnSpeed(); // Update spawn timer

          this.spawnTimer += deltaTime;

          if (this.spawnTimer >= this.currentSpawnInterval) {
            this.spawnBall();
            this.spawnTimer = 0;
          }
        }

        updateSpawnSpeed() {
          // Gradually decrease spawn interval (increase speed)
          const speedReduction = this.speedIncreaseRate * this.gameTime;
          this.currentSpawnInterval = Math.max(this.minSpawnInterval, this.initialSpawnInterval - speedReduction);
        }

        spawnBall() {
          if (!this.ballPrefab) {
            console.error('Ball prefab not assigned!');
            return;
          }

          const ball = instantiate(this.ballPrefab);
          const canvasTransform = this.canvas.getComponent(UITransform);
          const worldSize = (canvasTransform == null ? void 0 : canvasTransform.contentSize) || {
            width: 800,
            height: 600
          }; // Check if this should be a golden ball (5% chance)

          const isGoldenBall = Math.random() < this.goldenBallChance;

          if (isGoldenBall) {
            // Make it golden by tinting the sprite
            const sprite = ball.getComponent(Sprite);

            if (sprite) {
              sprite.color = new Color(255, 215, 0, 255); // Gold color
            } // Tag it as golden for the collision detection


            ball.name = 'GoldenBall';
            console.log('✨ GOLDEN BALL spawned!');
          } // Random X position within screen bounds (with padding)


          const padding = 50;
          const randomX = math.lerp(-worldSize.width / 2 + padding, worldSize.width / 2 - padding, Math.random());
          const spawnY = worldSize.height / 2 + this.spawnHeight; // Above screen

          ball.setPosition(new Vec3(randomX, spawnY, 0));
          this.canvas.addChild(ball); // Apply random downward force to vary fall speed

          const rigidBody = ball.getComponent(RigidBody2D);

          if (rigidBody) {
            const randomForce = math.lerp(this.minDownwardForce, this.maxDownwardForce, Math.random()); // Apply downward velocity (negative Y direction)

            rigidBody.linearVelocity = new Vec2(0, -randomForce);
            console.log(`Ball spawned at: ${randomX}, ${spawnY} with downward force: ${randomForce}`);
          } else {
            console.log(`Ball spawned at: ${randomX}, ${spawnY} (no RigidBody2D found)`);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ballPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "canvas", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "goldenBallChance", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.05;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "initialSpawnInterval", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 2.0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "minSpawnInterval", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.3;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "speedIncreaseRate", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.05;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "spawnHeight", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 200;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "minDownwardForce", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "maxDownwardForce", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 50;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4623d55d3fb294a8ebee248464017e76f5d9ee5b.js.map