/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ToyReact.js":
/*!*********************!*\
  !*** ./ToyReact.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.ToyReact = void 0;\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar ElementWrapper = /*#__PURE__*/function () {\n  function ElementWrapper(type) {\n    _classCallCheck(this, ElementWrapper);\n\n    this.root = document.createElement(type);\n  }\n\n  _createClass(ElementWrapper, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      this.root.setAttribute(name, value);\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(vchild) {\n      vchild.mountTo(this.root);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return ElementWrapper;\n}();\n\nvar TextWrapper = /*#__PURE__*/function () {\n  function TextWrapper(content) {\n    _classCallCheck(this, TextWrapper);\n\n    this.root = document.createTextNode(content);\n  }\n\n  _createClass(TextWrapper, [{\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return TextWrapper;\n}();\n\nvar ToyReact = {\n  createElement: function createElement(type, attributes) {\n    // console.log(arguments)\n    var element;\n\n    if (typeof type === 'string') {\n      element = new ElementWrapper(type);\n    } else {\n      element = new type(); // Blean 那些？？？\n    } // debugger;\n\n\n    for (var name in attributes) {\n      element.setAttribute(name, attributes[name]);\n    }\n\n    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n      children[_key - 2] = arguments[_key];\n    }\n\n    for (var _i = 0, _children = children; _i < _children.length; _i++) {\n      var child = _children[_i];\n\n      if (typeof child === 'string') {\n        child = new TextWrapper(child);\n      }\n\n      console.log(element);\n      element.appendChild(child);\n    }\n\n    return element;\n  },\n  render: function render(vdom, element) {\n    vdom.mountTo(element);\n  }\n};\n/* \n\nexport let ToyReact = {\n    createElement(type,attributes,...children){\n        // console.log(arguments)\n        let element = document.createElement(type)\n        // debugger;\n        for (let name in attributes) {\n            element.setAttribute(name, attributes[name])\n        }\n        for(let child of children) {\n            if(typeof child === 'string'){\n                child = document.createTextNode(child)\n            }\n            element.appendChild(child)\n        }\n        return element;\n    },\n\n    render(vdom, element){\n        element.mountTo(element)\n    }\n}\n */\n\nexports.ToyReact = ToyReact;\n\n//# sourceURL=webpack:///./ToyReact.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _ToyReact = __webpack_require__(/*! ./ToyReact.js */ \"./ToyReact.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n// class MyComponent {\n// }\n// let a = <MyComponent name=\"a\" />\n// MyComponent 和 div 小写是有区别的\n// let a = <div name=\"a\" id=\"ida\">\n//     <span>hello</span>\n//     <span>world</span>\n//     <span>！</span>\n// </div>\n// console.log(a)\n\n/*\nvar a = _ToyReact.ToyReact.createElement(\"div\", {\n    name: \"a\",\n    id: \"ida\"\n  }, \n  _ToyReact.ToyReact.createElement(\"span\", null, \"hello\"), \n  _ToyReact.ToyReact.createElement(\"span\", null, \"world\"), \n  _ToyReact.ToyReact.createElement(\"span\", null, \"\\uFF01\"))\n\n  */\n// document.body.appendChild(a)\n// var a = createElement(MyComponent, {\n//     name: \"a\"\n//   });\n// 改进\nvar MyComponent = /*#__PURE__*/function () {\n  function MyComponent() {\n    _classCallCheck(this, MyComponent);\n  }\n\n  _createClass(MyComponent, [{\n    key: \"render\",\n    value: function render() {\n      return _ToyReact.ToyReact.createElement(\"div\", null, \"cool\");\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      this[name] = value;\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      var vdom = this.render();\n      vdom.mountTo(parent);\n    }\n  }]);\n\n  return MyComponent;\n}();\n\nvar a = _ToyReact.ToyReact.createElement(MyComponent, {\n  name: \"a\",\n  id: \"ida\"\n}); // 模仿react\n\n\n_ToyReact.ToyReact.render(a, document.body);\n\n//# sourceURL=webpack:///./main.js?");

/***/ })

/******/ });