parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Yv0E":[function(require,module,exports) {
var n={null:function(n){return null===n},undefined:function(n){function r(r){return n.apply(this,arguments)}return r.toString=function(){return n.toString()},r}(function(n){if(void 0===n)throw new Error("Value is undefined. Probably empty value passed in function somewhere.");return!1}),array:function(n){return Array.isArray(n)},boolean:function(n){return n===!!n},string:function(n){return"String"===n.constructor.name},number:function(n){return!isNaN(+n)},collection:function(n){return"Object"===n.constructor.name}},r={color:function(n){return!!n.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g)},date:function(n){return/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(n)&&new Date(n).toISOString()===n},email:function(n){return!!n.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi)}};module.exports={MATCH_TYPES:n,MATCH_STRING:r};
},{}],"CwIF":[function(require,module,exports) {
module.exports={acronyms:["HTTP","HTTPS","ID","URL","JSON","HTML","PDF","IP","SMS","ISO","ZIP","AMP","ISP","OS","IOS","UTM","UTC","GDPR","API","VAT","IVR","MRR","PO"],articles:["at","by","to","on","in","of","for","from","or","via","be","is"]};
},{}],"Focm":[function(require,module,exports) {
function e(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}function r(r){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?e(Object(o),!0).forEach(function(e){t(r,e,o[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(o,e))})}return r}function t(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var n,o=require("./match"),c=o.MATCH_TYPES,i=o.MATCH_STRING,u=require("./assets/exclusions.json"),a=u.acronyms,p=u.articles,s=function(e){for(var r in i)if(i[r](e))return{type:r.toString()};return{type:"text"}},f=function(e){return{type:"collection",spec:Object.keys(e).map(function(r){return n(r,y(e[r]))})}},l=function(e){return{type:"array",spec:e.length?y(e[0]):y("string")}},y=function(e){for(var r in c)if(c[r](e)){var t=r.toString();return"string"===t?s(e):"array"===t?l(e):"collection"===t?f(e):"null"===t?{type:"text"}:{type:r.toString()}}throw new Error("Invalid property type.")},b=function(e){return e.match(/(\d*[A-Z]*\d*[a-zA-Z]\d*[a-z]*)/g).map(function(e){return O(e)}).join(" ")},O=function(e){return p.includes(e.toLowerCase())?e.toLowerCase():a.includes(e.toUpperCase())?e.toUpperCase():e.toUpperCase()===e?e:e[0].toUpperCase()+e.slice(1).toLowerCase()},g=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n=t?function(e,t){return r({name:e,label:b(e)},t)}:function(e,t){return r({name:e},t)},Object.keys(e).map(function(r){return n(r,y(e[r]))})};module.exports.processJSON=g;
},{"./match":"Yv0E","./assets/exclusions.json":"CwIF"}]},{},["Focm"], null)
//# sourceMappingURL=src.bf178b3c.js.map