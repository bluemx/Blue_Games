System.register("chunks:///_virtual/CambioEscena.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "a48baiLPJZH0ZuTOXOehLF3", "CambioEscena", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var CambioEscena = exports('CambioEscena', (_dec = ccclass('CambioEscena'), _dec2 = property(String), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
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

System.register("chunks:///_virtual/Collision.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ObjetoBueno.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, AudioSource, Prefab, Collider2D, Contact2DType, Sprite, Color, instantiate, Component, ObjetoBueno;

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
      AudioSource = module.AudioSource;
      Prefab = module.Prefab;
      Collider2D = module.Collider2D;
      Contact2DType = module.Contact2DType;
      Sprite = module.Sprite;
      Color = module.Color;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      ObjetoBueno = module.ObjetoBueno;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

      cclegacy._RF.push({}, "3c570/V0J5LRrXZZgUF4vV9", "Collision", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Collision = exports('Collision', (_dec = ccclass('Collision'), _dec2 = property(Label), _dec3 = property(AudioSource), _dec4 = property(Prefab), _dec5 = property(Prefab), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Collision, _Component);

        function Collision() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "score", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "temp", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "scoreText", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "audioSource", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "particule", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "papas", _descriptor6, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Collision.prototype;

        _proto.onLoad = function onLoad() {
          //particule.stopSytem();
          var collider = this.node.getComponent(Collider2D);

          if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onContact, this);
            collider.on(Contact2DType.END_CONTACT, this.offContact, this);
          }
        };

        _proto.start = function start() {};

        _proto.update = function update(deltaTime) {};

        _proto.destruye = function destruye(no) {
          this.scheduleOnce(function () {
            no.destroy();
          }, 2);
        };

        _proto.offContact = function offContact() {
          var sprite = this.node.getComponent(Sprite);
          sprite.color = Color.WHITE;
        };

        _proto.onContact = function onContact(selfCollider, otherCollider, contact) {
          var sprite = this.node.getComponent(Sprite);

          if (otherCollider.group == 2) {
            this.temp = otherCollider.node;
            this.audioSource.clip = this.temp.getComponent(ObjetoBueno).audio;
            this.audioSource.play();
            var node = instantiate(this.particule);
            node.parent = this.node;
            this.destruye(node);
            this.score += this.temp.getComponent(ObjetoBueno).puntos;
            this.scoreText.string = this.score.toString();
            sprite.color = Color.GREEN;
            this.temp.getComponent(ObjetoBueno).meDestruyo();
          } else if (otherCollider.group == 4) {
            this.temp = otherCollider.node;
            this.audioSource.clip = this.temp.getComponent(ObjetoBueno).audio;
            this.audioSource.play();
            var papa = instantiate(this.papas);
            papa.parent = this.node;
            this.destruye(papa);
            if (this.score > 0) this.score -= this.temp.getComponent(ObjetoBueno).puntos;
            this.scoreText.string = this.score.toString();
            sprite.color = Color.RED;
            this.temp.getComponent(ObjetoBueno).meDestruyo();
          }
        };

        return Collision;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "score", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "temp", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "scoreText", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "audioSource", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "particule", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "papas", [_dec5], {
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

System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Canvas, UITransform, instantiate, Label, Color, RichText, Toggle, Button, director, Component;

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
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      Color = module.Color;
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

      cclegacy._RF.push({}, "ccc58szZDxEnL6JkzAdymuf", "InputManager", undefined);

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

          if (InputManager._instance) {
            this.destroy();
            return;
          }

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

System.register("chunks:///_virtual/intrucciones.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
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
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "289a05z3x9IgpMIyl6lnAHo", "intrucciones", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var intrucciones = exports('intrucciones', (_dec = ccclass('intrucciones'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(intrucciones, _Component);

        function intrucciones() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "Ins", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "intruccionesPc", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "intruccionesCel", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "boton", _descriptor4, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = intrucciones.prototype;

        _proto.onLoad = function onLoad() {
          this.Ins.active = true;
          this.intruccionesPc.active = false;
          this.intruccionesCel.active = false;
          this.boton.active = false;
        };

        _proto.start = function start() {};

        _proto.siguient = function siguient() {
          this.intruccionesPc.active = true;
          this.intruccionesCel.active = true;
          this.boton.active = true;
          this.Ins.active = false;
        };

        _proto.update = function update(deltaTime) {};

        return intrucciones;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "Ins", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "intruccionesPc", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "intruccionesCel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "boton", [_dec5], {
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

System.register("chunks:///_virtual/Items.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, instantiate, randomRangeInt, Vec3, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      randomRangeInt = module.randomRangeInt;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

      cclegacy._RF.push({}, "d5f21M2djRHypvBOGkeVqeP", "Items", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Items = exports('Items', (_dec = ccclass('Items'), _dec2 = property([Prefab]), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Items, _Component);

        function Items() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "Target", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "min", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "max", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "time", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "prefab", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "creando", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "constatey", _descriptor7, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Items.prototype; //@property(Node)
        //public game: Node = null;

        _proto.start = function start() {
          this.creando = false;
        };

        _proto.onLoad = function onLoad() {
          var node = instantiate(this.prefab[0]);
          node.parent = this.node;
          this.crea();
          this.schedule(function () {
            this.time -= 0.2;

            if (this.time <= 0.4) {
              this.time = 0.4;
            }
          }, 2);
        };

        _proto.crea = function crea() {
          var x = this.randInRange(this.min, this.max);
          var Inst = randomRangeInt(-10, 10);

          if (Inst >= 1) {
            var y = randomRangeInt(0, 3);
            this.constatey = y;

            switch (y) {
              case 0:
                var node1 = instantiate(this.prefab[0]);
                node1.parent = this.node;
                node1.setPosition(new Vec3(x, node1.getParent().position.y, 0));
                this.creando = false;
                break;

              case 1:
                var node2 = instantiate(this.prefab[2]);
                node2.parent = this.node;
                node2.setPosition(new Vec3(x, node2.getParent().position.y, 0));
                this.creando = false;
                break;

              case 2:
                var node3 = instantiate(this.prefab[3]);
                node3.parent = this.node;
                node3.setPosition(new Vec3(x, node3.getParent().position.y, 0));
                this.creando = false;
                break;

              case 3:
                var node4 = instantiate(this.prefab[4]);
                node4.parent = this.node;
                node4.setPosition(new Vec3(x, node4.getParent().position.y, 0));
                this.creando = false;
                break;
            }
          } else {
            var node = instantiate(this.prefab[1]);
            node.parent = this.node;
            node.setPosition(new Vec3(x, node.getParent().position.y, 0));
            this.creando = false;
          }
        };

        _proto.randInRange = function randInRange(min, max) {
          return Math.random() * (max - min) + min;
        };

        _proto.update = function update(deltaTime) {
          if (!this.creando) {
            this.creando = true;
            this.scheduleOnce(function () {
              this.crea();
            }, this.time);
          }
        };

        return Items;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "Target", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3();
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "min", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return -500;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "max", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 500;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "time", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "prefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "creando", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "constatey", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './CambioEscena.ts', './Collision.ts', './InputManager.ts', './Items.ts', './Manager_Pausa.ts', './MovimientoCubeta.ts', './ObjetoBueno.ts', './SecuenciaInstrucciones.ts', './SomeOtherScript.ts', './Timer.ts', './TimerInst.ts', './intrucciones.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/Manager_Pausa.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, find, director, Component;

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
      find = module.find;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

      cclegacy._RF.push({}, "b0a37HUyJ5Pe7x9dSaQK95H", "Manager_Pausa", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Manager_Pausa = exports('Manager_Pausa', (_dec = ccclass('Manager_Pausa'), _dec2 = property(Boolean), _dec3 = property(Boolean), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Manager_Pausa, _Component);

        function Manager_Pausa() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "isPause", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "subMenu", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "MenuPausa", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "Sub", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "gameOver", _descriptor5, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Manager_Pausa.prototype;

        _proto.onLoad = function onLoad() {
          this.MenuPausa = find("Canvas/pausa");
          this.Sub = find("Canvas/Config");
          this.MenuPausa.active = false;
          this.Sub.active = false;
          this.gameOver.active = false;
        };

        _proto.start = function start() {};

        _proto.pausa = function pausa() {
          if (!this.isPause) {
            director.pause();
            this.MenuPausa.active = true;
            console.log("!pausa!" + director.isPaused().toString());
            this.isPause = true;
          } else {
            director.resume();
            this.isPause = false;
            this.subMenu = false;
            this.MenuPausa.active = false;
            console.log("!c!");
          }
        };

        _proto.SubMenu = function SubMenu() {
          this.MenuPausa.active = false;
          this.Sub.active = true;
        };

        _proto.cierraSubMenu = function cierraSubMenu() {
          this.MenuPausa.active = true;
          this.Sub.active = false;
        };

        _proto.salirJuego = function salirJuego() {
          this.MenuPausa.active = false;
          this.Sub.active = false;
          this.isPause = false;
          this.gameOver.active = false;
          director.resume();
        };

        _proto.update = function update(deltaTime) {};

        return Manager_Pausa;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "isPause", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "subMenu", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "MenuPausa", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "Sub", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "gameOver", [_dec6], {
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

System.register("chunks:///_virtual/MovimientoCubeta.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './InputManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Vec3, input, Input, KeyCode, Component, InputManager;

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
      input = module.input;
      Input = module.Input;
      KeyCode = module.KeyCode;
      Component = module.Component;
    }, function (module) {
      InputManager = module.InputManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

      cclegacy._RF.push({}, "2d341SxT4xMl53V+QolgrSn", "MovimientoCubeta", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var MovimientoCubeta = exports('MovimientoCubeta', (_dec = ccclass('MovimientoCubeta'), _dec2 = property(Node), _dec3 = property(Vec3), _dec4 = property(Vec3), _dec5 = property(Vec3), _dec6 = property(Vec3), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MovimientoCubeta, _Component);

        function MovimientoCubeta() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "limiteIzq", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "limiteDer", _descriptor2, _assertThisInitialized(_this));

          _this.inputManager = void 0;

          _initializerDefineProperty(_this, "nodeImage", _descriptor3, _assertThisInitialized(_this));

          _this.posY = void 0;

          _initializerDefineProperty(_this, "speed", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "targetPosition", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "moveDirection", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "newPosition", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "flechas", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "touch", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "transf", _descriptor10, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = MovimientoCubeta.prototype;

        _proto.onLoad = function onLoad() {
          this.posY = this.nodeImage.getWorldPosition();
          input.on(Input.EventType.KEY_DOWN, this.Teclas, this);
          this.nodeImage.on(Input.EventType.TOUCH_START, this.Touch, this);
          /*this.nodeImage.on(Node.EventType.TOUCH_MOVE,(event:EventTouch)=>{
              let loc=event.getLocation();
              
              this.nodeImage.setWorldPosition(new Vec3(loc.x, this.posY.y, 0));
              
          })
            this.nodeImage.on(Node.EventType.TOUCH_END,(event:EventTouch)=>{
            })
            this.nodeImage.on(Node.EventType.TOUCH_CANCEL,(event:EventTouch)=>{
              
          })*/
        };

        _proto.Detener = function Detener() {
          if (this.nodeImage.position.x <= this.limiteIzq) {
            this.nodeImage.setPosition(new Vec3(this.limiteIzq, 20, 0));
          }

          if (this.nodeImage.position.x >= this.limiteDer) {
            this.nodeImage.setPosition(new Vec3(this.limiteDer, 20, 0));
          }
        };

        _proto.Touch = function Touch() {
          var _this2 = this;

          this.nodeImage.on(Node.EventType.TOUCH_MOVE, function (event) {
            _this2.touch = true;
            var loc = event.getUILocation();

            _this2.nodeImage.setWorldPosition(new Vec3(loc.x, _this2.posY.y, 0));

            _this2.suelta();
          });
          this.nodeImage.on(Node.EventType.TOUCH_END, function (event) {});
          this.nodeImage.on(Node.EventType.TOUCH_CANCEL, function (event) {});
        };

        _proto.NoTeclas = function NoTeclas() {
          this.flechas = false;
        };

        _proto.Teclas = function Teclas() {
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

        _proto.update = function update(deltaTime) {
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
              this.moveDirection.x -= 1;
            }

            if (InputManager.isKeyPressed(KeyCode.ARROW_RIGHT)) {
              this.moveDirection.x += 1;
            } ///*
            //OPTIM


            Vec3.normalize(this.moveDirection, this.moveDirection);
            Vec3.scaleAndAdd(this.targetPosition, this.targetPosition, this.moveDirection, this.speed * deltaTime);
            var lerpFactor = 1 - Math.pow(0.001, deltaTime);
            Vec3.lerp(this.newPosition, new Vec3(this.nodeImage.position.x, 0, 0), this.targetPosition, lerpFactor);
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

        return MovimientoCubeta;
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
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nodeImage", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "speed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 500;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "targetPosition", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3();
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "moveDirection", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3();
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "newPosition", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3();
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "flechas", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "touch", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "transf", [_dec6], {
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

System.register("chunks:///_virtual/ObjetoBueno.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, AudioClip, Collider2D, Contact2DType, Sprite, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioClip = module.AudioClip;
      Collider2D = module.Collider2D;
      Contact2DType = module.Contact2DType;
      Sprite = module.Sprite;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "dc340ocZUxEcKIusiqlc/Tl", "ObjetoBueno", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ObjetoBueno = exports('ObjetoBueno', (_dec = ccclass('ObjetoBueno'), _dec2 = property(AudioClip), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ObjetoBueno, _Component);

        function ObjetoBueno() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "puntos", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "audio", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ObjetoBueno.prototype;

        _proto.start = function start() {
          //console.log(this.node.getComponent(Collider2D).group);
          var collider = this.node.getComponent(Collider2D);

          if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onContact, this);
          }
        };

        _proto.update = function update(deltaTime) {};

        _proto.meDestruyo = function meDestruyo() {
          this.node.getComponent(Sprite).enabled = false;
          setTimeout(function () {
            // console.log("me destryo");
            this.node.destroy();
          }.bind(this), 2);
        };

        _proto.contactoObjetos = function contactoObjetos() {};

        _proto.onContact = function onContact(selfCollider, otherCollider, contact) {
          var sprite = this.node.getComponent(Sprite);

          if (otherCollider.group == 8) {
            this.meDestruyo();
          }
        };

        return ObjetoBueno;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "puntos", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "audio", [_dec2], {
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

System.register("chunks:///_virtual/SecuenciaInstrucciones.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Animation, AnimationClip, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Animation = module.Animation;
      AnimationClip = module.AnimationClip;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "ef059pp62NOOJZk5960zG8u", "SecuenciaInstrucciones", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var SecuenciaInstrucciones = exports('SecuenciaInstrucciones', (_dec = ccclass('SecuenciaInstrucciones'), _dec2 = property(Animation), _dec3 = property(AnimationClip), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SecuenciaInstrucciones, _Component);

        function SecuenciaInstrucciones() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "anim", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "secuencia", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "index", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = SecuenciaInstrucciones.prototype;

        _proto.onLoad = function onLoad() {
          director.resume();
          this.index = 0;
        };

        _proto.reproducir = function reproducir() {
          this.anim.play();
          /*if(this.anim.stop && this.index<this.secuencia.length)
          {
           this.clickNext();
          }*/
        };

        _proto.Carga = function Carga() {
          director.loadScene("Juego");
        };

        _proto.start = function start() {//this.reproducir();
        };

        _proto.clickNext = function clickNext() {
          if (this.index < this.secuencia.length) {
            this.index++;

            if (this.index >= this.secuencia.length) {
              this.Carga();
            }

            this.anim.defaultClip = this.secuencia[this.index];
            this.anim.play();
          } //director.loadScene("Juego");

        };

        _proto.update = function update(deltaTime) {};

        return SecuenciaInstrucciones;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "anim", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "secuencia", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "index", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SomeOtherScript.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './InputManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Vec3, KeyCode, Component, InputManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      KeyCode = module.KeyCode;
      Component = module.Component;
    }, function (module) {
      InputManager = module.InputManager;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "b6488ksE5xJV4djxb/xroOu", "SomeOtherScript", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var SomeOtherScript = exports('SomeOtherScript', (_dec = ccclass('SomeOtherScript'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SomeOtherScript, _Component);

        function SomeOtherScript() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "speed", _descriptor, _assertThisInitialized(_this));

          _this.targetPosition = new Vec3();
          _this.moveDirection = new Vec3();
          _this.newPosition = new Vec3();
          return _this;
        }

        var _proto = SomeOtherScript.prototype;

        _proto.onLoad = function onLoad() {
          Vec3.copy(this.targetPosition, this.node.position);
        };

        _proto.update = function update(deltaTime) {
          this.moveDirection.x = 0;
          this.moveDirection.y = 0;
          /*if(InputManager.isKeyPressed(KeyCode.ARROW_UP)){
              this.moveDirection.y += 1
          }
          if(InputManager.isKeyPressed(KeyCode.ARROW_DOWN)){
              this.moveDirection.y -= 1
          }*/

          if (InputManager.isKeyPressed(KeyCode.ARROW_LEFT)) {
            this.moveDirection.x -= 1;
          }

          if (InputManager.isKeyPressed(KeyCode.ARROW_RIGHT)) {
            this.moveDirection.x += 1;
          } ///*
          //OPTIM


          Vec3.normalize(this.moveDirection, this.moveDirection);
          Vec3.scaleAndAdd(this.targetPosition, this.targetPosition, this.moveDirection, this.speed * deltaTime);
          var lerpFactor = 1 - Math.pow(0.001, deltaTime);
          Vec3.lerp(this.newPosition, this.node.position, this.targetPosition, lerpFactor);
          this.node.setPosition(this.newPosition);
        };

        return SomeOtherScript;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "speed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 500;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Timer.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Collision.ts', './MovimientoCubeta.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Node, AudioSource, AudioClip, RigidBody2D, director, Component, Collision, MovimientoCubeta;

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
      Node = module.Node;
      AudioSource = module.AudioSource;
      AudioClip = module.AudioClip;
      RigidBody2D = module.RigidBody2D;
      director = module.director;
      Component = module.Component;
    }, function (module) {
      Collision = module.Collision;
    }, function (module) {
      MovimientoCubeta = module.MovimientoCubeta;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

      cclegacy._RF.push({}, "bd0b2iYqEdJ9LH+z88WHxvZ", "Timer", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Timer = exports('Timer', (_dec = ccclass('Timer'), _dec2 = property(Label), _dec3 = property(Node), _dec4 = property(Label), _dec5 = property(Collision), _dec6 = property(AudioSource), _dec7 = property(AudioClip), _dec8 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Timer, _Component);

        function Timer() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "timerLabel", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "totalSeconds", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "gameOver", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "scoreText", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "finalScore", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "audioSource", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "clip", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "cubeta", _descriptor8, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Timer.prototype;

        _proto.onLoad = function onLoad() {
          this.cubeta.getComponent(MovimientoCubeta).enabled = true;
          this.cubeta.getChildByName("Cubeta").getComponent(RigidBody2D).enabled = true;
        };

        _proto.start = function start() {
          this.gameOver.active = false;
          this.totalSeconds = 60; // Establecer el tiempo total en segundos

          this.schedule(this.updateTimer, 1, this.totalSeconds); // Llama a updateTimer cada segundo durante el tiempo total
        };

        _proto.quitaPausa = function quitaPausa() {
          director.resume();
        };

        _proto.updateTimer = function updateTimer() {
          this.totalSeconds--;

          if (this.totalSeconds < 0) {
            this.totalSeconds = 0; // Asegurar que no haya números negativos
          }

          var minutes = Math.floor(this.totalSeconds / 60);
          var seconds = this.totalSeconds % 60;
          this.timerLabel.string = this.formatTime(minutes, seconds);

          if (this.totalSeconds === 0) {
            // Aquí puedes agregar lógica adicional cuando el contador llega a cero
            this.cubeta.getComponent(MovimientoCubeta).enabled = false;
            this.cubeta.getChildByName("Cubeta").getComponent(RigidBody2D).enabled = false;
            this.gameOver.active = true;
            this.audioSource.clip = this.clip;
            this.audioSource.play();
            this.scoreText.string = this.finalScore.score.toString();
            director.pause();
            console.log("¡Tiempo agotado!");
          }
        };

        _proto.formatTime = function formatTime(minutes, seconds) {
          var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
          var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
          return formattedMinutes + ":" + formattedSeconds;
        };

        return Timer;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "timerLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "totalSeconds", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 60;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "gameOver", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "scoreText", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "finalScore", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "audioSource", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "clip", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "cubeta", [_dec8], {
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

System.register("chunks:///_virtual/TimerInst.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Collision.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, director, Component, Collision;

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
      director = module.director;
      Component = module.Component;
    }, function (module) {
      Collision = module.Collision;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "e1037NpJcZGWqsMSTQGRhng", "TimerInst", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Timer = exports('Timer', (_dec = ccclass('TimerInst'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Collision), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Timer, _Component);

        function Timer() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "timerLabel", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "totalSeconds", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "scoreText", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "finalScore", _descriptor4, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Timer.prototype;

        _proto.start = function start() {
          this.totalSeconds = 60; // Establecer el tiempo total en segundos

          this.schedule(this.updateTimer, 1, this.totalSeconds); // Llama a updateTimer cada segundo durante el tiempo total
        };

        _proto.quitaPausa = function quitaPausa() {
          director.resume();
        };

        _proto.updateTimer = function updateTimer() {
          this.totalSeconds--;

          if (this.totalSeconds < 0) {
            this.totalSeconds = 0; // Asegurar que no haya números negativos
          }

          var minutes = Math.floor(this.totalSeconds / 60);
          var seconds = this.totalSeconds % 60;
          this.timerLabel.string = this.formatTime(minutes, seconds);

          if (this.totalSeconds === 0) {
            // Aquí puedes agregar lógica adicional cuando el contador llega a cero
            console.log("¡Tiempo agotado!");
          }
        };

        _proto.formatTime = function formatTime(minutes, seconds) {
          var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
          var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
          return formattedMinutes + ":" + formattedSeconds;
        };

        return Timer;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "timerLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "totalSeconds", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 60;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "scoreText", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "finalScore", [_dec4], {
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