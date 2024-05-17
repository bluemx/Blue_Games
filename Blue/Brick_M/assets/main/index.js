System.register("chunks:///_virtual/Barra.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Manager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Rect, v2, Collider2D, Contact2DType, Quat, v3, BoxCollider2D, Component, Manager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Rect = module.Rect;
      v2 = module.v2;
      Collider2D = module.Collider2D;
      Contact2DType = module.Contact2DType;
      Quat = module.Quat;
      v3 = module.v3;
      BoxCollider2D = module.BoxCollider2D;
      Component = module.Component;
    }, function (module) {
      Manager = module.Manager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

      cclegacy._RF.push({}, "7cfc6q/kUlBIZI24Sgh5eG8", "Barra", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Barra = exports('Barra', (_dec = ccclass('Barra'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Rect), _dec5 = property(Manager), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Barra, _Component);

        function Barra() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "temporal", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "maxBounceAngle", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "impactForce", _descriptor3, _assertThisInitialized(_this)); // Fuerza de impacto a aplicar a la pelota
          /////////


          _initializerDefineProperty(_this, "ball", _descriptor4, _assertThisInitialized(_this)); // Velocidad de la pelota


          _this.speed = v2(200, 200);

          _initializerDefineProperty(_this, "canvasRect", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "manager", _descriptor6, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Barra.prototype;

        _proto.onLoad = function onLoad() {
          var collider = this.getComponent(Collider2D);

          if (collider) {
            // Called only once when two colliding bodies start to make contact
            collider.on(Contact2DType.BEGIN_CONTACT, this.checkCollision, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
          }
        };

        _proto.onEndContact = function onEndContact() {}
        /*onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: any) {
            let ball = otherCollider.node.getComponent(RigidBody2D);
              if (ball) {
                // Obtener la dirección del rebote
              
            let ballVelocity = ball.linearVelocity.clone().normalize(); // Normalizar la velocidad
               // Calcular el ángulo de rebote basado en la posición del contacto en relación con el centro del paddle
             let paddlePosition = this.node.position;
             let contactPoint = contact.getWorldManifold().points[0];
             let offset = contactPoint.x - paddlePosition.x;
             let width = this.node.getComponent(BoxCollider2D).size.width / 2;
             let normalizedOffset = offset / width;
             let bounceAngle = normalizedOffset * 45; // 45 es un ángulo arbitrario
               
              // Calcular el ángulo de rebote basado en la normal de la colisión
            let normal = contact.getWorldManifold().normal;
            //let bounceAngle = Math.atan2(normal.y, normal.x);
              // Aplicar la rotación al vector de velocidad
            let newVelocity = ballVelocity.clone();
            newVelocity.rotate(-bounceAngle);
              
            // Mantener la magnitud de la velocidad constante
            let originalSpeed = ballVelocity.length(); // Obtener la magnitud original de la velocidad
            newVelocity.multiplyScalar(originalSpeed); // Mantener la misma magnitud
              // Agregar un pequeño incremento de velocidad al impacto
            let velocidadIncremento = 25; // Ajusta este valor según sea necesario
            newVelocity.multiplyScalar(velocidadIncremento);
              ball.linearVelocity = newVelocity;
              if(ball.linearVelocity.x>-10&&ball.linearVelocity.x<10||ball.linearVelocity.y>-10&&ball.linearVelocity.y<10)
            {
                  // Aplicar la nueva velocidad a la pelota
                  
            }
              
            }
        }*/
        ;

        _proto.onBeginContact = function onBeginContact(selfCollider, otherCollider, contact) {}
        /*
            if (selfCollider.group==2 && contact !== null) 
            {
                  this.temporal=selfCollider.node;
                let pelota=this.temporal.getComponent(Pelota);
                
                
                let contactPoint = contact.getWorldManifold().points[0]; 
                let paddlePosition = this.node.position;
                let offset = paddlePosition.x - contactPoint.x;
                let width = this.temporal.getComponent(BoxCollider2D).size.width / 2;
        
                let currentAngle = v2(0, 1).signAngle(this.temporal.getComponent(RigidBody2D).linearVelocity);
                let bounceAngle = (offset / width) * this.maxBounceAngle;
                let newAngle = misc.clampf(currentAngle + bounceAngle, -this.maxBounceAngle, this.maxBounceAngle);
        
                console.log(newAngle);
                  let axis = new Vec3(0, 1,0);
                let rotation=this.createRotationAroundAxis(axis,newAngle);
                console.log("rotation "+ rotation);
                //let rotation = v2(0, 1).rotate(-newAngle);
                let velocity = pelota.rigidbody.linearVelocity;
                console.log("velocity "+ velocity);
                let magnitude = velocity.length();
                  console.log("magnitude "+ magnitude);
                //let velocityMagnitude = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
        
            // Aplicar rotación y mantener la magnitud de la velocidad
                pelota.rigidbody.linearVelocity = v2(rotation.x* magnitude, rotation.y * magnitude);
                console.log("linear "+ pelota.rigidbody.linearVelocity);
                //pelota.SetRandomTrajectory();
            }
              */
        ;

        _proto.createRotationAroundAxis = function createRotationAroundAxis(axis, angle) {
          var halfAngle = angle * 0.5;
          var sinHalfAngle = Math.sin(halfAngle);
          var cosHalfAngle = Math.cos(halfAngle);
          var x = axis.x * sinHalfAngle;
          var y = axis.y * sinHalfAngle;
          var z = axis.z * sinHalfAngle;
          var w = cosHalfAngle;
          return new Quat(x, y, z, w);
        }
        /*onBeginContact(otherCollider: BoxCollider2D, contact: IPhysics2DContact | null)
         {
             
               this.temporal=otherCollider.node;
         
             if (this.temporal != null && contact !== null) {
                   console.log("barra");
                 var paddlePosition = this.node.position;
                 var contactPoint = contact.getWorldManifold().points[0];
         
                 var offset = paddlePosition.x - contactPoint.x;
                 var width = otherCollider.size.width / 2;
                 
         
                 var currentAngle = v2(0, 1).signAngle(otherCollider.node.getComponent(RigidBody2D).linearVelocity);
                 var bounceAngle = (offset / width) * this.maxBounceAngle;
                 var newAngle = misc.clampf(currentAngle + bounceAngle, -this.maxBounceAngle, this.maxBounceAngle);
         
                 var rotation = v2(0, 1).rotate(-newAngle);
                 var velocity = otherCollider.node.getComponent(RigidBody2D).linearVelocity;
                 var velocityMagnitude = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
         
                 // Aplicar rotación y mantener la magnitud de la velocidad
                 otherCollider.node.getComponent(RigidBody2D).linearVelocity = v2(rotation.x * velocityMagnitude, rotation.y * velocityMagnitude);
             }
               
         }*/
        ;

        _proto.start = function start() {};

        _proto.update = function update(dt) {
          if (!this.manager.again) this.moveBall(dt); //this.checkCollision();
        };

        _proto.moveBall = function moveBall(dt) {
          var currentPosition = this.ball.position;
          var dx = this.speed.x * dt;
          var dy = this.speed.y * dt;
          var newPosition = v3(currentPosition.x + dx, currentPosition.y + dy, 0);
          this.ball.setPosition(newPosition);
        };

        _proto.checkCollision = function checkCollision() {
          var ballCollider = this.ball.getComponent(BoxCollider2D);
          var ballRect = ballCollider.worldAABB; // Utiliza los valores del rectángulo definido manualmente

          var canvasRect = this.canvasRect; // Colisión con las paredes

          if (ballRect.xMin <= canvasRect.xMin || ballRect.xMax >= canvasRect.xMax) {
            this.speed.x *= -1;
          }

          if (ballRect.yMin <= canvasRect.yMin || ballRect.yMax >= canvasRect.yMax) {
            this.speed.y *= -1;
          }
        };

        _proto.offContact = function offContact() {}
        /*onContact(selfCollider: Collider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
              let pelota = this.node.getComponent(Pelota);
            this.temporal=otherCollider.node;
            console.log(otherCollider.group);
        
            if(otherCollider.group==1)
            {
                if (this.temporal != null) {
                      console.log("barra");
                    var paddlePosition = this.node.position;
                    var contactPoint = contact!.getWorldManifold().points[0];
            
                    var offset = paddlePosition.x - contactPoint.x;
                    var width = otherCollider.size.width / 2;
                    
            
                    var currentAngle = v2(0, 1).signAngle(this.temporal.getComponent(RigidBody2D).linearVelocity);
                    var bounceAngle = (offset / width) * this.maxBounceAngle;
                    var newAngle = misc.clampf(currentAngle + bounceAngle, -this.maxBounceAngle, this.maxBounceAngle);
            
                    var rotation = v2(0, 1).rotate(-newAngle);
                    var velocity = this.temporal.getComponent(RigidBody2D).linearVelocity;
                    var velocityMagnitude = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
            
                    // Aplicar rotación y mantener la magnitud de la velocidad
                    this.temporal.getComponent(RigidBody2D).linearVelocity = v2(rotation.x * velocityMagnitude, rotation.y * velocityMagnitude);
                }
        
                console.log("NObarra");
            }
           
        }*/
        ;

        return Barra;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "temporal", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "maxBounceAngle", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "impactForce", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 50;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "ball", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "canvasRect", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Rect(-300, -300, 600, 600);
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "manager", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Brick.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Manager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, SpriteFrame, AudioClip, Collider2D, Contact2DType, Sprite, Color, Component, Manager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      SpriteFrame = module.SpriteFrame;
      AudioClip = module.AudioClip;
      Collider2D = module.Collider2D;
      Contact2DType = module.Contact2DType;
      Sprite = module.Sprite;
      Color = module.Color;
      Component = module.Component;
    }, function (module) {
      Manager = module.Manager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

      cclegacy._RF.push({}, "ef3bf2hn2tHy4kBKJ92U3aS", "Brick", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Brick = exports('Brick', (_dec = ccclass('Brick'), _dec2 = property(Number), _dec3 = property(SpriteFrame), _dec4 = property(Manager), _dec5 = property(AudioClip), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Brick, _Component);

        function Brick() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "impactForce", _descriptor, _assertThisInitialized(_this)); // Fuerza de impacto a aplicar a la pelota


          _initializerDefineProperty(_this, "puntos", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "sprites", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "manager", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "audio", _descriptor5, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Brick.prototype;

        _proto.onLoad = function onLoad() {
          var collider = this.getComponent(Collider2D);

          if (collider) {
            // Called only once when two colliding bodies start to make contact
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this); //collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
          }
        };

        _proto.onBeginContact = function onBeginContact(selfCollider, otherCollider) {
          if (otherCollider.node.name === 'Pelota') {
            /*let ballRigidbody = otherCollider.node.getComponent(RigidBody2D);
            if (ballRigidbody) {
                // Calcular la dirección del impacto (dirigida hacia arriba)
                let impactDirection = new Vec2(0, 1);
                console.log(ballRigidbody.linearVelocity.y);
                if(ballRigidbody.linearVelocity.y<=10)
                {
                     // Aplicar fuerza a la pelota en la dirección del impacto
                    ballRigidbody.applyForceToCenter(impactDirection.multiplyScalar(this.impactForce), true);
                }
                 
            }*/
            //Score
            // Destruir el ladrillo
            this.finBloque();
            this.manager.reproduce(this.audio);
          }
        };

        _proto.finBloque = function finBloque() {
          if (this.node.getComponent(Sprite).spriteFrame == this.sprites[0]) {
            this.scheduleOnce(function () {
              this.manager.score += this.puntos;
              this.manager.actualizaScore(); // Código a ejecutar después del tiempo especificado

              this.node.destroy();
            }, 0.5);
          } else {
            this.node.getComponent(Sprite).spriteFrame = this.sprites[this.sprites.length - 1];
            this.node.getComponent(Sprite).color = Color.GRAY;
          }
        };

        return Brick;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "impactForce", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 50;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "puntos", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "sprites", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "manager", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "audio", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CambioEscena.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, CCString, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCString = module.CCString;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "9f21aFCtA5LPoNmibqGwpXB", "CambioEscena", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var CambioEscena = exports('CambioEscena', (_dec = ccclass('CambioEscena'), _dec2 = property(CCString), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CambioEscena, _Component);

        function CambioEscena() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "name2", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = CambioEscena.prototype;

        _proto.onLoad = function onLoad() {// Agrega un evento de clic al botón
        } //cc.director.preloadScene("table", function () {
        //    cc.log("Next scene preloaded");
        //});
        ;

        _proto.cambio = function cambio() {
          var _this2 = this;

          director.preloadScene(this.name2.toString(), function (completedCount, totalCount, item) {}, function (error, asset) {
            //do something after preloaded scene
            director.loadScene(_this2.name2.toString());
          });
        };

        return CambioEscena;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "name2", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Color, Canvas, UITransform, instantiate, Label, RichText, Toggle, Button, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Color = module.Color;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);

        function DebugViewRuntimeControl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));

          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct Internal Specular', 'Env Internal Specular', 'Internal All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'Internal Specular', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }

        var _proto = DebugViewRuntimeControl.prototype;

        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);

          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }

          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
              y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
              height = 20; // new nodes

          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles'; // title

          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;

            var _labelComponent = newLabel.getComponent(Label);

            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }

          y -= height; // single

          var currentRow = 0;

          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }

            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }

          x += width; // buttons

          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent; // misc

          y -= 40;

          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);

            _newNode.setPosition(x, y - height * _i2, 0.0);

            _newNode.setScale(0.5, 0.5, 0.5);

            _newNode.parent = miscNode;

            var _textComponent = _newNode.getComponentInChildren(RichText);

            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;

            var toggleComponent = _newNode.getComponent(Toggle);

            toggleComponent.isChecked = _i2 ? true : false;

            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);

            this.miscModeToggleList[_i2] = _newNode;
          } // composite


          y -= 150;

          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;

            _newNode2.setPosition(x, y - height * _i3, 0.0);

            _newNode2.setScale(0.5, 0.5, 0.5);

            _newNode2.parent = this.compositeModeToggle.parent;

            var _textComponent2 = _newNode2.getComponentInChildren(RichText);

            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;

            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);

            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };

        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');

          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };

        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };

        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };

        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };

        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };

        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);

          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);

            _toggleComponent.isChecked = true;
          }

          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };

        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };

        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;

          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }

          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }

          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };

        _proto.onLoad = function onLoad() {};

        _proto.update = function update(deltaTime) {};

        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Detecta.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, sys, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      sys = module.sys;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

      cclegacy._RF.push({}, "da208MLWSxBU7Yc2zeAOTt8", "Detecta", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Detecta = exports('Detecta', (_dec = ccclass('Detecta'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property([Node]), _dec5 = property([Node]), _dec6 = property([Node]), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Detecta, _Component);

        function Detecta() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "PC", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "mobile", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "lista", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "listaFinal", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "botones", _descriptor5, _assertThisInitialized(_this));

          _this.index = 0;
          return _this;
        }

        var _proto = Detecta.prototype;
        /* @property(String)
         public PC : String = "";
         @property(String)
         public mobile : String = "";*/

        /*onLoad() {
            // Verifica si el juego se está ejecutando en un dispositivo móvil
           if (sys.isMobile) {
             
                this.listaFinal[0]=this.mobile;
            } else {
                // Código para otras plataformas (por ejemplo, navegadores)
                this.listaFinal[0]=this.PC;
               
            }
            this.listaFinal[1]=this.lista[0];
            this.listaFinal[2]=this.lista[1];
        }*/

        _proto.onLoad = function onLoad() {
          var _this2 = this; // Verifica si el juego se está ejecutando en un dispositivo móvil


          if (sys.isMobile) {
            director.preloadScene(this.mobile.toString(), function (completedCount, totalCount, item) {}, function (error, asset) {
              //do something after preloaded scene
              director.loadScene(_this2.mobile.toString());
            }); // Código específico para dispositivos móviles
            // this.PC.active=false;

            this.mobile.active = true;
            this.listaFinal[0] = this.mobile;
          } else {
            // Código para otras plataformas (por ejemplo, navegadores)
            this.PC.active = true; //this.mobile.active=false;

            this.listaFinal[0] = this.PC;
            director.preloadScene(this.PC.toString(), function (completedCount, totalCount, item) {}, function (error, asset) {
              //do something after preloaded scene
              director.loadScene(_this2.PC.toString());
            });
          }

          this.listaFinal[1] = this.lista[0];
          this.listaFinal[2] = this.lista[1];
        };

        _proto.start = function start() {
          this.botones[1].active = false;
        };

        _proto.update = function update() {
          if (this.index == 0) {
            this.botones[1].active = false;
          } else {
            this.botones[1].active = true;
          }

          if (this.index == this.listaFinal.length - 1) {
            this.botones[0].active = false;
          } else {
            this.botones[0].active = true;
          }
        };

        _proto.next = function next() {
          if (this.index < this.listaFinal.length - 1) {
            this.index++;
            this.listaFinal[this.index].active = true;
            this.listaFinal[this.index - 1].active = false;
          }
        };

        _proto.back = function back() {
          if (this.index > 0) {
            this.index--;
            this.listaFinal[this.index].active = true;
            this.listaFinal[this.index + 1].active = false;
          }
        };

        return Detecta;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "PC", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "mobile", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lista", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "listaFinal", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "botones", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/InputManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, input, Input, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      input = module.input;
      Input = module.Input;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2;

      cclegacy._RF.push({}, "7c39bihIiRPyaKm9GAzFFn6", "InputManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var InputManager = exports('InputManager', (_dec = ccclass('InputManager'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(InputManager, _Component);

        function InputManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._keyStates = new Map();
          return _this;
        }

        var _proto = InputManager.prototype;

        _proto.onLoad = function onLoad() {
          console.log('INPUT MANAGER');
          /* if(InputManager._instance){
               this.destroy()
               return;
           }*/

          InputManager._instance = this;
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        };

        _proto.onKeyDown = function onKeyDown(event) {
          this._keyStates.set(event.keyCode, true); // console.log(this._keyStates)

        };

        _proto.onKeyUp = function onKeyUp(event) {
          this._keyStates.set(event.keyCode, false);
        };

        InputManager.isKeyPressed = function isKeyPressed(keyCode) {
          var _InputManager$_instan;

          return !!((_InputManager$_instan = InputManager._instance) != null && _InputManager$_instan._keyStates.get(keyCode));
        };

        return InputManager;
      }(Component), _class2._instance = void 0, _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './Barra.ts', './Brick.ts', './CambioEscena.ts', './Detecta.ts', './InputManager.ts', './Manager.ts', './ManagerIntro.ts', './Movimiento.ts', './Mute.ts', './Pelota.ts', './Start.ts', './Timer.ts', './Video.ts', './Wall.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/Manager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, CCBoolean, AudioSource, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      CCBoolean = module.CCBoolean;
      AudioSource = module.AudioSource;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "5bd46jtrvlKJoD8ggsS9xxR", "Manager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Manager = exports('Manager', (_dec = ccclass('Manager'), _dec2 = property(Label), _dec3 = property(CCBoolean), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Manager, _Component);

        function Manager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "score", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "scoreText", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "audio", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "again", _descriptor4, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Manager.prototype;

        _proto.onLoad = function onLoad() {
          this.audio = this.node.getComponent(AudioSource);
          this.again = false;
        };

        _proto.start = function start() {
          this.score = 0;
        };

        _proto.update = function update(deltaTime) {};

        _proto.actualizaScore = function actualizaScore() {
          this.scoreText.string = this.score.toString();
        };

        _proto.reproduce = function reproduce(clip) {
          this.audio.clip = clip;
          this.audio.play();
        };

        return Manager;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "score", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scoreText", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "audio", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "again", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ManagerIntro.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "47928gbAedHAqQAtjYTa3Zc", "ManagerIntro", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ManagerIntro = exports('ManagerIntro', (_dec = ccclass('ManagerIntro'), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ManagerIntro, _Component);

        function ManagerIntro() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "intro", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ManagerIntro.prototype;

        _proto.onLoad = function onLoad() {};

        _proto.start = function start() {
          this.intro.active = true;
        };

        _proto.update = function update(deltaTime) {};

        return ManagerIntro;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "intro", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Movimiento.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './InputManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Vec3, Animation, CCBoolean, input, Input, KeyCode, Component, InputManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Vec3 = module.Vec3;
      Animation = module.Animation;
      CCBoolean = module.CCBoolean;
      input = module.input;
      Input = module.Input;
      KeyCode = module.KeyCode;
      Component = module.Component;
    }, function (module) {
      InputManager = module.InputManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14;

      cclegacy._RF.push({}, "4b726YfjFNNdLzh1lMnUKHS", "Movimiento", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Movimiento = exports('Movimiento', (_dec = ccclass('Movimiento'), _dec2 = property(InputManager), _dec3 = property(Node), _dec4 = property(Vec3), _dec5 = property(Vec3), _dec6 = property(Vec3), _dec7 = property(Vec3), _dec8 = property(Animation), _dec9 = property(CCBoolean), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Movimiento, _Component);

        function Movimiento() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "limiteIzq", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "limiteDer", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "inputManager", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "nodeImage", _descriptor4, _assertThisInitialized(_this));

          _this.posY = void 0;

          _initializerDefineProperty(_this, "speed", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "targetPosition", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "moveDirection", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "newPosition", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "flechas", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "touch", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "transf", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "animation", _descriptor12, _assertThisInitialized(_this));

          _this.derecha = void 0;
          _this.izquierda = void 0;
          _this.YaEntre = void 0;

          _initializerDefineProperty(_this, "state", _descriptor13, _assertThisInitialized(_this));

          _this.prevMouseX = 0;
          _this.direction = 0;
          _this.otraAnim = false;

          _initializerDefineProperty(_this, "meCai", _descriptor14, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Movimiento.prototype;

        _proto.onLoad = function onLoad() {
          this.derecha = false;
          this.izquierda = false;
          this.YaEntre = false; //this.animation = this.node.getComponentInChildren(Animation)

          this.posY = this.nodeImage.getWorldPosition();
          input.on(Input.EventType.KEY_DOWN, this.Teclas, this); //console.log("cargando flechas")

          this.nodeImage.on(Input.EventType.TOUCH_START, this.Touch, this);
          this.nodeImage.on(Input.EventType.TOUCH_END, this.Stop, this);
          this.nodeImage.on(Input.EventType.TOUCH_CANCEL, this.Stop, this);
          /*this.nodeImage.on(Node.EventType.TOUCH_MOVE,(event:EventTouch)=>{
              let loc=event.getLocation();
              
              this.nodeImage.setWorldPosition(new Vec3(loc.x, this.posY.y, 0));
              
          })
            this.nodeImage.on(Node.EventType.TOUCH_END,(event:EventTouch)=>{
            })
            this.nodeImage.on(Node.EventType.TOUCH_CANCEL,(event:EventTouch)=>{
              
          })*/
        };

        _proto.onDestroy = function onDestroy() {
          // Desregistrar eventos al destruir el componente
          this.node.off(Node.EventType.TOUCH_MOVE, this.Touch, this);
        };

        _proto.Stop = function Stop() {
          /*this.YaEntre = false;
          this.state="idle";
          console.log("regresa idle");*/
          this.suelta();
        };

        _proto.Detener = function Detener() {
          if (this.nodeImage.position.x <= this.limiteIzq) {
            this.nodeImage.setPosition(new Vec3(this.limiteIzq, -300, 0));
          }

          if (this.nodeImage.position.x >= this.limiteDer) {
            this.nodeImage.setPosition(new Vec3(this.limiteDer, -300, 0));
          } //this.anim.IDLE();

        };

        _proto.Touch = function Touch() {
          var _this2 = this;

          if (!this.meCai) {
            this.nodeImage.on(Node.EventType.TOUCH_MOVE, function (event) {
              _this2.touch = true;
              var loc = event.getUILocation(); // Determinar la dirección del movimiento del mouse

              var currentMouseX = event.getLocationX();

              if (currentMouseX > _this2.prevMouseX) {
                _this2.direction = 1; // Movimiento hacia la derecha

                _this2.state = "walkingright";
                _this2.izquierda = false;
              } else if (currentMouseX < _this2.prevMouseX) {
                _this2.direction = -1; // Movimiento hacia la izquierda

                _this2.state = "walkingleft";
                _this2.derecha = false;
              }

              _this2.nodeImage.setWorldPosition(new Vec3(loc.x, _this2.posY.y, 0)); // Actualizar la posición anterior del mouse


              _this2.prevMouseX = currentMouseX; //this.suelta();
            });
          }
        };

        _proto.NoTeclas = function NoTeclas() {
          this.flechas = false;
        };

        _proto.Teclas = function Teclas() {
          //console.log("flechas")
          this.flechas = true;
        };

        _proto.cambioMove = function cambioMove() {
          if (this.touch) {
            this.flechas = false;
          }

          if (InputManager.isKeyPressed(KeyCode.ARROW_LEFT) || InputManager.isKeyPressed(KeyCode.ARROW_RIGHT)) {
            this.flechas = true;
            this.touch = false;
          }
        };

        _proto.suelta = function suelta() {
          this.transf = this.nodeImage.getPosition();
          this.targetPosition = this.transf;
          this.nodeImage.getPosition(this.transf);
        };

        _proto.mueve = function mueve(deltaTime) {
          this.cambioMove();

          if (this.flechas) {
            //console.log("flechas");
            this.moveDirection.x = 0;
            this.moveDirection.y = 0;
            /*if(InputManager.isKeyPressed(KeyCode.ARROW_UP)){
            this.moveDirection.y += 1
            }
            if(InputManager.isKeyPressed(KeyCode.ARROW_DOWN)){
            this.moveDirection.y -= 1
            }*/

            if (InputManager.isKeyPressed(KeyCode.ARROW_LEFT)) {
              this.moveDirection.x -= 1; // this.anim.Derecha();
              //this.state = "walkingleft";
              //this.derecha=false;
            }

            if (InputManager.isKeyPressed(KeyCode.ARROW_RIGHT)) {
              this.moveDirection.x += 1; //this.state = "walkingright";
              //this.izquierda=false;
              // this.anim.Izquierda();
            }
            /*if(!InputManager.isKeyPressed(KeyCode.ARROW_RIGHT)&&!InputManager.isKeyPressed(KeyCode.ARROW_LEFT))
            {
                this.YaEntre = false;
                this.state = "idle";
              }*/
            ///*
            //OPTIM


            Vec3.normalize(this.moveDirection, this.moveDirection);
            Vec3.scaleAndAdd(this.targetPosition, this.targetPosition, this.moveDirection, this.speed * deltaTime);
            var lerpFactor = 1 - Math.pow(0.001, deltaTime);
            Vec3.lerp(this.newPosition, new Vec3(this.nodeImage.position.x, -300, 0), this.targetPosition, lerpFactor);
            this.nodeImage.setPosition(this.newPosition);
          }
          /* if(!InputManager.isKeyPressed(KeyCode.ARROW_LEFT) && !InputManager.isKeyPressed(KeyCode.ARROW_RIGHT) && !this.mueve){
           
               console.log("no flechas");
               this.flechas=false;
               
               Vec3.normalize(this.moveDirection, this.moveDirection);
               Vec3.scaleAndAdd(this.targetPosition, this.targetPosition, this.moveDirection, this.speed * deltaTime)
               const lerpFactor = 1 - Math.pow(0.001, deltaTime);
               Vec3.lerp(this.newPosition, new Vec3(this.nodeImage.position.x,0,0), this.targetPosition, lerpFactor);
               this.nodeImage.setPosition(this.newPosition);
             /* console.log("Izq" + InputManager.isKeyPressed(KeyCode.ARROW_LEFT));
               console.log("Der" + InputManager.isKeyPressed(KeyCode.ARROW_RIGHT));
          }*/

          /*else if(this.flechas && !InputManager.isKeyPressed(KeyCode.ARROW_LEFT) && !InputManager.isKeyPressed(KeyCode.ARROW_RIGHT))
          {
              this.flechas=false;
              console.log("no flechas");
          }*/


          this.Detener();
        };

        _proto.update = function update(deltaTime) {
          this.mueve(deltaTime); // Lógica de cambio de animación según el estado

          /*const idleClip = this.animation.clips[0];
          const walkClipDer = this.animation.clips[1];
          const walkClipIzq = this.animation.clips[2];
          const buena=this.animation.clips[3];
          const malo=this.animation.clips[4];
              if(this.animation.getState(buena.name).isPlaying||this.animation.getState(malo.name).isPlaying)
          {
              if(this.animation.getState(buena.name).isPlaying&&!this.otraAnim)
              {
              //this.YaEntre=true;
              this.state="otro";
              //this.playAnimation("Player_Animation_Bueno");
              this.otraAnim=true;
              }else  if(this.animation.getState(malo.name).isPlaying&&!this.otraAnim)
              {
              //this.YaEntre=true;
              this.state="otro";
              //this.playAnimation("Player_Animation_malo");
              this.otraAnim=true;
              }
              if((this.animation.getState("Player_Animation_Bueno").isMotionless||this.animation.getState("Player_Animation_malo").isMotionless)&&this.otraAnim)
              {
                  //this.YaEntre=false;
                  this.otraAnim=false;
                  console.log("FIN"+this.otraAnim);
                 
                  this.scheduleOnce(function () {
                      this.state="idle";
                  },1)
                  //this.playAnimation("Player_Animation");
                  
                  
              }
          }
          
          
          if (this.state === "idle" && idleClip && !this.animation.getState(idleClip.name).isPlaying && !this.YaEntre) {
             
                console.log("IDLE");
              
                  this.playAnimation("Player_Animation");
             
                this.YaEntre =true;
              
          } else if (this.state === "walkingleft" && walkClipIzq && !this.animation.getState(walkClipIzq.name).isPlaying && !this.izquierda) {
              this.playAnimation("Player_Animation_I");
              this.izquierda = true;
              
          }
          else if (this.state === "walkingright" && walkClipDer && !this.animation.getState(walkClipDer.name).isPlaying && !this.derecha) {
              this.playAnimation("Player_Animation_D");
              this.derecha=true;
              
          }
           
           
          //this.deteccionDerIzq();*/
        };

        _proto.playAnimation = function playAnimation(animName) {
          // Detener todas las animaciones y reproducir la animación especificada
          this.animation.stop();
          this.animation.play(animName);
        };

        return Movimiento;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "limiteIzq", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return -300;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "limiteDer", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 300;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "inputManager", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "nodeImage", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "speed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 500;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "targetPosition", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3();
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "moveDirection", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3();
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "newPosition", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3();
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "flechas", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "touch", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "transf", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "animation", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "state", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "otro";
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "meCai", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Mute.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Button, AudioSource, SpriteFrame, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      AudioSource = module.AudioSource;
      SpriteFrame = module.SpriteFrame;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "6f900SLTUxEloOfZ62AKtGc", "Mute", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Mute = exports('Mute', (_dec = ccclass('Mute'), _dec2 = property(Button), _dec3 = property(AudioSource), _dec4 = property(SpriteFrame), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Mute, _Component);

        function Mute() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "muteButton", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "audioSource", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "sprites", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Mute.prototype;

        _proto.onLoad = function onLoad() {// Asigna la función a ejecutar cuando se hace clic en el botón
          //this.muteButton.node.on('click', this.toggleMute, this);
        };

        _proto.toggleMute = function toggleMute() {
          // Verifica si el audio está actualmente silenciado
          //console.log("volume");
          // Establece el volumen de la música a 0 si está activado el sonido, o a 1 si está silenciado
          if (this.audioSource.volume == 0) {
            //console.log("volume 0");
            this.audioSource.volume = 1;
          } else {
            //console.log("volume 1");
            this.audioSource.volume = 0;
          }

          this.cambiaSprite();
        };

        _proto.cambiaSprite = function cambiaSprite() {
          if (this.audioSource.volume == 1) {
            this.muteButton.normalSprite = this.sprites[0];
            this.muteButton.pressedSprite = this.sprites[1];
          } else if (this.audioSource.volume == 0) {
            this.muteButton.normalSprite = this.sprites[1];
            this.muteButton.pressedSprite = this.sprites[0];
          }
        };

        return Mute;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "muteButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "audioSource", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "sprites", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Pelota.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Manager.ts', './Movimiento.ts', './InputManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, RigidBody2D, AudioClip, AudioSource, SpriteFrame, Vec3, Sprite, Node, Collider2D, Contact2DType, v2, ERigidBody2DType, BoxCollider2D, Vec2, randomRangeInt, Component, Manager, Movimiento, InputManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      RigidBody2D = module.RigidBody2D;
      AudioClip = module.AudioClip;
      AudioSource = module.AudioSource;
      SpriteFrame = module.SpriteFrame;
      Vec3 = module.Vec3;
      Sprite = module.Sprite;
      Node = module.Node;
      Collider2D = module.Collider2D;
      Contact2DType = module.Contact2DType;
      v2 = module.v2;
      ERigidBody2DType = module.ERigidBody2DType;
      BoxCollider2D = module.BoxCollider2D;
      Vec2 = module.Vec2;
      randomRangeInt = module.randomRangeInt;
      Component = module.Component;
    }, function (module) {
      Manager = module.Manager;
    }, function (module) {
      Movimiento = module.Movimiento;
    }, function (module) {
      InputManager = module.InputManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;

      cclegacy._RF.push({}, "c71f9IbEO5CR6LbZxacLTEt", "Pelota", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Pelota = exports('Pelota', (_dec = ccclass('Pelota'), _dec2 = property(RigidBody2D), _dec3 = property(AudioClip), _dec4 = property(AudioSource), _dec5 = property([SpriteFrame]), _dec6 = property(Vec3), _dec7 = property(Sprite), _dec8 = property(Manager), _dec9 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Pelota, _Component);

        function Pelota() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "rigidbody", _descriptor, _assertThisInitialized(_this));

          _this.speed = 10;

          _initializerDefineProperty(_this, "impactForce", _descriptor2, _assertThisInitialized(_this)); // Fuerza de impacto a aplicar a la pelota


          _initializerDefineProperty(_this, "clip", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "audio", _descriptor4, _assertThisInitialized(_this));

          _this.inicio = false;

          _initializerDefineProperty(_this, "numeros", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "posOriginal", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "imagen", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "manager", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "barra", _descriptor9, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Pelota.prototype;

        _proto.onLoad = function onLoad() {
          //this.imagen.spriteFrame = null;
          var collider = this.getComponent(Collider2D);

          if (collider) {
            // Called only once when two colliding bodies start to make contact
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this); //collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
          }
        };

        _proto.onBeginContact = function onBeginContact(selfCollider, otherCollider, contact) {
          //console.log(otherCollider.group + otherCollider.name);
          if (otherCollider.group == 4) {
            this.audio.clip = this.clip;
            this.audio.play();
            this.imagen.spriteFrame = this.numeros[3];
            this.manager.again = true;
            this.rigidbody.linearVelocity = v2(0, 0);
            this.barra.getComponent(Movimiento).meCai = true;
            this.node.getComponent(Sprite).enabled = false;
            this.revive();
          } else if (otherCollider.group == 1 && !this.inicio) {
            console.log("random");
            /*this.scheduleOnce(function () {
                
                // Código a ejecutar después del tiempo especificado
                this.SetRandomTrajectory();
            }, 1);*/

            this.inicio = true;
          }
        };

        _proto.revive = function revive() {
          this.scheduleOnce(function () {
            this.imagen.spriteFrame = this.numeros[2];
            this.barra.getComponent(Movimiento).enabled = false;
            this.barra.getComponent(InputManager).enabled = false;
            this.node.getComponent(Sprite).enabled = true;
            this.node.position = this.posOriginal;
            this.rigidbody.type = ERigidBody2DType.Kinematic;
            this.rigidbody.enabled = false;
            this.node.getComponent(BoxCollider2D).enabled = false;
            this.barra.getComponent(Movimiento).meCai = true;
          }, 1);
          this.scheduleOnce(function () {
            this.imagen.spriteFrame = this.numeros[1];
          }, 2);
          this.scheduleOnce(function () {
            this.imagen.spriteFrame = this.numeros[0];
          }, 3);
          this.scheduleOnce(function () {
            this.manager.again = false;
            this.imagen.spriteFrame = null;
            this.rigidbody.type = ERigidBody2DType.Dynamic;
            this.rigidbody.enabled = true;
            this.barra.getComponent(Movimiento).meCai = false;
            this.node.getComponent(BoxCollider2D).enabled = true;
            this.barra.getComponent(Movimiento).enabled = true;
            this.barra.getComponent(InputManager).enabled = true; // director.resume();
          }, 4);
        };

        _proto.start = function start() {
          console.log("pelota"); //this.posOriginal=this.node.position;
          // Inicializa la velocidad de la pelota al inicio

          var rigidbody = this.node.getComponent(RigidBody2D);
          rigidbody.linearVelocity = new Vec2(0, this.speed); //this.SetRandomTrajectory();
        };

        _proto.update = function update(deltaTime) {};

        _proto.SetRandomTrajectory = function SetRandomTrajectory() {
          //console.log("random");
          var force = new Vec2(0, 0);
          force.x = randomRangeInt(-1, 2);
          force.y = -1;
          console.log("force.x " + force.x);
          force.x *= this.speed;
          force.y *= this.speed;
          this.node.getComponent(RigidBody2D).applyForceToCenter(force, true);
        };

        return Pelota;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "rigidbody", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "impactForce", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 50;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "clip", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "audio", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "numeros", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "posOriginal", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "imagen", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "manager", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "barra", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Start.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, SpriteFrame, Sprite, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "fcb18NoWrVNz5cccX9lFG7J", "Start", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Start = exports('Start', (_dec = ccclass('Start'), _dec2 = property([SpriteFrame]), _dec3 = property(Sprite), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Start, _Component);

        function Start() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "numeros", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "imagen", _descriptor2, _assertThisInitialized(_this));

          _this.index = 3;
          return _this;
        }

        var _proto = Start.prototype;

        _proto.onLoad = function onLoad() {
          this.imagen.spriteFrame = this.numeros[3];
        };

        _proto.start = function start() {
          //director.pause();
          this.scheduleOnce(function () {
            this.imagen.spriteFrame = this.numeros[2];
          }, 1);
          this.scheduleOnce(function () {
            this.imagen.spriteFrame = this.numeros[1];
          }, 2);
          this.scheduleOnce(function () {
            this.imagen.spriteFrame = this.numeros[0];
          }, 3);
          this.scheduleOnce(function () {
            this.imagen.spriteFrame = null; // director.resume();
          }, 4);
        };

        _proto.update = function update(deltaTime) {};

        return Start;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "numeros", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "imagen", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Timer.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Manager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Label, AudioSource, AudioClip, Sprite, director, Component, Manager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      AudioSource = module.AudioSource;
      AudioClip = module.AudioClip;
      Sprite = module.Sprite;
      director = module.director;
      Component = module.Component;
    }, function (module) {
      Manager = module.Manager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;

      cclegacy._RF.push({}, "83ca2Ry4atLeYxVR/BwDcaA", "Timer", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Timer = exports('Timer', (_dec = ccclass('Timer'), _dec2 = property(Node), _dec3 = property(Label), _dec4 = property(Manager), _dec5 = property(AudioSource), _dec6 = property(AudioClip), _dec7 = property(Node), _dec8 = property(Sprite), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Timer, _Component);

        function Timer() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this; //@property(Label) timerLabel:Label = null;

          _initializerDefineProperty(_this, "totalSeconds", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "totalSeconds2", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "gameOver", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "scoreText", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "manager", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "audioSource", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "clip", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "cubeta", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "barra", _descriptor9, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Timer.prototype;

        _proto.onLoad = function onLoad() {
          director.resume(); //this.cubeta.getComponent(MovimientoCubeta).enabled=true;
          //this.cubeta.getChildByName("Cubeta").getComponent(RigidBody2D).enabled=true;
        };

        _proto.start = function start() {
          this.gameOver.active = false;
          this.totalSeconds = 60;
          this.totalSeconds2 = 57; // Establecer el tiempo total en segundos

          this.schedule(this.updateBarra, .1);
          this.schedule(this.updateTimer, 1, this.totalSeconds); // Llama a updateTimer cada segundo durante el tiempo total
        };

        _proto.quitaPausa = function quitaPausa() {
          director.resume();
        };

        _proto.updateBarra = function updateBarra() {
          if (!this.manager.again) {
            this.totalSeconds2 -= .1;
            var seconds = this.totalSeconds2 % 57;
            this.barra.fillRange = seconds / 57 * -1;

            if (this.totalSeconds2 <= 0) {
              // Aquí puedes agregar lógica adicional cuando el contador llega a cero
              //this.cubeta.getComponent(MovimientoCubeta).enabled=false;
              //this.cubeta.getChildByName("Cubeta").getComponent(RigidBody2D).enabled=false;
              this.gameOver.active = true;
              this.audioSource.clip = this.clip;
              this.audioSource.play();
              this.scoreText.string = this.manager.score.toString();
              director.pause(); //console.log("¡Tiempo agotado!");
            }
          }
        };

        _proto.updateTimer = function updateTimer() {
          //console.log("MANAGER= "+this.manager.again);
          if (!this.manager.again) {
            this.totalSeconds--; //console.log("totalSeconds= "+this.totalSeconds);

            if (this.totalSeconds < 0) {
              this.totalSeconds = 0; // Asegurar que no haya números negativos
            } //const minutes = Math.floor(this.totalSeconds / 60);
            //const seconds = this.totalSeconds % 60;
            //console.log(seconds)
            //this.timerLabel.string = this.formatTime(minutes, seconds);


            if (this.totalSeconds === 0) {
              // Aquí puedes agregar lógica adicional cuando el contador llega a cero
              //this.cubeta.getComponent(MovimientoCubeta).enabled=false;
              //this.cubeta.getChildByName("Cubeta").getComponent(RigidBody2D).enabled=false;
              this.gameOver.active = true;
              this.audioSource.clip = this.clip;
              this.audioSource.play();
              this.scoreText.string = this.manager.score.toString();
              director.pause(); //console.log("¡Tiempo agotado!");
            }
          }
        };

        _proto.formatTime = function formatTime(minutes, seconds) {
          var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
          var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
          return formattedMinutes + ":" + formattedSeconds;
        };

        return Timer;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "totalSeconds", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 60;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "totalSeconds2", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 60;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "gameOver", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "scoreText", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "manager", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "audioSource", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "clip", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "cubeta", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "barra", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Video.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, VideoPlayer, CCString, Input, input, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      VideoPlayer = module.VideoPlayer;
      CCString = module.CCString;
      Input = module.Input;
      input = module.input;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "bf1a4pN+4FPz5AlVRToiyZt", "Video", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Video = exports('Video', (_dec = ccclass('Video'), _dec2 = property(VideoPlayer), _dec3 = property(CCString), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Video, _Component);

        function Video() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "video", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "name2", _descriptor2, _assertThisInitialized(_this));

          _this.anim = false;
          return _this;
        }

        var _proto = Video.prototype;

        _proto.onLoad = function onLoad() {
          //this.video.play();
          //let canva = this.canvas;
          this.node.on(Input.EventType.TOUCH_END, this.playVideo, this);
          input.on(Input.EventType.KEY_DOWN, this.playVideo, this);
          this.video.node.on(VideoPlayer.EventType.CLICKED, this.playVideo, this); //this.video.node.on(VideoPlayer.EventType.STOPPED, this.cambio, this);
        };

        _proto.cambia = function cambia() {
          if (this.anim) {
            this.scheduleOnce(function () {
              this.cambio();
            }, 2);
          }
        };

        _proto.cambio = function cambio() {
          var _this2 = this;

          director.preloadScene(this.name2.toString(), function (completedCount, totalCount, item) {}, function (error, asset) {
            //do something after preloaded scene
            director.loadScene(_this2.name2.toString());
          });
        };

        _proto.start = function start() {};

        _proto.playVideo = function playVideo() {
          this.video.play();
          this.anim = true;
          console.log("reproduce video web");
          this.cambia();
        };

        _proto.update = function update(deltaTime) {};

        return Video;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "video", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "name2", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Wall.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Collider2D, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Collider2D = module.Collider2D;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "30bedv69WNBjpXgQQmlxSv9", "Wall", undefined);

      var ccclass = _decorator.ccclass;
      var Wall = exports('Wall', (_dec = ccclass('Wall'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Wall, _Component);

        function Wall() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = Wall.prototype;

        _proto.onLoad = function onLoad() {
          var collider = this.getComponent(Collider2D);
        }
        /*onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
            let ball = otherCollider.node.getComponent(RigidBody2D);
              if (ball) {
                // Obtener la velocidad actual de la pelota
                let ballVelocity = ball.linearVelocity;
                  // Calcular la nueva velocidad reflejada para simular el rebote
                let newVelocity = new Vec2();
                Vec2.negate(newVelocity, ballVelocity); // Reflejar la velocidad
                  // Aplicar la nueva velocidad a la pelota
                ball.linearVelocity = newVelocity;
            }
        }*/
        ;

        return Wall;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});