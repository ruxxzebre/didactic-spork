// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"match.js":[function(require,module,exports) {
var MATCH_TYPES = {
  null: function _null(object) {
    return object === null;
  },
  undefined: function (_undefined) {
    function undefined(_x) {
      return _undefined.apply(this, arguments);
    }

    undefined.toString = function () {
      return _undefined.toString();
    };

    return undefined;
  }(function (object) {
    if (object === undefined) throw new Error('Value is undefined. Probably empty value passed in function somewhere.');
    return false;
  }),
  array: function array(object) {
    return Array.isArray(object);
  },
  boolean: function boolean(object) {
    return object === !!object;
  },
  string: function string(object) {
    return object.constructor.name === 'String';
  },
  number: function number(object) {
    return !isNaN(+object);
  },
  collection: function collection(object) {
    return object.constructor.name === 'Object';
  }
};
var MATCH_STRING = {
  color: function color(string) {
    return !!string.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g);
  },
  date: function date(string) {
    return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(string) && new Date(string).toISOString() === string;
  },
  email: function email(string) {
    return !!string.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi);
  }
};
module.exports = {
  MATCH_TYPES: MATCH_TYPES,
  MATCH_STRING: MATCH_STRING
};
},{}],"assets/exclusions.json":[function(require,module,exports) {
module.exports = {
  "acronyms": ["HTTP", "HTTPS", "ID", "URL", "JSON", "HTML", "PDF", "IP", "SMS", "ISO", "ZIP", "AMP", "ISP", "OS", "IOS", "UTM", "UTC", "GDPR", "API", "VAT", "IVR", "MRR", "PO"],
  "articles": ["at", "by", "to", "on", "in", "of", "for", "from", "or", "via", "be", "is"]
};
},{}],"constants.js":[function(require,module,exports) {
var CASE_REGEX = /(\d*[A-Z]*\d*[a-zA-Z]\d*[a-z]*)|(\d*)/g;
module.exports = {
  CASE_REGEX: CASE_REGEX
};
},{}],"index.js":[function(require,module,exports) {
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('./match'),
    MATCH_TYPES = _require.MATCH_TYPES,
    MATCH_STRING = _require.MATCH_STRING;

var _require2 = require('./assets/exclusions.json'),
    acronyms = _require2.acronyms,
    articles = _require2.articles;

var _require3 = require('./constants'),
    CASE_REGEX = _require3.CASE_REGEX;
/**
 * Item for interfaces and parameters
 * @typedef {Object} IntegrationItem
 * @property {string} Name
 * @property {string} Label
 * @property {string} Type
 * @property {*} [spec]
 * @property {*} [options]
 */

/**
 * Parses type of the string
 * @param {string} text
 * @return {{type: string}}
 */


var parseText = function parseText(text) {
  for (var check in MATCH_STRING) {
    if (MATCH_STRING[check](text)) {
      return {
        type: check.toString()
      };
    }
  }

  return {
    type: 'text'
  };
};
/**
 * Parses object type values
 * @param {*} object
 * @return {{type: string, spec: *}}
 */


var parseObject = function parseObject(object) {
  return {
    type: 'collection',
    spec: Object.keys(object).map(function (key) {
      return ItemConstructor(key, parseType(object[key]));
    })
  };
};
/**
 * Parses values with array type, even with objects inside
 * @param {*} array
 * @return {{type: string, spec: * | Object}}
 */


var parseArray = function parseArray(array) {
  return {
    type: 'array',
    spec: array.length ? parseType(array[0]) : parseType("string")
  };
};
/**
 * Parses type of passed value accordingly to prod docs
 * @param {*} value
 * @return {*}
 */


var parseType = function parseType(value) {
  for (var check in MATCH_TYPES) {
    if (MATCH_TYPES[check](value)) {
      var stringType = check.toString();

      if (stringType === 'string') {
        return parseText(value);
      } else if (stringType === 'array') {
        return parseArray(value);
      } else if (stringType === 'collection') {
        return parseObject(value);
      } else if (stringType === 'null') {
        return {
          type: 'text'
        };
      } else {
        return {
          type: check.toString()
        };
      }
    }
  }

  throw new Error('Invalid property type.');
};
/**
 * Label parser. Divides camelCase, PascalCase,
 * snake_case and other cases by words.
 * @param {string} name
 * @return {string}
 */


var parseLabel = function parseLabel(name) {
  var words = name.match(CASE_REGEX);
  return words.filter(Boolean).map(function (w, i) {
    return parseMisc(w, i);
  }).join(' ');
};
/**
 * Parses miscellaneous
 * @param {string} string
 * @return {string}
 */


var parseMisc = function parseMisc(string, index) {
  var upFirstLetter = function upFirstLetter(_ref) {
    var _ref2 = _toArray(_ref),
        first = _ref2[0],
        rest = _ref2.slice(1);

    return first.toUpperCase() + rest.join('');
  };

  if (index === 0) return upFirstLetter(string);

  if (articles.includes(string.toLowerCase())) {
    return string.toLowerCase();
  } else if (acronyms.includes(string.toUpperCase())) {
    return string.toUpperCase();
  } // check if word initially in uppercase


  if (string.toUpperCase() === string) return string;
  return upFirstLetter(string);
};
/**
 * Constructor function for single item
 * @function ItemConstructor
 * @param {string} key
 * @param {*} other - contains type and misc prop, like spec or options
 * @return {{name, label, type}}
 */


var ItemConstructor;
/**
 *
 * @param {boolean} includeLabel
 * @return ItemConstructor
 */

var NewItemConstructor = function NewItemConstructor(includeLabel) {
  return function (key, other) {
    return _objectSpread(_objectSpread({
      name: key
    }, includeLabel && {
      label: parseLabel(key)
    }), other);
  };
};
/**
 * Cleans JSON from array wrapper
 * @param jsonObj Initial JSON object
 * @return {*} Cleaned JSON object
 */


var cleanJson = function cleanJson(jsonObj) {
  if (MATCH_TYPES.array(jsonObj) && jsonObj.length === 1) {
    return jsonObj[0];
  } else if (MATCH_TYPES.collection(jsonObj)) {
    return jsonObj;
  } else {
    throw new Error("Invalid JSON passed. \n      Probably it`s array with multiple items. \n      Only Object or Object wrapped in array are valid input.");
  }
};

var ParseFormattedParameters = function ParseFormattedParameters(json, withLabel) {
  var fields = ['name', 'label', 'type', 'help', 'required', 'default', 'advanced', 'options', 'spec'];
  var stabilityConf = -3;

  var validateParam = function validateParam(obj) {
    var keys = Object.keys(obj);

    var cb = function cb(i) {
      return fields.includes(i);
    };

    return keys.filter(cb).length === keys.length;
  };

  var validFlag = true;
  if (json.constructor.name !== 'Array') return null;
  json = json.map(function (obj) {
    if (!validateParam(obj)) return validFlag = false;

    if (obj.name) {
      if (!obj.label || withLabel) {
        var parsedLabel = parseLabel(obj.name);

        if (obj.label && obj.label.length + stabilityConf < parsedLabel.length) {
          obj.label = parsedLabel;
        }
      }

      return obj;
    }

    validFlag = false;
  });
  return validFlag ? json : null;
};
/**
 *
 * @param {*} jsonObj
 * @param {boolean} withLabel
 * @return {IntegrationItem[]}
 */


var processJSON = function processJSON(jsonObj) {
  var withLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var formatted;
  if (formatted = ParseFormattedParameters(jsonObj, withLabel)) return formatted;
  jsonObj = cleanJson(jsonObj);
  ItemConstructor = NewItemConstructor(withLabel);
  return Object.keys(jsonObj).map(function (item) {
    return ItemConstructor(item, parseType(jsonObj[item]));
  });
};

module.exports.processJSON = processJSON;
},{"./match":"match.js","./assets/exclusions.json":"assets/exclusions.json","./constants":"constants.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49997" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map