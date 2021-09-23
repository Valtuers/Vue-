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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/RenderDOM.js":
/*!**************************!*\
  !*** ./src/RenderDOM.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return RenderDOM; });\n/**\r\n * 把tokens转化DOM\r\n */\r\n class RenderDOM {\r\n    /** 初始化DOM字符串 */\r\n    constructor(){\r\n        this.resStr = '';\r\n    }\r\n\r\n    toDom(tokens,data){\r\n        for (const i in tokens) {\r\n            let token = tokens[i];\r\n\r\n            if(token[0] == 'text'){\r\n                this.resStr += token[1];\r\n            }else if(token[0] == 'name'){\r\n                this.resStr += this.lookUp(data,token[1]);\r\n            }else if(token[0] == '#'){\r\n                let arr = this.lookUp(data,token[1]);\r\n                for (const j in arr) {\r\n                    this.toDom(token[2],arr[j]);\r\n                }\r\n            }\r\n        }\r\n\r\n        return this.resStr;\r\n    }\r\n\r\n    /*\r\n        可以寻找data里深层次的数据\r\n    */\r\n    lookUp(dataObj,keyName){\r\n        let value = '';\r\n        if(keyName != '.'){\r\n            let tempData = dataObj;\r\n            let keyArr = keyName.split(\".\");\r\n            value = keyArr.reduce((lastValue,nVal) => lastValue[nVal],tempData);\r\n        }else {\r\n            value = dataObj;\r\n        }\r\n\r\n        return value;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/RenderDOM.js?");

/***/ }),

/***/ "./src/Scanner.js":
/*!************************!*\
  !*** ./src/Scanner.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Scanner; });\n/**\r\n * 根据特定符号扫描模板\r\n */\r\n class Scanner{\r\n    constructor(templateStr){\r\n        this.templateStr = templateStr;\r\n        this.tail = templateStr;\r\n        this.pos = 0;\r\n    }\r\n    /**\r\n     * 扫描特定符号，移动指针\r\n     * @param {String} tag\r\n     */\r\n    scan(tag){\r\n        if(this.tail.indexOf(tag) == 0){\r\n            this.pos += tag.length;\r\n            this.tail = this.templateStr.substr(this.pos);\r\n        }\r\n    }\r\n    /**\r\n     * 扫描特定符号外的字符串，移动指针\r\n     * @param {String} tag\r\n     * @returns\r\n     */\r\n    scanUtil(tag){\r\n        const pos_backup = this.pos;\r\n        while(this.tail.indexOf(tag) != 0 && !this.eos()){\r\n            this.pos++;\r\n            this.tail = this.templateStr.substr(this.pos);\r\n        }\r\n        let res = this.templateStr.substring(pos_backup,this.pos);\r\n        return res;\r\n    }\r\n    /**\r\n     * 判断指针是否超出模板字符串长度\r\n     * @returns boolean\r\n     */\r\n    eos(){\r\n        return this.pos >= this.templateStr.length;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/Scanner.js?");

/***/ }),

/***/ "./src/Tokens.js":
/*!***********************!*\
  !*** ./src/Tokens.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Tokens; });\n/* harmony import */ var _Scanner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Scanner */ \"./src/Scanner.js\");\n\r\n/**\r\n * 把模板转化成tokens\r\n */\r\n class Tokens{\r\n    constructor(){\r\n    }\r\n    /**\r\n     * 把模板字符串转化成tokens数组\r\n     * @param {String} teStr\r\n     * @returns\r\n     */\r\n    toTokens(teStr){\r\n        let tokens = [];\r\n        let scanner = new _Scanner__WEBPACK_IMPORTED_MODULE_0__[\"default\"](teStr);\r\n        let word;\r\n        while(!scanner.eos()){\r\n            word = scanner.scanUtil(\"{{\");\r\n            //去掉自字符串中的头尾空格和回车符\r\n            word = word.replace(/(^\\s*)|(\\s*$)/g,\"\").replace(/[\\n]/g,\"\");\r\n            if(word != ''){\r\n                tokens.push([\"text\",word]);\r\n            }\r\n            scanner.scan(\"{{\");\r\n\r\n            word = scanner.scanUtil(\"}}\");\r\n            if(word != ''){\r\n                if(word[0] == \"#\"){\r\n                    tokens.push([\"#\",word.substring(1)]);\r\n                }else if(word[0] == \"/\"){\r\n                    tokens.push([\"/\",word.substring(1)]);\r\n                }else{\r\n                    tokens.push([\"name\",word]);\r\n                }\r\n                scanner.scan(\"}}\");\r\n            }\r\n        }\r\n\r\n        return this.nestTokens(tokens);\r\n    }\r\n    /**\r\n     * 把初始化的tokens按层次重新生成新的tokens\r\n     * @param {Array} tokens\r\n     * @returns\r\n     */\r\n    nestTokens(tokens){\r\n        let nestedTokens = [];\r\n        //栈\r\n        let stack = [];\r\n\r\n        let collector = nestedTokens;\r\n\r\n        for (const token of tokens) {\r\n            switch(token[0]){\r\n                case '#':\r\n                    collector.push(token);\r\n                    stack.push(token);\r\n                    collector = token[2] = [];\r\n                    break;\r\n                case '/':\r\n                    stack.pop();\r\n                    collector = stack.length > 0 ? stack[stack.length - 1][2] : nestedTokens;\r\n                    break;\r\n                default:\r\n                    collector.push(token);\r\n            }\r\n        }\r\n        return nestedTokens;\r\n    }\r\n }\n\n//# sourceURL=webpack:///./src/Tokens.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Tokens__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tokens */ \"./src/Tokens.js\");\n/* harmony import */ var _RenderDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RenderDOM */ \"./src/RenderDOM.js\");\n\r\n\r\n/**\r\n * 入口文件\r\n */\r\nwindow.LTE = {\r\n    render(teStr,data){\r\n        let tokens = new _Tokens__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().toTokens(teStr);\r\n        return new _RenderDOM__WEBPACK_IMPORTED_MODULE_1__[\"default\"]().toDom(tokens,data);\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });