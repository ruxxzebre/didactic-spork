parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"6Yv0":[function(require,module,exports) {
var n={null:function(n){return null===n},undefined:function(n){function r(r){return n.apply(this,arguments)}return r.toString=function(){return n.toString()},r}(function(n){if(void 0===n)throw new Error("Value is undefined. Probably empty value passed in function somewhere.");return!1}),array:function(n){return Array.isArray(n)},boolean:function(n){return n===!!n},string:function(n){return"String"===n.constructor.name},number:function(n){return!isNaN(+n)},collection:function(n){return"Object"===n.constructor.name}},r={color:function(n){return!!n.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g)},date:function(n){return/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(n)&&new Date(n).toISOString()===n},email:function(n){return!!n.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi)}};module.exports={MATCH_TYPES:n,MATCH_STRING:r};
},{}],"CwIF":[function(require,module,exports) {
module.exports={acronyms:["HTTP","HTTPS","ID","URL","JSON","HTML","PDF","IP","SMS","ISO","ZIP","AMP","ISP","OS","IOS","UTM","UTC","GDPR","API","VAT","IVR","MRR","PO"],articles:["at","by","to","on","in","of","for","from","or","via","be","is"]};
},{}],"iJA9":[function(require,module,exports) {
var d=/(\d*[A-Z]*\d*[a-zA-Z]\d*[a-z]*)|(\d*)/g;module.exports={CASE_REGEX:d};
},{}],"Focm":[function(require,module,exports) {
function e(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}function r(r){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?e(Object(o),!0).forEach(function(e){t(r,e,o[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(o,e))})}return r}function t(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var n,o=require("./match"),i=o.MATCH_TYPES,c=o.MATCH_STRING,a=require("./assets/exclusions.json"),u=a.acronyms,p=a.articles,s=require("./constants"),l=s.CASE_REGEX,f=function(e){for(var r in c)if(c[r](e))return{type:r.toString()};return{type:"text"}},y=function(e){return{type:"collection",spec:Object.keys(e).map(function(r){return n(r,O(e[r]))})}},b=function(e){return{type:"array",spec:e.length?O(e[0]):O("string")}},O=function(e){for(var r in i)if(i[r](e)){var t=r.toString();return"string"===t?f(e):"array"===t?b(e):"collection"===t?y(e):"null"===t?{type:"text"}:{type:r.toString()}}throw new Error("Invalid property type.")},j=function(e){return e.match(l).filter(Boolean).map(function(e){return g(e)}).join(" ")},g=function(e){return p.includes(e.toLowerCase())?e.toLowerCase():u.includes(e.toUpperCase())?e.toUpperCase():e.toUpperCase()===e?e:e[0].toUpperCase()+e.slice(1).toLowerCase()},w=function(e){if(i.array(e)&&1===e.length)return e[0];if(i.collection(e))return e;throw new Error("Invalid JSON passed. \n      Probably it`s array with multiple items. \n      Only Object or Object wrapped in array are valid input.")},m=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e=w(e),n=t?function(e,t){return r({name:e,label:j(e)},t)}:function(e,t){return r({name:e},t)},Object.keys(e).map(function(r){return n(r,O(e[r]))})};module.exports.processJSON=m;
},{"./match":"6Yv0","./assets/exclusions.json":"CwIF","./constants":"iJA9"}]},{},["Focm"], null)
//# sourceMappingURL=src.b29a3e0d.js.map