(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mymodule = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _index = _interopRequireDefault(require("../src/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var teX2Max = new _index["default"]();
window.teX2Max = teX2Max;

},{"../src/index":7}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Token = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author     André Storhaug <andr3.storhaug@gmail.com>
 * @copyright  2018 NTNU
 */

/**
 * Simple token class.
 */
var Token = function Token(type, value) {
  _classCallCheck(this, Token);

  this.value = value;
  this.type = type;
};

exports.Token = Token;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDelimiter = isDelimiter;
exports.DELIMITERS = void 0;

/**
 * @author     André Storhaug <andr3.storhaug@gmail.com>
 * @copyright  2019 NTNU
 */
var DELIMITERS = new Map([['left', 'right'], ['right', 'left']]);
exports.DELIMITERS = DELIMITERS;

function isDelimiter(delimiterName) {
  var isMatch = false;
  var delimiter = DELIMITERS.get(delimiterName);

  if (delimiter !== undefined) {
    isMatch = true;
  }

  return isMatch;
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.environments = void 0;

/**
 * @author     André Storhaug <andr3.storhaug@gmail.com>
 * @copyright  2018 NTNU
 */
var environments = ['matrix', 'pmatrix', 'bmatrix', 'Bmatrix', 'vmatrix', 'Vmatrix', 'smallmatrix'];
exports.environments = environments;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFunction = isFunction;
exports.getFunctionName = getFunctionName;
exports.isTrigonometricFunction = isTrigonometricFunction;
exports.getInverseTrigonometricFunction = getInverseTrigonometricFunction;
exports.TRIGONOMETRIC_FUNCTIONS = exports.FUNCTIONS = void 0;

var logger = _interopRequireWildcard(require("./logger"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @author     André Storhaug <andr3.storhaug@gmail.com>
 * @copyright  2018 NTNU
 */
var FUNCTIONS = new Map([['lg', null], ['log', null], ['ln', null], ['sqrt', null], ['max', null], ['min', null], ['sum', null], ['lim', null], ['int', 'integral'], ['binom', null], ['abs', null], ['arccos', 'acos'], ['arccosh', 'acosh'], ['arccot', 'acot'], ['arccoth', 'acoth'], ['arccsc', 'acsc'], ['arccsch', 'acsch'], ['arcsec', 'asec'], ['arcsech', 'asech'], ['arcsin', 'asin'], ['arcsinh', 'asinh'], ['arctan', 'atan'], ['arctanh', 'atanh']]);
exports.FUNCTIONS = FUNCTIONS;
var TRIGONOMETRIC_FUNCTIONS = [{
  name: 'cos',
  inverse: 'acos'
}, {
  name: 'cosh',
  inverse: 'acosh'
}, {
  name: 'cot',
  inverse: 'acot'
}, {
  name: 'coth',
  inverse: 'acoth'
}, {
  name: 'csc',
  inverse: 'acsc'
}, {
  name: 'csch',
  inverse: 'acsch'
}, {
  name: 'sec',
  inverse: 'asec'
}, {
  name: 'sech',
  inverse: 'asech'
}, {
  name: 'sin',
  inverse: 'asin'
}, {
  name: 'sinh',
  inverse: 'asinh'
}, {
  name: 'tan',
  inverse: 'atan'
}, {
  name: 'tanh',
  inverse: 'atanh'
}];
exports.TRIGONOMETRIC_FUNCTIONS = TRIGONOMETRIC_FUNCTIONS;

function isFunction(functionName) {
  var isMatch = false;

  if (isTrigonometricFunction(functionName)) {
    isMatch = true;
  } else {
    var func = FUNCTIONS.get(functionName);

    if (func !== undefined) {
      isMatch = true;
    }
  }

  return isMatch;
}

function getFunctionName(functionName) {
  var func;

  if (isTrigonometricFunction(functionName)) {
    func = functionName;
  } else {
    func = FUNCTIONS.get(functionName);

    if (func === null) {
      func = functionName;
    } else if (func === undefined) {
      throw new Error('Not recognised function: ' + func);
    }
  }

  return func;
}

function isTrigonometricFunction(func) {
  var name = TRIGONOMETRIC_FUNCTIONS.find(function (e) {
    return e.name === func;
  });
  var inverse = TRIGONOMETRIC_FUNCTIONS.find(function (e) {
    return e.inverse === func;
  });
  return name !== undefined || inverse !== undefined;
}

function getInverseTrigonometricFunction(func) {
  logger.debug('Getting the inverse of the function "' + func + '"');
  var inverseTrig;
  var foundInverseTrig = false;
  var i = 0;

  for (var key in TRIGONOMETRIC_FUNCTIONS) {
    if (TRIGONOMETRIC_FUNCTIONS[key].name === func) {
      foundInverseTrig = true;
      inverseTrig = TRIGONOMETRIC_FUNCTIONS[key].inverse;
    } else if (TRIGONOMETRIC_FUNCTIONS[key].inverse === func) {
      foundInverseTrig = true;
      inverseTrig = TRIGONOMETRIC_FUNCTIONS[key].name;
    }

    i++;
  }

  if (inverseTrig === undefined) return null;
  logger.debug('- Found the inverse: ' + inverseTrig);
  return inverseTrig;
}

},{"./logger":9}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEquation = isEquation;
exports.checkForVariable = checkForVariable;
exports.buildMaximaFunctionString = buildMaximaFunctionString;
exports.searchForOccurrence = searchForOccurrence;
exports.wrapForTranspilation = wrapForTranspilation;
exports.stripParenthesis = stripParenthesis;
exports.stripAllParenthesis = stripAllParenthesis;

var logger = _interopRequireWildcard(require("../logger"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Whether or not the object is an equation or an expression
 * @return {boolean} true if expression
 */
function isEquation(parsedLatex) {
  var numEqualSigns = 0;
  parsedLatex.forEach(function (e) {
    if (e.type === 'operator' && e.value === '=') {
      numEqualSigns++;
    }
  });

  if (numEqualSigns === 1) {
    return true;
  } else if (numEqualSigns > 1) {
    throw new Error('Expression contains more than one equal signs');
  } else {
    return false;
  }
}
/**
 * Check if an mathematical expression passed as an array of tokens
 * contains any variables.
 *
 * @param {(string|Array)} parsedLatex Mathematical expression composed of an array of tokens
 * @return {boolean} Returns true if parsedLatex parameter contains any variables.
 */


function checkForVariable(parsedLatex) {
  logger.debug('Checking expression ' + JSON.stringify(parsedLatex) + ' for variable');
  var containsVariable = false;

  if (Array.isArray(parsedLatex)) {
    for (var i = 0; i < parsedLatex.length; i++) {
      if (parsedLatex[i].type === 'group') {
        var containsGroupVariable = checkForVariable(parsedLatex[i].value);

        if (containsGroupVariable) {
          containsVariable = true;
        }
      } else {
        if (parsedLatex[i].type === 'variable') {
          containsVariable = true;
        }
      }
    }
  } else {
    if (parsedLatex.type === 'variable') {
      containsVariable = true;
    } else {
      containsVariable = false;
    }
  }

  return containsVariable;
}

function buildMaximaFunctionString(functionName, expression) {
  var maximaFunctionString = "";
  maximaFunctionString += functionName + '(' + expression;

  for (var _len = arguments.length, arg = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    arg[_key - 2] = arguments[_key];
  }

  arg.forEach(function (e) {
    if (e !== false && e !== null && e !== undefined) {
      maximaFunctionString += ',' + e;
    }
  });
  maximaFunctionString += ')';
  return maximaFunctionString;
}
/**
 * Search for an object key value's first occurrence in an array passed as parameter,
 * matching the type and string passed as parameters.
 *
 * @param {(Object|Array)} parsedLatex Mathematical expression composed of an array of tokens
 * @param {string} tokenType The type to search for. Either 'type' or 'value'
 * @param {string} query The string to search for
 * @param {boolean} deepSearch Whether or not to search in all array dimensions
 * @return {Object<string, Array<number|...Array<number>>>} Returns true if search criteria matches, false otherwise
 */


function searchForOccurrence(parsedLatex, tokenType, query, deepSearch) {
  var isPresent = false;
  var isPresentInGroup = false;
  var position = [];

  if (Array.isArray(parsedLatex)) {
    for (var i = 0; i < parsedLatex.length; i++) {
      if (parsedLatex[i].type === 'group' && deepSearch) {
        var group = void 0;

        if (tokenType === 'type') {
          group = searchForOccurrence(parsedLatex[i].type, 'type', query, true);
          isPresentInGroup = group.isPresent;
        } else if (tokenType === 'value') {
          group = searchForOccurrence(parsedLatex[i].value, 'value', query, true);
          isPresentInGroup = group.isPresent;
        }

        if (isPresentInGroup) {
          position.push(group.position);
          isPresent = true;
        }
      } else {
        if (tokenType === 'type') {
          if (parsedLatex[i].type === query) {
            isPresent = true;
            position.push(i);
          }
        } else if (tokenType === 'value') {
          if (parsedLatex[i].value === query) {
            isPresent = true;
            position.push(i);
          }
        }
      }
    }
  } else {
    if (tokenType === 'type') {
      if (parsedLatex.type === query) {
        isPresent = true;
        position = 0;
      }
    } else if (tokenType === 'value') {
      if (parsedLatex.value === query) {
        isPresent = true;
        position = null;
      }
    } else {
      isPresent = false;
    }
  }

  var isPresentObj = {
    isPresent: isPresent,
    position: position
  };
  return isPresentObj;
}

function wrapForTranspilation(item) {
  if (Array.isArray(item)) {
    return item;
  } else if (_typeof(item) === "object" && typeof item !== "string") {
    return [item];
  }
}

function stripParenthesis(mathString) {
  var openingParenthesis = mathString.charAt(0);
  var closingParenthesis = mathString.charAt(-1);

  if (openingParenthesis.match(/[({\[]/) || closingParenthesis.match(/[)}\]]/)) {
    return mathString.substr(1, mathString.length - 2);
  } else {
    return mathString;
  }
}

function stripAllParenthesis(mathString) {
  return mathString.replace(/[()]/g, '');
}

},{"../logger":9}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var logger = _interopRequireWildcard(require("./logger"));

var _options = require("./options");

var _scanner = require("./scanner");

var _lexer = require("./lexer");

var _parser = require("./parser");

var _maximaTranspiler = require("./transpiler/maxima-transpiler");

var _helpers = require("./helpers/helpers");

var _postParser = require("./post-parser");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/********************************************************
 * The publicly exposed tex2max API.
 ********************************************************/

/**
 * Globally exported API class.
 * Represents a TeX2Max class for handling translation/transpilation of LaTeX to Maxima code.
 * @param  {Object} userOptions Optional options
 */
var TeX2Max =
/*#__PURE__*/
function () {
  function TeX2Max(userOptions) {
    _classCallCheck(this, TeX2Max);

    (0, _options.setOptions)(userOptions);
    this.options = (0, _options.getOptions)();
    this.lastInput = "";
    this.lastResult = "";
  }
  /**
   * Gets the last latex input.
   * @returns {string}
   */


  _createClass(TeX2Max, [{
    key: "getLastInput",
    value: function getLastInput() {
      return this.lastInput();
    }
    /**
     * Gets the last conversion result.
     * @returns {string} the last conversion result (Maxima code)
     */

  }, {
    key: "getLastResult",
    value: function getLastResult() {
      return this.lastResult;
    }
    /**
     * Updates the TeX2Max options. If one or more settings passed as parameter are missing,
     * defaults defined in {@link DEFAULTS} will be used
     * @param userOptions
     */

  }, {
    key: "updateOptions",
    value: function updateOptions(userOptions) {
      (0, _options.setOptions)(userOptions);
      this.options = (0, _options.getOptions)();
    }
    /**
     * Converts a latex input string to Maxima code.
     * @param  {String} latex The latex to parse
     * @returns {*}
     */

  }, {
    key: "toMaxima",
    value: function toMaxima(latex) {
      (0, _options.setOptions)(this.options);
      var maximaExpression;
      this.lastInput = latex;
      var scannerResult = (0, _scanner.scan)(latex);
      logger.debug(scannerResult);
      var lexerResult = (0, _lexer.lex)(scannerResult);
      logger.debug(lexerResult);
      var parsedLatex = (0, _parser.parseLatex)(lexerResult);
      logger.debug(parsedLatex);
      this.structure = (0, _postParser.postParse)(parsedLatex);
      logger.debug(this.structure);
      var transpiledExpression = (0, _maximaTranspiler.transpiler)(this.structure);
      maximaExpression = (0, _helpers.stripParenthesis)(transpiledExpression); // Handle equation

      if (this.options.handleEquation && (0, _helpers.isEquation)(this.structure)) {
        maximaExpression = 'solve(' + maximaExpression + ')';
      }

      this.lastResult = maximaExpression;
      return maximaExpression;
    }
  }]);

  return TeX2Max;
}();

var _default = TeX2Max;
exports["default"] = _default;

},{"./helpers/helpers":6,"./lexer":8,"./logger":9,"./options":11,"./parser":12,"./post-parser":13,"./scanner":15,"./transpiler/maxima-transpiler":24}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lex = lex;

var _tokens = require("./tokens/tokens");

var _Token = require("./Token");

var logger = _interopRequireWildcard(require("./logger"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @author     André Storhaug <andr3.storhaug@gmail.com>
 * @copyright  2018 NTNU
 */

/**
 * Represents a lexer used for providing lexical analysis on a
 * array of strings, based on a set of tokens..
 */
function lex(lexemes) {
  var index = 0;
  var tokenList = [];

  var addToken = function addToken(token) {
    return tokenList.push(token);
  };

  var getTokenList = function getTokenList() {
    return tokenList;
  };

  function consume() {
    logger.debug("Consuming position: " + index + ", char: " + lexemes[index]);
    return lexemes[index++];
  }

  function peek() {
    return lexemes[index + 1] !== null ? lexemes[index + 1] : null;
  }

  function findMatchingTokenTypeByString(lexeme) {
    var tokenType = null;

    if (lexeme === undefined) {
      return null;
    }

    for (var token in _tokens.TOKEN_TYPES) {
      if (!_tokens.TOKEN_TYPES.hasOwnProperty(token)) {
        continue;
      }

      var _tokenType = _tokens.TOKEN_TYPES[token];
      var regex = _tokenType.regex;

      if (lexeme.match(regex)) {
        return _tokenType;
      }
    }

    return tokenType;
  }

  function startLexing() {
    logger.debug("\n------------------ LEXICAL ANALYSIS -> -------------------");

    while (index < lexemes.length) {
      var token = void 0;
      var tokenValue = "";
      var tokenType = findMatchingTokenTypeByString(lexemes[index]);
      tokenValue = consume();
      token = new _Token.Token(tokenType, tokenValue);

      if (token !== undefined) {
        addToken(token);
      }
    }

    return getTokenList();
  }

  return startLexing();
}

},{"./Token":2,"./logger":9,"./tokens/tokens":17}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warn = warn;
exports.debug = void 0;

var _options = require("./options");

/**
 * @author     André Storhaug <andr3.storhaug@gmail.com>
 * @copyright  2018 NTNU
 */
var debug = function debug(msg) {
  var options = (0, _options.getOptions)();
  var debugging = options.debugging;

  if (debugging) {
    console.debug(msg);
  }
};

exports.debug = debug;

function warn(msg) {
  var warning = true;

  if (warning) {
    console.warn(msg);
  }
}

},{"./options":11}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMacro = isMacro;
exports.isIgnoredMacro = isIgnoredMacro;
exports.MACROS_OVERRIDE = exports.IGNORED_MACROS = exports.MACROS = void 0;

/**
 * @author     André Storhaug <andr3.storhaug@gmail.com>
 * @copyright  2018 NTNU
 */
var MACROS = new Map([['begin', null], ['end', null], ['to', null], ['cdot', null], ['times', null], ['ast', null], ['div', null], ['mod', null], ['pm', null], ['frac', null], ['infty', 'inf'], ['operatorname', null] // ['mathrm', null],
]);
exports.MACROS = MACROS;
var IGNORED_MACROS = []; // Override macro nodes

exports.IGNORED_MACROS = IGNORED_MACROS;
var MACROS_OVERRIDE = new Map([['cdot', {
  type: 'operator',
  operatorType: 'infix',
  value: '*'
}], ['times', {
  type: 'operator',
  operatorType: 'infix',
  value: '*'
}], ['ast', {
  type: 'operator',
  operatorType: 'infix',
  value: '*'
}], ['div', {
  type: 'operator',
  operatorType: 'infix',
  value: '/'
}], ['mod', {
  type: 'operator',
  operatorType: 'infix',
  value: '%'
}], ['pm', {
  type: 'operator',
  operatorType: 'infix',
  value: '+-'
}] // The sign ± dosn't work with Maxima.
]);
exports.MACROS_OVERRIDE = MACROS_OVERRIDE;

function isMacro(macroName) {
  var isMatch = false;
  var macro = MACROS.get(macroName);

  if (macro !== undefined) {
    isMatch = true;
  }

  return isMatch;
}

function isIgnoredMacro(macroName) {
  var isMatch = false;
  var i = 0;

  while (!isMatch && i < IGNORED_MACROS.length) {
    if (macroName === IGNORED_MACROS[i]) {
      isMatch = true;
    }

    i++;
  }

  return isMatch;
}

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setOptions = setOptions;
exports.getOptions = getOptions;
exports.DEFAULTS = void 0;

/**
 * @author     André Storhaug <andr3.storhaug@gmail.com>
 * @copyright  2018 NTNU
 */
// Options
var options = {}; // Default TeX2Max options

var DEFAULTS = {
  onlySingleVariables: false,
  handleEquation: false,
  addTimesSign: true,
  onlyGreekName: false,
  onlyGreekSymbol: false,
  debugging: false
};
/**
 * Defines rules to be enforced on the TeX2Max options.
 */

exports.DEFAULTS = DEFAULTS;

function enforceRules() {
  checkOnlyOneTrue(['onlyGreekName', 'onlyGreekSymbol']);
}
/**
 * Checks if the configured TeX2Max options, matching the option names passed as param,
 * contains multiple true values. If so, throw an exception.
 * @param option
 * @throws Error
 */


function checkOnlyOneTrue(option) {
  var numTrue = 0;

  for (var i = 0; i < option.length; i++) {
    if (DEFAULTS[option[i]] === true) numTrue++;

    if (numTrue > 1) {
      throw new Error('Only one of the options: \"' + option.join('\", \"') + '\" can be set to \"true\"');
    }
  }
}
/**
 * Sets the TeX2Max options. If one or more settings passed as parameter are missing,
 * defaults defined in {@link DEFAULTS} will be used
 * @param userOptions
 */


function setOptions(userOptions) {
  options = {};
  options = Object.assign(DEFAULTS, userOptions);
  enforceRules();
}
/**
 * Get the TeX2Max options.
 * @returns {object} the TeX2Max options
 */


function getOptions() {
  if (Object.keys(options).length === 0 && options.constructor === Object) {
    setOptions();
  }

  var optionsCopy = Object.assign({}, options);
  return optionsCopy;
}

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseLatex = parseLatex;

var _macros = require("./macros");

var _functions = require("./functions");

var _environments = require("./environments");

var _tokens = require("./tokens/tokens");

var _reservedWords = require("./reservedWords");

var _options = require("./options");

var logger = _interopRequireWildcard(require("./logger"));

var _greekLetters = require("./tokens/greek-letters");

var _delimiters = require("./delimiters");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function parseLatex(tokens) {
  var options = (0, _options.getOptions)();
  logger.debug("\n------------------ PARSING -> -------------------");
  var index = 0;
  var structure = [];

  function addNode(obj) {
    if (checkArray(obj)) {
      structure.push.apply(structure, _toConsumableArray(obj));
    } else {
      structure.push(obj);
    }
  }

  function checkArray(value) {
    return value && _typeof(value) === 'object' && value.constructor === Array;
  }

  function consume() {
    logger.debug("Consuming position: " + index);
    return tokens[index++].value;
  }

  function skipToken() {
    logger.debug("Skip token at position: " + index);
    return tokens[index++].value;
  }

  function getCurrentChar() {
    return tokens[index] ? tokens[index].value : undefined;
  }

  function getCurrentType() {
    return tokens[index].type.name;
  }

  function getCurrentTypeSymbol() {
    return tokens[index].type.symbol;
  }

  function peek() {
    return tokens[index + 1];
  }

  function peekType() {
    return tokens[index + 1] ? tokens[index + 1].type.name : null;
  }

  function peekValue() {
    return tokens[index + 1].value;
  }

  function lookBackValue() {
    var previousToken = tokens[index - 1];
    return previousToken ? previousToken.value : null;
  }

  function lookBack(position) {
    var previousToken = structure[structure.length - position];
    return previousToken ? previousToken.type : null;
  }

  function getRemainingTokens() {
    return tokens.slice(index + 1);
  }

  function parseString() {
    return consume();
  }

  function parseDigit() {
    logger.debug("- Single number");
    return {
      type: 'number',
      value: consume()
    };
  }

  function parseNumber() {
    logger.debug('Parsing number: ' + tokens[index].value);
    var nextToken = peekType();
    var previousTokenValue = lookBackValue();
    var previousStructureType = lookBack(1); // Check if previously added structure is a function

    if (previousTokenValue !== '^' && previousTokenValue !== '_' && previousStructureType !== 'function') {
      if (nextToken !== null && nextToken === _tokens.TOKEN_TYPES.NUMBER_LITERAL.name) {
        logger.debug("- Found another number \"" + tokens[index + 1].value + "\", continuing parsing");
        var currentNumber = parseDigit().value + parseExpression().value;
        return {
          type: 'number',
          value: currentNumber
        };
      } else {
        return parseDigit();
      }
    } else {
      return parseDigit();
    }
  }

  function parseDecimalSeparator() {
    logger.debug('Parsing decimal number: ' + getCurrentChar());
    var nextToken = peekType();
    var previousStructureType = lookBack(1);

    if (previousStructureType !== 'number') {
      // TODO review if this should be allowed ".2" instead of "0.2".
      throw new Error('Leading decimal separators are not allowed');
    }

    return {
      type: 'decimal_separator',
      value: consume()
    };
  }

  function parseWord() {
    logger.debug('- Found letter \"' + getCurrentChar() + '\"');
    var sequence = "";

    if (peekType() === _tokens.TOKEN_TYPES.STRING_LITERAL.name) {
      logger.debug(', Continuing parsing');
      sequence = consume() + parseWord(_tokens.TOKEN_TYPES.STRING_LITERAL.name);
      logger.debug('Current word: ' + sequence);
    } else {
      sequence = consume();
    }

    logger.debug('Current sequence: ' + sequence);
    return sequence;
  }

  function isReservedWord(word) {
    var isReserved = false;
    logger.debug('Checking ' + word + ' for reserved word');

    for (var key in _reservedWords.RESERVED_WORDS) {
      if (!_reservedWords.RESERVED_WORDS.hasOwnProperty(key)) {
        continue;
      }

      var regex = _reservedWords.RESERVED_WORDS[key].regex;

      if (regex.test(word)) {
        isReserved = true;
      }
    }

    return isReserved;
  }

  function handleReservedWord(word) {
    var reservedWordType = "";
    var reservedWord = "";

    for (var key in _reservedWords.RESERVED_WORDS) {
      if (!_reservedWords.RESERVED_WORDS.hasOwnProperty(key)) {
        continue;
      } else {
        var regex = _reservedWords.RESERVED_WORDS[key].regex;

        if (word.match(regex) !== null) {
          reservedWordType = _reservedWords.RESERVED_WORDS[key].type;
          reservedWord = regex.exec(word);
          break;
        }
      }
    }

    return {
      type: reservedWordType,
      value: reservedWord
    };
  }

  function parseVariable() {
    logger.debug('Parsing variable: ' + tokens[index].value);
    var word = "";
    var backtrack = index;
    word = parseWord();
    logger.debug('Current word: ' + word); // Check for reserved variable words

    if (isReservedWord(word)) {
      logger.debug('Variable contains reserved words');
      var reservedWordLength;
      var reservedWordResult = handleReservedWord(word);
      var reservedWord = reservedWordResult.value;
      reservedWordLength = reservedWord[0].length;
      logger.debug('reserved word: ' + reservedWord[0] + ", length: " + reservedWordLength + ", index " + reservedWord.index);

      if (reservedWord.index > 0) {
        index = backtrack + reservedWord.index;
        word = word.substr(0, reservedWord.index);

        if (options.onlySingleVariables === true && options.addTimesSign === false) {
          // Assert only single variables if onlySingleVariables- and addTimesSign options are sat to true and false.
          if (word.length > 1) {
            throw new Error('The current options only allow for single variables');
          }
        } else if (options.onlySingleVariables) {
          // Only produce single-char variables
          index = backtrack;
          word = consume();
        }
      } else {
        index = backtrack + reservedWordLength;
        word = reservedWord[0];
      }
    } else if (options.onlySingleVariables === true && options.addTimesSign === false) {
      // Assert only single variables if onlySingleVariables- and addTimesSign options are sat to true and false.
      if (word.length > 1) {
        throw new Error('The current options only allow for single variables');
      }
    } else if (options.onlySingleVariables) {
      // Only produce single-char variables
      index = backtrack;
      word = consume();
    }

    return {
      type: 'variable',
      value: word
    };
  }

  function parseVerticalBar() {
    var node = null;
    var previousStructureType = lookBack(1);

    if (previousStructureType !== 'delimiter') {
      throw new Error('Pipe symbols may only be used with "left" / "right" delimiters.');
    }

    node = {
      type: 'vertical_bar',
      value: consume()
    };
    return node;
  }

  function parseDelimiter(delimiter) {
    var node = null;
    node = {
      type: 'delimiter',
      value: delimiter
    };
    return node;
  }

  function parseBracket() {
    var node = null;
    var bracketName = getBracketName(getCurrentTypeSymbol());
    var bracketType = getBracketType(getCurrentTypeSymbol());
    node = {
      type: bracketType,
      symbol: bracketName,
      value: consume()
    };
    return node;
  }
  /*function parseGroup(delimiter = null) {
      let groupName = getBracketName(getCurrentTypeSymbol());
      let length = 0;
       if (delimiter) {
          length = matchingGroupLength(tokens.slice(index), delimiter, groupName);
      } else {
          length = matchingBracketLength(tokens.slice(index), groupName);
      }
       if (length instanceof Error) return length;
       const newLatex = tokens.slice(index + 1, index + (length));
      logger.debug('New group created');
       index += length + 1;
       return {
          type: 'group',
          symbol: groupName,
          value: parseLatex(newLatex, options)
      };
  }*/


  function parseMacro(macroName) {
    var macro = null;
    var isMacroMatch = (0, _macros.isMacro)(macroName);
    var isGreek = (0, _greekLetters.isGreekLetter)(macroName);

    if (isMacroMatch) {
      // Check for overrides
      macro = _macros.MACROS_OVERRIDE.get(macroName);

      if (macro === undefined) {
        macro = {
          type: 'token',
          value: macroName
        };
      }
    } else if (isGreek) {
      macro = {
        type: 'token',
        value: macroName
      };
    } else if ((0, _macros.isIgnoredMacro)(macroName)) {
      macro = null;
    } else {
      throw new Error('Encountered an unsupported macro: ' + macroName);
    }

    return macro;
  }

  function isEnvironment(functionalWord) {
    var isEnvironment = _environments.environments.reduce(function (acc, val) {
      return acc || val === functionalWord;
    }, false);

    logger.debug("Is acknowledged environment?: " + isEnvironment);
    return isEnvironment;
  }

  function parseEnvironment(state) {
    if (getCurrentChar() !== _tokens.TOKEN_TYPES.OPENING_BRACKET.symbol) {
      throw new Error('No argument for environments are present.');
    }

    skipToken(); // Skip brace

    var environmentType = parseWord();
    skipToken(); // Skip brace

    if (isEnvironment(environmentType)) {
      if (state === 'begin' || state === 'end') {
        return {
          type: 'environment',
          state: state,
          value: environmentType
        };
      } else {
        throw new Error('environment state ' + state + ' is not valid');
      }
    } else {
      throw new Error('Environment type ' + environmentType + ' is not supported');
    }
  }

  function isSpecialChar(functionalWord) {
    var specials = [' ', '{', '}', '\\'];
    var isSpecialChar = false;
    specials.forEach(function (s) {
      if (functionalWord === s) {
        isSpecialChar = true;
        logger.debug(functionalWord + ' is special char');
      }
    });
    return isSpecialChar;
  }

  function handleSpecialChar(functionalWord) {
    var result = null;

    switch (functionalWord) {
      case ' ':
        result = null;
        break;

      case '{':
        result = parseBracket();
        break;

      case '}':
        result = parseBracket();
        break;

      case '\\':
        result = {
          type: 'DOUBLE_BACKSLASH',
          value: consume() + consume()
        };
        break;

      default:
        return false;
    }

    return result;
  }

  function parseOperatorname() {
    var node = null;
    skipToken(); // Skip bracket

    var functionalWord = parseWord();
    node = parseFunction(functionalWord);
    skipToken(); // Skip bracket

    return node;
  }

  function handleBackslash() {
    logger.debug('Found backslash');
    var node = null; // TODO move into handleSpecialChar

    if (peekType() === _tokens.TOKEN_TYPES.BACKSLASH.name) {
      return {
        type: 'DOUBLE_BACKSLASH',
        value: consume() + consume()
      };
    }

    index++; // Skip backslash

    if (getCurrentChar() === undefined) return null;

    if (isSpecialChar(getCurrentChar())) {
      node = handleSpecialChar(getCurrentChar());
      return node;
    }

    var functionalWord = parseWord();

    if (functionalWord === 'begin') {
      node = parseEnvironment('begin');
    } else if (functionalWord === 'end') {
      node = parseEnvironment('end');
    } else if (functionalWord === 'operatorname') {
      node = parseOperatorname();
    } else if ((0, _functions.isFunction)(functionalWord)) {
      node = parseFunction(functionalWord);
    } else if ((0, _delimiters.isDelimiter)(functionalWord)) {
      node = parseDelimiter(functionalWord);
    } else {
      node = parseMacro(functionalWord);
    }

    return node;
  }

  function parseFunction(functionName) {
    var node = {};
    var func = (0, _functions.getFunctionName)(functionName);
    node = {
      type: 'function',
      value: func
    };
    return node;
  }

  function parseOperator() {
    logger.debug("Found operator");
    var token = tokens[index];
    var infix = /^[+\-*/=^_]$/i;
    var prefix = /^[]$/i;
    var postfix = /^[!]$/i;

    if (infix.test(token.value)) {
      // Is infix operator
      return {
        type: 'operator',
        operatorType: 'infix',
        value: consume()
      };
    } else if (prefix.test(token.value)) {
      return {
        type: 'operator',
        operatorType: 'prefix',
        value: consume()
      };
    } else if (postfix.test(token.value)) {
      return {
        type: 'operator',
        operatorType: 'postfix',
        value: consume()
      };
    }
  }

  function parseExpression() {
    var parsedResult = null;
    var token = tokens[index];

    switch (token.type) {
      case _tokens.TOKEN_TYPES.NUMBER_LITERAL:
        logger.debug('Found NUMBER_LITERAL \"' + getCurrentChar() + '\"');
        parsedResult = parseNumber();
        break;

      case _tokens.TOKEN_TYPES.PERIOD:
        logger.debug('Found PERIOD\"' + getCurrentChar() + '\"');
        parsedResult = parseDecimalSeparator();
        break;

      case _tokens.TOKEN_TYPES.BACKSLASH:
        logger.debug('Found BACKSLASH \"' + getCurrentChar() + '\"');
        parsedResult = handleBackslash();
        break;

      case _tokens.TOKEN_TYPES.OPERATOR:
        logger.debug('Found OPERATOR \"' + getCurrentChar() + '\"');
        parsedResult = parseOperator();
        break;

      case _tokens.TOKEN_TYPES.STRING_LITERAL:
        logger.debug('Found STRING_LITERAL \"' + getCurrentChar() + '\"');
        parsedResult = parseVariable();
        break;

      case _tokens.TOKEN_TYPES.OPENING_BRACE:
      case _tokens.TOKEN_TYPES.CLOSING_BRACE:
        logger.debug('Found BRACKET \"' + getCurrentChar() + '\"');
        parsedResult = parseBracket();
        break;

      case _tokens.TOKEN_TYPES.OPENING_PARENTHESES:
      case _tokens.TOKEN_TYPES.CLOSING_PARENTHESES:
        logger.debug('Found BRACKET \"' + getCurrentChar() + '\"');
        parsedResult = parseBracket();
        break;

      case _tokens.TOKEN_TYPES.OPENING_BRACKET:
      case _tokens.TOKEN_TYPES.CLOSING_BRACKET:
        logger.debug('Found BRACKET \"' + getCurrentChar() + '\"');
        parsedResult = parseBracket();
        break;

      case _tokens.TOKEN_TYPES.VERTICAL_BAR:
        logger.debug('Found VERTICAL_BAR \"' + getCurrentChar() + '\"');
        parsedResult = parseVerticalBar();
        break;

      default:
        index++;
        break;
    }

    return parsedResult;
  }

  function startParse() {
    var count = 0;

    while (index < tokens.length) {
      logger.debug("--------- Parsing next token. While loop run: " + count + ' ---------');
      var node = parseExpression();

      if (node === null) {
        continue;
      }

      if (node === undefined) {
        index = tokens.length;
        throw new Error('node is undefined');
      }

      addNode(node);
      logger.debug('Parsed result type: ' + node.type);
      count++;
      if (count > 1000) throw new Error('Max count reached, infinite loop encountered.'); // TODO REMOVE
    }

    logger.debug("--------- End of while loop. Tokens position: " + (index - 1) + " of " + (tokens.length - 1) + ' ---------');
    return structure;
  }

  return startParse();
}

function isBracket(_char) {
  var bracket = false;

  switch (_char) {
    case _tokens.TOKEN_TYPES.OPENING_BRACE.symbol:
      bracket = true;
      break;

    case _tokens.TOKEN_TYPES.OPENING_PARENTHESES.symbol:
      bracket = true;
      break;

    case _tokens.TOKEN_TYPES.OPENING_BRACKET.symbol:
      bracket = true;
      break;
  }

  return bracket;
}

function getBracketName(bracket) {
  var name = "";

  switch (bracket) {
    case _tokens.TOKEN_TYPES.OPENING_BRACE.symbol:
      name = 'curly';
      break;

    case _tokens.TOKEN_TYPES.CLOSING_BRACE.symbol:
      name = 'curly';
      break;

    case _tokens.TOKEN_TYPES.OPENING_PARENTHESES.symbol:
      name = 'normal';
      break;

    case _tokens.TOKEN_TYPES.CLOSING_PARENTHESES.symbol:
      name = 'normal';
      break;

    case _tokens.TOKEN_TYPES.OPENING_BRACKET.symbol:
      name = 'square';
      break;

    case _tokens.TOKEN_TYPES.CLOSING_BRACKET.symbol:
      name = 'square';
      break;
  }

  return name;
}

function getBracketType(bracket) {
  var type = "";

  switch (bracket) {
    case _tokens.TOKEN_TYPES.OPENING_BRACE.symbol:
    case _tokens.TOKEN_TYPES.OPENING_PARENTHESES.symbol:
    case _tokens.TOKEN_TYPES.OPENING_BRACKET.symbol:
      type = 'opening_bracket';
      break;

    case _tokens.TOKEN_TYPES.CLOSING_BRACE.symbol:
    case _tokens.TOKEN_TYPES.CLOSING_PARENTHESES.symbol:
    case _tokens.TOKEN_TYPES.CLOSING_BRACKET.symbol:
      type = 'closing_bracket';
      break;
  }

  return type;
}
/**
 * Will find the length to the matching bracket, in provided tokens array
 * @param  {string} tokens       An array of tokens, starting from where the search should begin
 * @param  {string} bracketType The type of bracket to search for.
 *                                  Can be one of the following ['normal', 'curly', 'square']
 * @return {number}             The length from start of provided tokens array,
 *                                  to the location of the matching bracket
 */


function matchingBracketLength(tokens, bracketType) {
  logger.debug('Finding matching bracket');
  var startBracket = '';
  var endBracket = '';

  switch (bracketType) {
    case 'normal':
      startBracket = '(';
      endBracket = ')';
      break;

    case 'curly':
      startBracket = '{';
      endBracket = '}';
      break;

    case 'square':
      startBracket = '[';
      endBracket = ']';
      break;
  }

  var bracketDepth = 0;

  for (var i = 0; i < tokens.length; i++) {
    var _char2 = tokens[i].value;
    logger.debug('-- Char:' + _char2);

    if (_char2 === startBracket) {
      bracketDepth++;
      logger.debug('-- Found starting bracket, depth ' + bracketDepth);
    } else if (_char2 === endBracket) {
      if (bracketDepth === 1) {
        logger.debug('-- Found original closing bracket at position ' + i);
        return i;
      }

      bracketDepth--;
      logger.debug('-- Found closing bracket, depth ' + bracketDepth);
    }
  }

  throw new Error('Brackets do not match up');
}

},{"./delimiters":3,"./environments":4,"./functions":5,"./logger":9,"./macros":10,"./options":11,"./reservedWords":14,"./tokens/greek-letters":16,"./tokens/tokens":17}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postParse = postParse;

var _functions = require("./functions");

var _options = require("./options");

var logger = _interopRequireWildcard(require("./logger"));

var _delimiters = require("./delimiters");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function postParse(parsedLatex) {
  logger.debug('\n------------------ POST PARSING -> -------------------');
  var options = (0, _options.getOptions)();
  var index = 0;
  var structure = [];

  for (index; index < parsedLatex.length; index++) {
    var item = parsedLatex[index];
    logger.debug('--------- Parsing next token\' ---------');
    var node = parseExpression();

    if (node === null) {
      continue;
    }

    if (node === undefined) {
      index = parsedLatex.length;
      throw new Error('node is undefined');
    }

    addNode(node);
    var types = '';

    if (checkArray(node)) {
      node.forEach(function (e) {
        types += e.type + ' + ';
      });
      types = types.substr(0, types.length - 3);
    } else {
      types = node.type;
    }

    logger.debug('Parsed result type(s): ' + types + '.');
  }

  function parseExpression() {
    var node = null;
    var item = getCurrentItem();
    var value = getCurrentValue();
    var type = getCurrentType();

    switch (type) {
      case 'delimiter':
        logger.debug('Found delimiter \"' + value + '\"');
        node = parseDelimiter();
        break;

      case 'opening_bracket':
        logger.debug('Found bracket \"' + value + '\"');
        node = parseGroup();
        break;

      case 'number':
        logger.debug('Found number  \"' + value + '\"');
        node = parseNumber();
        break;

      default:
        node = item;
        break;
    }

    return node;
  }

  function addNode(obj) {
    if (checkArray(obj)) {
      structure.push.apply(structure, _toConsumableArray(obj));
    } else {
      structure.push(obj);
    }
  }

  function checkArray(value) {
    return value && _typeof(value) === 'object' && value.constructor === Array;
  }

  function getCurrentItem() {
    return parsedLatex[index] ? parsedLatex[index] : undefined;
  }

  function getCurrentValue() {
    return parsedLatex[index] ? parsedLatex[index].value : undefined;
  }

  function getCurrentType() {
    return parsedLatex[index].type;
  }

  function peekItem(position) {
    if (typeof parsedLatex[index + position] === 'undefined') {
      return null;
    }

    return parsedLatex[index + position];
  }

  function peekType(position) {
    if (typeof parsedLatex[index + position] === 'undefined') {
      return null;
    }

    return parsedLatex[index + position].type;
  }

  function peekValue(position) {
    if (typeof parsedLatex[index + position] === 'undefined') {
      return null;
    }

    return parsedLatex[index + position].value;
  }

  function parseGroup() {
    var node = null;
    var groupName = getCurrentItem().symbol;
    var length = matchingBracketLength(parsedLatex.slice(index), null, groupName);
    if (length instanceof Error) return length;
    var newItems = parsedLatex.slice(index + 1, index + length);
    logger.debug('New group created2');
    index += length;
    return {
      type: 'group',
      symbol: groupName,
      value: postParse(newItems)
    };
  }

  function parseNumber() {
    var node;

    if (peekType(1) === 'decimal_separator') {
      node = parseFloat();
    } else {
      node = getCurrentItem();
    }

    return node;
  }

  function parseFloat() {
    var node;

    var _float;

    if (decimalSeparatorQuantityInNumber() > 1) {
      throw new Error('Only one decimal separator is allowed');
    }

    if (peekType(2) === 'number') {
      logger.debug("- Found fractional part decimal part\"" + getCurrentValue() + "\", continuing parsing");
      var decimal_separator = peekValue(1);
      _float = getCurrentValue() + decimal_separator + peekValue(2);
    } else {
      throw new Error('Trailing decimal separator isn\'t allowed');
    }

    index += 2;
    node = {
      type: 'number',
      value: _float
    };
    return node;
  }

  function decimalSeparatorQuantityInNumber() {
    var i = 0;
    var isNumber = true;
    var quantity = 0;

    while (isNumber) {
      if (peekType(i) === 'decimal_separator') {
        quantity++;
      } else if (peekType(i) !== 'number') {
        isNumber = false;
      }

      i++;
    }

    return quantity;
  }

  function parseDelimiter() {
    var nodes = null;
    var node, groupNode;
    var item = getCurrentItem();
    var value = getCurrentValue();
    var type = peekType(1);

    switch (type) {
      case 'vertical_bar':
        logger.debug('Found vertical_bar \"' + value + '\"');
        node = parseVerticalBar();
        break;

      default:
        break;
    }

    groupNode = createGroup();
    nodes = [node, groupNode];
    nodes = nodes.filter(function (el) {
      return el != null;
    });
    return nodes;
  }

  function parseVerticalBar() {
    var node = null;
    var functionName = 'abs';
    var func = (0, _functions.getFunctionName)(functionName);
    node = {
      type: 'function',
      value: func
    };
    return node;
  }

  function createGroup() {
    var delimiter = getCurrentValue();
    var type = peekType(1);
    var value = peekValue(1);
    var length = findGroupLength(parsedLatex.slice(index), delimiter, value);

    if (length instanceof Error) {
      return length;
    }

    var newItems = parsedLatex.slice(index + 2, index + length);
    logger.debug('New group created');
    index += length;
    return {
      type: 'group',
      symbol: type,
      value: postParse(newItems)
    };
  }
  /**
   * Will find the length to the matching delimeter and symbol in provided
   * items array
   * @param  {Object} items An array of parsed latex, starting
   *     from where the search should begin
   * @param  {string} symbol The symbol to search for.
   * @return {number} The length from start of provided items
   *     array, to the location of the matched symbol bracket
   */


  function findGroupLength(items, delimiter, symbol) {
    logger.debug('Finding matching symbols');
    var depth = 0;
    var startDelimiter = delimiter;

    var endDelimiter = _delimiters.DELIMITERS.get(delimiter);

    var nextItemType = peekType(1);
    var nextItemValue = peekValue(1);
    var nextItem = peekItem(1);

    if (nextItemType === 'opening_bracket') {
      return matchingBracketLength(items, delimiter, nextItem.symbol);
    }

    for (var i = 0; i < items.length; i++) {
      var _item = items[i];
      nextItemType = items[i + 1] ? items[i + 1].type : '';
      nextItemValue = items[i + 1] ? items[i + 1].value : '';
      logger.debug('-- Item:' + _item.value);

      if (_item.type === 'delimiter' && _item.value === startDelimiter && nextItemValue === symbol) {
        depth++;
        logger.debug('-- Found starting point, depth ' + depth);
      } else if (_item.type === 'delimiter' && _item.value === endDelimiter && nextItemValue === symbol) {
        if (depth === 1) {
          logger.debug('-- Found end of symbol group at position ' + i);
          return i;
        }

        depth--;
        logger.debug('-- Found closing point, depth ' + depth);
      }
    }

    throw new Error('"' + delimiter + symbol + '"' + ' symbols does not match up');
  }
  /**
   * Will find the length to the matching bracket, in provided tokens array
   * @param  {Object} items       An array of tokens, starting from where
   *     the search should begin
   * @param  {string} bracketType The type of bracket to search for.
   *                                  Can be one of the following ['normal',
   *     'curly', 'square']
   * @return {number}             The length from start of provided tokens
   *     array, to the location of the matching bracket
   */


  function matchingBracketLength(items, delimiter, bracketType) {
    logger.debug('Finding matching bracket');
    var startBracket = '';
    var endBracket = '';
    var startDelimiter = delimiter;

    var endDelimiter = _delimiters.DELIMITERS.get(delimiter);

    var nextItemType = peekType(1);
    var nextItemValue = peekValue(1);

    switch (bracketType) {
      case 'normal':
        startBracket = '(';
        endBracket = ')';
        break;

      case 'curly':
        startBracket = '{';
        endBracket = '}';
        break;

      case 'square':
        startBracket = '[';
        endBracket = ']';
        break;
    }

    var bracketDepth = 0;

    if (delimiter) {
      for (var i = 0; i < items.length; i++) {
        var _item2 = items[i];
        nextItemType = items[i + 1] ? items[i + 1].type : '';
        nextItemValue = items[i + 1] ? items[i + 1].value : '';
        logger.debug('-- Char:' + _item2.value);

        if (_item2.type === 'delimiter' && _item2.value === startDelimiter && nextItemValue === startBracket) {
          bracketDepth++;
          logger.debug('-- Found starting bracket, depth ' + bracketDepth);
        } else if (_item2.type === 'delimiter' && _item2.value === endDelimiter && nextItemValue === endBracket) {
          if (bracketDepth === 1) {
            logger.debug('-- Found original closing bracket at position ' + i);
            return i;
          }

          bracketDepth--;
          logger.debug('-- Found closing bracket, depth ' + bracketDepth);
        }
      }
    } else {
      for (var _i = 0; _i < items.length; _i++) {
        var _item3 = items[_i];
        logger.debug('-- Char:' + _item3.value);

        if (_item3.value === startBracket) {
          bracketDepth++;
          logger.debug('-- Found starting bracket, depth ' + bracketDepth);
        } else if (_item3.value === endBracket) {
          if (bracketDepth === 1) {
            logger.debug('-- Found original closing bracket at position ' + _i);
            return _i;
          }

          bracketDepth--;
          logger.debug('-- Found closing bracket, depth ' + bracketDepth);
        }
      }
    }

    throw new Error('Brackets do not match up');
  }

  return structure;
}

},{"./delimiters":3,"./functions":5,"./logger":9,"./options":11}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RESERVED_WORDS = void 0;

/**
 * @author     André Storhaug <andr3.storhaug@gmail.com>
 * @copyright  2018 NTNU
 */
var RESERVED_WORDS = {
  INTEGRATION_END: {
    name: 'INTEGRATION_END',
    symbol: null,
    regex: /(d)[A-z]/,
    type: "integral_end"
  }
};
exports.RESERVED_WORDS = RESERVED_WORDS;

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scan = scan;

var _tokens = require("./tokens/tokens");

var logger = _interopRequireWildcard(require("./logger"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @author     André Storhaug <andr3.storhaug@gmail.com>
 * @copyright  2018 NTNU
 */
function scan(input) {
  var lexemeList = [];

  function addLexeme(lexeme) {
    lexemeList.push(lexeme);
  }

  logger.debug("\n------------------ SCANNER -> -------------------");
  var position = 0;

  while (position < input.length) {
    var isSupported = false;

    for (var type in _tokens.TOKEN_TYPES) {
      if (!_tokens.TOKEN_TYPES.hasOwnProperty(type)) {
        continue;
      }

      if (input[position].match(_tokens.TOKEN_TYPES[type].regex)) {
        addLexeme(input[position]);
        isSupported = true;
      }
    }

    if (!isSupported) throw new Error('Encountered unsupported character: ' + input[position]);
    position++;
  }

  return lexemeList;
}

},{"./logger":9,"./tokens/tokens":17}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toUpperCase = toUpperCase;
exports.isUpperCase = isUpperCase;
exports.getSymbol = getSymbol;
exports.getName = getName;
exports.isGreekLetter = isGreekLetter;
exports.convertSymbols = convertSymbols;
exports.letters = void 0;

var logger = _interopRequireWildcard(require("../logger"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @author     André Storhaug <andr3.storhaug@gmail.com>
 * @copyright  2018 NTNU
 */
var letters = [{
  name: 'alpha',
  symbol: 'α'
}, {
  name: 'beta',
  symbol: 'β'
}, {
  name: 'gamma',
  symbol: 'γ'
}, {
  name: 'delta',
  symbol: 'δ'
}, {
  name: 'epsilon',
  symbol: 'ϵ'
}, {
  name: 'zeta',
  symbol: 'ζ'
}, {
  name: 'eta',
  symbol: 'η'
}, {
  name: 'theta',
  symbol: 'θ'
}, {
  name: 'iota',
  symbol: 'ι'
}, {
  name: 'kappa',
  symbol: 'κ'
}, {
  name: 'lambda',
  symbol: 'λ'
}, {
  name: 'mu',
  symbol: 'μ'
}, {
  name: 'nu',
  symbol: 'ν'
}, {
  name: 'omicron',
  symbol: 'ο'
}, {
  name: 'pi',
  symbol: 'π'
}, {
  name: 'rho',
  symbol: 'ρ'
}, {
  name: 'sigma',
  symbol: 'σ'
}, {
  name: 'tau',
  symbol: 'τ'
}, {
  name: 'upsilon',
  symbol: 'υ'
}, {
  name: 'phi',
  symbol: 'ϕ'
}, {
  name: 'chi',
  symbol: 'χ'
}, {
  name: 'psi',
  symbol: 'ψ'
}, {
  name: 'omega',
  symbol: 'ω'
}];
exports.letters = letters;

function toUpperCase(x) {
  return x.charAt(0).toUpperCase() + x.slice(1);
}

function isUpperCase(x) {
  return x.charAt(0).toUpperCase() === x.charAt(0);
}

function getSymbol(name) {
  var symbol = letters.find(function (e) {
    return e.name === name.toLowerCase();
  });
  if (symbol === undefined) return null;
  symbol = symbol.symbol;
  if (isUpperCase(name)) symbol = toUpperCase(symbol);
  return symbol;
}

function getName(symbol) {
  var name = letters.find(function (e) {
    return e.symbol === symbol.toLowerCase();
  });
  if (name === undefined) return null;
  name = name.name;
  if (isUpperCase(symbol)) name = toUpperCase(name);
  return name;
}

function isGreekLetter(letter) {
  var symbol = letters.find(function (e) {
    return e.name === letter.toLowerCase();
  });
  var name = letters.find(function (e) {
    return e.symbol === letter.toLowerCase();
  });
  return symbol !== undefined || name !== undefined;
}

function convertSymbols(math) {
  logger.debug('Converting math symbols ' + math);
  letters.forEach(function (letter) {
    math = math.split(letter.symbol).join(letter.name);
    math = math.split(toUpperCase(letter.symbol)).join(toUpperCase(letter.name));
  });
  logger.debug('- Converted math symbols ' + math);
  return math;
}

},{"../logger":9}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TOKEN_TYPES = void 0;

/**
 * @author     André Storhaug <andr3.storhaug@gmail.com>
 * @copyright  2018 NTNU
 */
var TOKEN_TYPES = {
  WHITESPACE: {
    name: "WHITESPACE",
    symbol: " ",
    regex: /^\s+/
  },
  BACKSLASH: {
    name: "BACKSLASH",
    symbol: "\\",
    regex: /^[\\\\]$/
  },
  AMPERSAND: {
    name: "AMPERSAND",
    symbol: "&",
    regex: /^[&]$/
  },
  OPENING_BRACE: {
    name: "OPENING_BRACE",
    symbol: "{",
    regex: /^[\{]$/
  },
  CLOSING_BRACE: {
    name: "CLOSING_BRACE",
    symbol: "}",
    regex: /^[\}]$/
  },
  OPENING_PARENTHESES: {
    name: "OPENING_PARENTHESES",
    symbol: "(",
    regex: /^[\(]$/
  },
  CLOSING_PARENTHESES: {
    name: "CLOSING_PARENTHESES",
    symbol: ")",
    regex: /^[\)]$/
  },
  OPENING_BRACKET: {
    name: "BRACKET",
    symbol: "[",
    regex: /^[\[]$/
  },
  CLOSING_BRACKET: {
    name: "BRACKET",
    symbol: "]",
    regex: /^[\]]$/
  },
  VERTICAL_BAR: {
    name: "VERTICAL_BAR",
    symbol: "|",
    regex: /^[|]$/
  },
  NUMBER_LITERAL: {
    name: "NUMBER_LITERAL",
    symbol: null,
    regex: /^[0-9]+$/i
  },
  PERIOD: {
    name: "PERIOD",
    symbol: ".",
    regex: /^[.]$/
  },
  STRING_LITERAL: {
    name: "STRING_LITERAL",
    symbol: null,
    regex: /^[a-zA-Zα-ωΑ-Ω]+$/i
  },
  OPERATOR: {
    name: 'OPERATOR',
    symbol: null,
    regex: /^[+\-*/=^_!]$/i
  }
};
exports.TOKEN_TYPES = TOKEN_TYPES;

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertNotUndefined = assertNotUndefined;
exports.getExpressionLength = getExpressionLength;

var _helpers = require("../../helpers/helpers");

/**
 * @author     André Storhaug <andr3.storhaug@gmail.com>
 * @copyright  2018 NTNU
 */
function assertNotUndefined(item, message) {
  if (typeof item === 'undefined') {
    throw new Error(message);
  }
}

function getExpressionLength(parsedLatex) {
  var types = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var values = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  // Locate the next operator + or -, function etc...
  var expressionLength = 0;
  var condition = null;
  var conditionValue = null;

  if (parsedLatex[0].type === 'group' && parsedLatex.length === 1) {
    expressionLength = 1;
  } else {
    (function () {
      var i = 0;
      var foundExpressionLength = false;

      while (i < parsedLatex.length && !foundExpressionLength) {
        if (types != null) {
          types.forEach(function (type) {
            if (parsedLatex[i].type === type) {
              expressionLength = i;
              foundExpressionLength = true;
              condition = 'type';
              conditionValue = type;
            }
          });
        }

        if (values != null && !foundExpressionLength) {
          values.forEach(function (value) {
            if (parsedLatex[i].value === value) {
              expressionLength = i;
              foundExpressionLength = true;
              condition = 'value';
              conditionValue = value;
            }
          });
        }

        i++;
      }

      if (!foundExpressionLength) {
        expressionLength = parsedLatex.length;
      }
    })();
  }

  return {
    expressionLength: expressionLength,
    condition: condition,
    conditionValue: conditionValue
  };
}

},{"../../helpers/helpers":6}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.environmentLength = environmentLength;

var logger = _interopRequireWildcard(require("../../logger"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @author     André Storhaug <andr3.storhaug@gmail.com>
 * @copyright  2018 NTNU
 */
function environmentLength(parsedLatex) {
  var environmentDepth = 0;

  for (var i = 0; i < parsedLatex.length; i++) {
    if (parsedLatex[i].type === 'environment' && parsedLatex[i].state === 'begin') {
      environmentDepth++;
      logger.debug('-- Found new \"begin\" environment, depth ' + environmentDepth);
    } else if (parsedLatex[i].type === 'environment' && parsedLatex[i].state === 'end') {
      if (environmentDepth === 1) {
        logger.debug('-- Found original environment end at position ' + i);
        return i - 1;
      }

      environmentDepth--;
      logger.debug('-- Found environment \"end\", depth ' + environmentDepth);
    }
  }

  throw new Error('Environments \"begin\" and \"end\" doesn\'t match up');
}

},{"../../logger":9}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findIntegralEnd = findIntegralEnd;
exports.handleUpperAndLowerArgs = handleUpperAndLowerArgs;

var _maximaTranspiler = require("../maxima-transpiler");

var _helpers = require("../../helpers/helpers");

var logger = _interopRequireWildcard(require("../../logger"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @author     André Storhaug <andr3.storhaug@gmail.com>
 * @copyright  2018 NTNU
 */

/**
 * Will find the length to the end of the integral in the provided tokens array
 * @param  {string} tokens       An array of tokens, starting from where the search should begin
 * @return {Object}             The length from start of provided string,
 *                              to the location of the matching bracket
 */
function findIntegralEnd(tokens) {
  logger.debug('Finding end of integral');
  var integralDepth = 1;
  var integrationVariable = "";

  for (var i = 0; i < tokens.length; i++) {
    var _char = tokens[i].value;
    logger.debug('-- Char:' + _char);

    if (tokens[i].type === 'function' && tokens[i].value === 'integral') {
      integralDepth++;
      logger.debug('-- Found starting integral, depth ' + integralDepth);
    } else if (tokens[i].type === 'variable' && _char[0] === "d") {
      var regex = /(d)[A-z]/g; // Match integration ends like dx and dy in dxdy

      var match = _char.match(regex);

      if (match !== null && match.length >= 1) {
        if (integralDepth === 1) {
          integrationVariable = _char.substring(1);
          logger.debug('-- Found end of original integral at position ' + i);
          return {
            length: i,
            variable: integrationVariable
          };
        }

        integralDepth--;
        logger.debug('-- Found integral end, depth ' + integralDepth);
      }
    }
  }

  throw new Error('No end of integral located');
}

function handleUpperAndLowerArgs(parsedLatex) {
  var lowerLimit, upperLimit;
  var index = 0;

  for (var j = 0; j < 2; j++) {
    if (parsedLatex[index + j].value === '_') {
      index++;
      lowerLimit = (0, _maximaTranspiler.transpiler)((0, _helpers.wrapForTranspilation)(parsedLatex[index + j]));
    } else if (parsedLatex[index + j].value === '^') {
      index++;
      upperLimit = (0, _maximaTranspiler.transpiler)((0, _helpers.wrapForTranspilation)(parsedLatex[index + j]));
    } else {
      throw new Error('Finite integral must have both upper and lower limits');
    }
  }

  return {
    lowerLimit: lowerLimit,
    upperLimit: upperLimit
  };
} // Check which variable that comes after the "d" in f.eks dx. This is the variable to put as integrate arguments. Eg. integrate(2*x, x, 1,2)

},{"../../helpers/helpers":6,"../../logger":9,"../maxima-transpiler":24}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleLimitArguments = handleLimitArguments;
exports.isOneSidedLimit = isOneSidedLimit;

var _helpers = require("../../helpers/helpers");

var _maximaTranspiler = require("../maxima-transpiler");

var logger = _interopRequireWildcard(require("../../logger"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @author     André Storhaug <andr3.storhaug@gmail.com>
 * @copyright  2018 NTNU
 */
function handleLimitArguments(limitArgs) {
  if (!(0, _helpers.checkForVariable)(limitArgs[0])) {
    // Control for several expression before 'to'
    throw new Error('Limit: "From" argument must be a symbol');
  } else if (!(0, _helpers.searchForOccurrence)(limitArgs[1], 'value', 'to', false).isPresent) {
    throw new Error('Limit: no "to" token provided');
  } else if (limitArgs[2] === undefined) {
    throw new Error('Limit: "To" argument missing');
  }

  var variable = limitArgs[0].value;
  var upperLim = limitArgs.slice(2);
  var value = "";
  value += (0, _maximaTranspiler.transpiler)((0, _helpers.wrapForTranspilation)(upperLim));
  var direction = isOneSidedLimit(limitArgs.slice(2));
  return {
    variable: variable,
    value: value,
    direction: direction
  };
}

function isOneSidedLimit(expression) {
  logger.debug('Checking if limit is one sided');
  var isOneSided = false;
  var sideSymbol = '';
  var side = '';

  for (var i = 0; i < expression.length; i++) {
    if (expression[i].type === 'group') {
      var isOneSidedGroup = isOneSidedLimit(expression[i].value);

      if (isOneSidedGroup !== false) {
        isOneSided = true;
        side = isOneSidedGroup;
      }
    }

    if ((expression[i].value === '+' || expression[i].value === '-') && i + 1 >= expression.length) {
      isOneSided = true;
      sideSymbol = expression[i].value;
    }
  }

  if (isOneSided) {
    side = sideSymbol === '+' ? 'plus' : 'minus';
    logger.debug('- Limit is one-sided from the ' + side + ' side');
  } else {
    logger.debug('- Limit is not one-sided');
  }

  return isOneSided ? side : false;
}

},{"../../helpers/helpers":6,"../../logger":9,"../maxima-transpiler":24}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleMatrix = handleMatrix;

var _maximaTranspiler = require("../maxima-transpiler");

var _helpers = require("../../helpers/helpers");

var _common = require("./common");

/**
 * @author     André Storhaug <andr3.storhaug@gmail.com>
 * @copyright  2018 NTNU
 */
function handleMatrix(parsedLatex) {
  var matrixString = "";
  matrixString += 'matrix(';
  var matrixArray = [];
  var rowArray = [];

  for (var i = 0; i < parsedLatex.length; i++) {
    (0, _common.assertNotUndefined)(parsedLatex[i], 'Missing argument in matrix');
    var type = parsedLatex[i].type;

    if (type === 'DOUBLE_BACKSLASH') {
      // New row
      matrixArray.push(rowArray);
      rowArray = []; // Reset array
    } else {
      rowArray.push((0, _maximaTranspiler.transpiler)((0, _helpers.wrapForTranspilation)(parsedLatex[i])));
    }
  }

  matrixArray.push(rowArray); // Push last row

  var matrixRowSize = matrixArray[0].length;

  for (var row = 0; row < matrixArray.length; row++) {
    if (matrixArray[row].length !== matrixRowSize) {
      throw new Error('All rows in matrix must be the same length');
    }

    if (row !== 0) {
      matrixString += ',';
    }

    matrixString += '[' + matrixArray[row].toString() + ']';
  }

  matrixString += ')';
  return matrixString;
}

},{"../../helpers/helpers":6,"../maxima-transpiler":24,"./common":18}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleUpperAndLowerArgsSum = handleUpperAndLowerArgsSum;
exports.handleLowerSumArguments = handleLowerSumArguments;

var _maximaTranspiler = require("../maxima-transpiler");

var _helpers = require("../../helpers/helpers");

var _common = require("./common");

/**
 * @author     André Storhaug <andr3.storhaug@gmail.com>
 * @copyright  2018 NTNU
 */
function handleUpperAndLowerArgsSum(parsedLatex) {
  var lowerLimit, upperLimit;
  var index = 0;

  for (var j = 0; j < 2; j++) {
    if (parsedLatex[index + j].value === '_') {
      index++;
      lowerLimit = parsedLatex[index + j];
    } else if (parsedLatex[index + j].value === '^') {
      index++;
      upperLimit = (0, _maximaTranspiler.transpiler)((0, _helpers.wrapForTranspilation)(parsedLatex[index + j]));
    } else {
      throw new Error('Finite integral must have both upper and lover limits');
    }
  }

  return {
    lowerLimit: lowerLimit,
    upperLimit: upperLimit
  };
}

function handleLowerSumArguments(parsedLatex) {
  (0, _common.assertNotUndefined)(parsedLatex[0], 'Missing index');
  var indexVariable = parsedLatex[0];
  (0, _common.assertNotUndefined)(parsedLatex[1], 'Index must be assigned. Missing equal sign');
  var equalSign = parsedLatex[1].value;

  if (!(0, _helpers.checkForVariable)(indexVariable)) {
    throw new Error('Index must be a variable');
  } else if (equalSign !== '=') {
    throw new Error('Index must be assigned. Missing equal sign');
  }

  var upperLim = parsedLatex.slice(2);
  var value = "";
  value += (0, _maximaTranspiler.transpiler)((0, _helpers.wrapForTranspilation)(upperLim));
  return {
    variable: indexVariable.value,
    value: value
  };
}

},{"../../helpers/helpers":6,"../maxima-transpiler":24,"./common":18}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transpiler = transpiler;

var _environment = require("./handlers/environment");

var _common = require("./handlers/common");

var _macros = require("../macros");

var _matrix = require("./handlers/matrix");

var _helpers = require("../helpers/helpers");

var _integration = require("./handlers/integration");

var _sum = require("./handlers/sum");

var _limit = require("./handlers/limit");

var _options = require("../options");

var logger = _interopRequireWildcard(require("../logger"));

var _greekLetters = require("../tokens/greek-letters");

var _functions = require("../functions");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @author     André Storhaug <andr3.storhaug@gmail.com>
 * @copyright  2018 NTNU
 */

/**
 * Will transpile a mathematical expression representation, derived from LaTeX,
 * to the corresponding language form required by Maxima.
 * Eg. 2*(3*4+4**2)/(sqrt(5))-8
 *
 * @param  {object} parsedLatex An object parsed by "./parser.js"
 * @return string The string representation of a mathematical expression in Maxima format, derived from LaTeX
 */
function transpiler(parsedLatex) {
  logger.debug('\n------------------ TRANSPILING -> -------------------');
  var options = (0, _options.getOptions)();
  var transpiledString = '';
  var index = 0;
  transpiledString += '(';

  var _loop = function _loop() {
    var item = parsedLatex[index];

    switch (item.type) {
      case 'operator':
        doOperator();
        break;

      case 'number':
        doNumber();
        break;

      case 'variable':
        doVariable();
        break;

      case 'group':
        doGroup();
        break;

      case 'token':
        doToken();
        break;

      case 'function':
        doFunction();
        break;

      case 'environment':
        doEnvironment();
        break;
    }

    function getCurrentTranspiledString() {
      return transpiledString.substring(1);
    }
    /**
     * Add times ("*") sign to transpiledString. If supplied with obj parameters with
     * types ex {type: 'function'}, {type: 'operator'}, times sign will not be added.
     * @param index
     * @param obj
     */


    function addTimesSign(index) {
      var previousToken = parsedLatex[index - 1];
      var isPass = true;

      if (index > 0) {
        for (var _len = arguments.length, obj = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          obj[_key - 1] = arguments[_key];
        }

        obj.forEach(function (e) {
          var allKeysMatch = true;

          for (var key in e) {
            if (!e.hasOwnProperty(key)) {
              continue;
            }

            if (previousToken[key] !== e[key]) {
              allKeysMatch = false;
            }
          }

          if (allKeysMatch === true) {
            isPass = false;
          }
        });

        if (options.addTimesSign && isPass) {
          logger.debug('Adding * before ' + item.type + ': ' + item.value + ', previous item: ' + parsedLatex[index - 1].type);
          transpiledString += '*';
        }
      }
    } // TODO possible move operator checking to post-parser, since this is a parser job.


    function doOperator() {
      var previousToken = parsedLatex[index - 1];

      if (index === 0 && item.value === '+') {
        logger.debug('Structure starts with +, ignoring');
      } else if (index === 0 && item.operatorType !== 'prefix' && item.value !== '-') {
        // TODO add "-" as valid prefix
        throw new Error('Operator ' + item.value + ' is not an prefix operator');
      } else {
        if (item.value === '+' || item.value === '-') {
          transpiledString += item.value;
        } else if (item.operatorType === 'postfix') {
          if (previousToken.type !== 'operator') {
            transpiledString += item.value;
          } else {
            throw new Error('Operator ' + item.value + ' has to be an postfix operator');
          }
        } else if (item.operatorType === 'prefix') {// transpiledString += item.value;
        } else if (item.operatorType === 'infix') {
          if (previousToken.type !== 'operator' && previousToken.type !== 'operator') {
            transpiledString += item.value;
          } else {
            throw new Error('Operator ' + item.value + ' has to be an infix operator');
          }
        }
      }

      if ((item.operatorType === 'infix' || item.operatorType === 'prefix') && index === parsedLatex.length - 1) {
        throw new Error('Operator ' + item.value + ' is an invalid end character.');
      }
    }

    function doNumber() {
      addTimesSign(index, {
        type: 'number'
      }, {
        type: 'operator',
        operatorType: 'infix'
      });
      transpiledString += item.value;
    }

    function doVariable() {
      var variableString = '';
      addTimesSign(index, {
        type: 'operator',
        operatorType: 'infix'
      });

      if ((0, _greekLetters.getName)(item.value) !== null) {
        var letter = (0, _greekLetters.getName)(item.value);

        if (options.onlyGreekSymbol) {
          letter = (0, _greekLetters.getSymbol)(letter);
        }

        logger.debug('greek letter ' + letter);
        variableString += letter;
      } else {
        variableString += item.value;
      }

      transpiledString += variableString;
    }

    function doGroup() {
      var groupString = '';
      addTimesSign(index, {
        type: 'function'
      }, {
        type: 'operator'
      });
      groupString += transpiler(item.value);

      if (item.symbol === 'vertical_bar') {
        groupString = (0, _helpers.stripParenthesis)(groupString);
      }

      transpiledString += groupString;
    }

    function doToken() {
      logger.debug('Handling token: ' + item.value);
      var tokenString = '';
      var startIndex = index;

      if ((0, _greekLetters.getSymbol)(item.value) !== null) {
        // Token is greek letter name
        var letter = item.value;

        if (options.onlyGreekSymbol) {
          letter = (0, _greekLetters.getSymbol)(letter);
        }

        logger.debug('greek letter ' + letter);
        tokenString += letter;
      }

      if ((0, _greekLetters.getName)(item.value) !== null) {
        // Token is greek letter symbol
        var _letter = item.value;

        if (options.onlyGreekName) {
          _letter = (0, _greekLetters.getName)(_letter);
        }

        logger.debug('greek letter ' + _letter);
        tokenString += _letter;
      }

      if ((0, _macros.isMacro)(item.value)) {
        var macro = _macros.MACROS.get(item.value);

        if (macro === null) {
          logger.debug('Skipping macro ' + item.value);
        } else if (macro !== undefined) {
          logger.debug('Adding macro ' + macro);
          tokenString += macro;
        }
      } // Handle fraction


      if (item.value === 'frac') {
        if (parsedLatex[index + 1].type === 'group' && parsedLatex[index + 2].type === 'group') {
          logger.debug('Found fraction');
          tokenString += '(';
          tokenString += transpiler(parsedLatex[index + 1].value) + '/' + transpiler(parsedLatex[index + 2].value);
          tokenString += ')';
          index += 2;
        } else {
          throw new Error('Fraction must have 2 following parameters');
        }
      }

      if (startIndex > 0 && tokenString !== '' && ((0, _macros.isMacro)(item.value) || (0, _greekLetters.isGreekLetter)(item.value))) {
        addTimesSign(startIndex, {
          type: 'operator'
        });
      }

      transpiledString += tokenString;
    }

    function doFunction() {
      addTimesSign(index, {
        type: 'operator'
      });
      var nextItem = parsedLatex[index + 1];

      if (item.value === 'sqrt') {
        if (parsedLatex[index + 1].type === 'group') {
          var sqrtString = '';

          if (parsedLatex[index + 1].symbol === 'square' && parsedLatex[index + 2].type === 'group') {
            logger.debug('Found function nth-square root');
            var nthArgString = transpiler(parsedLatex[index + 1].value);
            sqrtString += transpiler(parsedLatex[index + 2].value);
            sqrtString += '^(1/' + nthArgString + ')';
            index++;
          } else {
            transpiledString += item.value;
            logger.debug('Found function square root');
            sqrtString += transpiler(parsedLatex[index + 1].value);
          }

          transpiledString += sqrtString;
          index++;
        } else {
          throw new Error('Square root must be followed by [] or {}');
        }
      } else if (item.value === 'lim') {
        logger.debug('Found function "limit"');
        handleLimit();
      } else if (item.value === 'binom') {
        logger.debug('Found function "binomial"');
        handleBinomial();
      } else if (item.value === 'sum') {
        logger.debug('Found function "sum"');
        handleSum();
      } else if (item.value === 'integral') {
        logger.debug('Found function "integral"');
        handleIntegral();
      } else if (item.value === 'abs') {
        logger.debug('Found function "abs"');
        handleAbs();
      } else if ((0, _functions.isTrigonometricFunction)(item.value)) {
        logger.debug('Found trigonometric function "' + item.value + '"');
        handleTrig();
      } else {
        logger.debug('Found normal "function"');
        handleNormalFunction();
      }

      function handleNormalFunction() {
        var expression = '';
        var func = item.value;
        (0, _common.assertNotUndefined)(parsedLatex[index + 1], 'Missing argument in function: ' + func);
        expression += func;
        index++;

        if (parsedLatex[index].type === 'group') {
          expression += transpiler(parsedLatex[index].value);
          index++;
        } else if (parsedLatex[index].type === 'function') {
          var _getExpressionLength = (0, _common.getExpressionLength)(parsedLatex.slice(index + 1), ['function'], ['+', '-', '+-']),
              expressionLength = _getExpressionLength.expressionLength;

          expressionLength += 1;
          expression += transpiler((0, _helpers.wrapForTranspilation)(parsedLatex.slice(index, index + expressionLength)));
          index += expressionLength - 1;
        } else {
          var latexSlice = parsedLatex.slice(index);
          var i;

          for (i = 0; i < latexSlice.length; i++) {
            if (latexSlice[i].type !== 'variable' && latexSlice[i].type !== 'number') {
              break;
            }
          }

          var _expressionLength = i;
          expression += transpiler((0, _helpers.wrapForTranspilation)(parsedLatex.slice(index, index + _expressionLength)));
          index += _expressionLength - 1;
        }

        transpiledString += expression;
      }

      function handleTrig() {
        var expression = '';
        var exponentiate = false;
        var exponent;
        var func = item.value;
        (0, _common.assertNotUndefined)(parsedLatex[index + 1], 'Missing argument in function: ' + func);

        if (parsedLatex[index + 1].value === '^') {
          exponentiate = true;
          (0, _common.assertNotUndefined)(parsedLatex[index + 2], 'Missing argument in function: ' + func + '^');
          exponent = transpiler((0, _helpers.wrapForTranspilation)(parsedLatex[index + 2]));
          exponent = (0, _helpers.stripParenthesis)(exponent);

          if ((0, _helpers.stripAllParenthesis)(exponent) === '-1') {
            logger.debug('Function is inverse');
            exponentiate = false;
            var inverseFunc = (0, _functions.getInverseTrigonometricFunction)(func);

            if (inverseFunc !== null) {
              func = inverseFunc;
            } else {
              throw new Error('No inverse trigonometric function found for ' + func);
            }
          }

          index += 2;
        }

        expression += func;

        if (exponentiate) {
          (0, _common.assertNotUndefined)(parsedLatex[index + 1], 'Missing argument in function: ' + func + '^' + transpiler((0, _helpers.wrapForTranspilation)(parsedLatex[index])));
        } else {
          (0, _common.assertNotUndefined)(parsedLatex[index + 1], 'Missing argument in function: ' + func);
        }

        if (parsedLatex[index + 1].type === 'group') {
          expression += transpiler(parsedLatex[index + 1].value);
          index++;
        } else if (parsedLatex[index + 1].type === 'function') {
          var _getExpressionLength2 = (0, _common.getExpressionLength)(parsedLatex.slice(index + 2), ['function'], ['+', '-', '+-']),
              expressionLength = _getExpressionLength2.expressionLength;

          expressionLength += 1;
          expression += transpiler((0, _helpers.wrapForTranspilation)(parsedLatex.slice(index + 1, index + 1 + expressionLength)));
          index += expressionLength - 1;
        } else {
          var _getExpressionLength3 = (0, _common.getExpressionLength)(parsedLatex.slice(index + 1), ['function'], ['+', '-', '+-']),
              _expressionLength2 = _getExpressionLength3.expressionLength;

          expression += transpiler((0, _helpers.wrapForTranspilation)(parsedLatex.slice(index + 1, index + 1 + _expressionLength2)));
          index += _expressionLength2 - 1;
        }

        if (exponentiate) {
          expression = '(' + expression + ')' + '^' + exponent;
        }

        index++;
        transpiledString += expression;
      }

      function handleAbs() {
        var expression = '';
        var func = item.value;
        expression += func;
        expression += transpiler((0, _helpers.wrapForTranspilation)(parsedLatex[index + 1]));
        index++;
        transpiledString += expression;
      }

      function handleBinomial() {
        // TODO doesn't handle \binom234 as 2 and 3 needs to be parsed as single digits... this is a parser problem...
        var binomialString = '';
        var expression1 = '';
        var expression2 = '';
        var expr1 = parsedLatex[index + 1].type;
        var expr2 = parsedLatex[index + 2].type;

        if (expr1 === 'group' && expr2 === 'group') {
          expression1 += transpiler(parsedLatex[index + 1].value);
          expression2 += transpiler(parsedLatex[index + 2].value);
        } else {
          throw new Error('Binomial must have 2 following groups');
        }

        binomialString += (0, _helpers.buildMaximaFunctionString)('binomial', expression1, expression2);
        transpiledString += binomialString;
        index += 2;
      }

      function handleLimit() {
        // TODO: review: first arg in limit isn't recognized if it is a multi char variable and onlySingleVariables option
        // is true
        var limitString = '';
        var expression = '';

        if (parsedLatex[index + 1].value === '_' && parsedLatex[index + 2].type === 'group') {
          var limitArgs = parsedLatex[index + 2].value;
          limitArgs = (0, _limit.handleLimitArguments)(limitArgs);

          if (typeof parsedLatex[index + 3] !== 'undefined') {
            var _getExpressionLength4 = (0, _common.getExpressionLength)(parsedLatex.slice(index + 3), [], ['+', '-', '+-']),
                limitLength = _getExpressionLength4.expressionLength;

            expression += transpiler(parsedLatex.slice(index + 3, index + 3 + limitLength));
            index += limitLength - 1;
          } else {
            throw new Error('Missing argument in limit');
          }

          limitString = (0, _helpers.buildMaximaFunctionString)('limit', expression, limitArgs.variable, limitArgs.value, limitArgs.direction);
          index += 3;
        } else {
          throw new Error('Limit must have a "from" and "to" value');
        }

        transpiledString += limitString;
      }

      function handleSum() {
        var sumString = '';
        var expression = '';
        var lowerArgAssignment, upperArg;
        var indexVariable = '';

        if (parsedLatex[index + 1].value !== '_' && parsedLatex[index + 1].value !== '^') {
          throw new Error('Sum does not contain the correct number of arguments');
        } else {
          var integrationLimits = (0, _sum.handleUpperAndLowerArgsSum)(parsedLatex.slice(index + 1));
          var lowerArg = integrationLimits.lowerLimit.value;
          upperArg = integrationLimits.upperLimit;
          index += 4;
          lowerArg = (0, _sum.handleLowerSumArguments)(lowerArg);
          indexVariable = lowerArg.variable;
          lowerArgAssignment = lowerArg.value;
          logger.debug('Sum: arguments are form ' + lowerArgAssignment + ' to ' + upperArg);
        }

        if (typeof parsedLatex[index + 1] !== 'undefined') {
          var _getExpressionLength5 = (0, _common.getExpressionLength)(parsedLatex.slice(index + 1), [], ['+', '-', '+-']),
              sumLength = _getExpressionLength5.expressionLength;

          expression += transpiler(parsedLatex.slice(index + 1, index + 1 + sumLength));
          index += sumLength;
        } else {
          throw new Error('Missing argument in sum');
        }

        sumString += (0, _helpers.buildMaximaFunctionString)('sum', expression, indexVariable, lowerArgAssignment, upperArg);
        transpiledString += sumString;
      }

      function handleIntegral() {
        var integralString = '';
        var expression = '';
        var lowerLimit, upperLimit;
        var integrationVariable = '';
        var integralLength;
        var isSymbolic = false;
        (0, _common.assertNotUndefined)(parsedLatex[index + 1], 'Missing argument in integral');

        if (parsedLatex[index + 1].value !== '_' && parsedLatex[index + 1].value !== '^') {
          // Symbolic integral
          logger.debug('Integral is symbolic');
          isSymbolic = true;
          index++;
        } else {
          // Finite integral
          var integralArgs = parsedLatex.slice(index + 1, index + 5);
          var integrationLimits = (0, _integration.handleUpperAndLowerArgs)(integralArgs);
          lowerLimit = integrationLimits.lowerLimit;
          upperLimit = integrationLimits.upperLimit;
          logger.debug('Integration limits are from ' + lowerLimit + ' to ' + upperLimit);
          index += 5;
        }

        var integralEnd = (0, _integration.findIntegralEnd)(parsedLatex.slice(index));
        integrationVariable += integralEnd.variable;
        integralLength = integralEnd.length;
        var unTranspiledIntegralLatex = parsedLatex.slice(index, index + integralLength);
        (0, _common.assertNotUndefined)(unTranspiledIntegralLatex[unTranspiledIntegralLatex.length - 1], 'Missing argument in integral');

        if (unTranspiledIntegralLatex[unTranspiledIntegralLatex.length - 1].value === '*') {
          unTranspiledIntegralLatex.splice(-1, 1);
        }

        expression += transpiler(unTranspiledIntegralLatex);
        index += integralLength;

        if (isSymbolic) {
          integralString += (0, _helpers.buildMaximaFunctionString)('integrate', expression, integrationVariable);
        } else {
          integralString += (0, _helpers.buildMaximaFunctionString)('integrate', expression, integrationVariable, lowerLimit, upperLimit);
        }

        transpiledString += integralString;
      }
    }

    function doEnvironment() {
      if (item.state === 'begin') {
        addTimesSign(index, {
          type: 'operator'
        });
        var expression = '';
        var envLength = (0, _environment.environmentLength)(parsedLatex.slice(index));

        if (item.value === 'matrix') {
          logger.debug('Found matrix environment');
          expression += (0, _matrix.handleMatrix)(parsedLatex.slice(index + 1, index + 1 + envLength));
        }

        index += envLength + 1;
        transpiledString += expression;
      } else if (item.state === 'end') {
        index++;
      }
    }
  };

  for (index; index < parsedLatex.length; index++) {
    _loop();
  }

  transpiledString += ')';

  if (/(\([ ]*\))/.test(transpiledString)) {
    throw new Error('Syntax error');
  }

  if (transpiledString === '') {
    throw new Error('EMPTY');
  } //TODO FIX, possibly remove


  return transpiledString;
}

},{"../functions":5,"../helpers/helpers":6,"../logger":9,"../macros":10,"../options":11,"../tokens/greek-letters":16,"./handlers/common":18,"./handlers/environment":19,"./handlers/integration":20,"./handlers/limit":21,"./handlers/matrix":22,"./handlers/sum":23}]},{},[1])(1)
});
