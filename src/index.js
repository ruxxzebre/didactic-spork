const {
  MATCH_TYPES,
  MATCH_STRING
} = require('./match');

const exclusions = require('./assets/exclusions.json');
const { acronyms, articles } = exclusions;

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
const parseText = (text) => {
  for (let check in MATCH_STRING) {
    if (MATCH_STRING[check](text)) {
      return { type: check.toString() };
    }
  }
  return { type: 'text' };
}

/**
 * Parses object type values
 * @param {*} object
 * @return {{type: string, spec: *}}
 */
const parseObject = (object) => {
  return {
    type: 'collection',
    spec: Object.keys(object)
      .map((key) => itemConstructor(key, parseType(object[key])))
  };
}

/**
 * Parses values with array type, even with objects inside
 * @param {*} array
 * @return {{type: string, spec: * | Object}}
 */
const parseArray = (array) => {
  return {
    type: 'array',
    spec: array.length ? parseType(array[0]) : parseType("string")
  };
}

/**
 * Parses type of passed value accordingly to prod docs
 * @param {*} value
 * @return {*}
 */
const parseType = (value) => {
  for (let check in MATCH_TYPES) {
    if (MATCH_TYPES[check](value)) {
      const stringType = check.toString();
      if (stringType === 'string') {
        return parseText(value);
      } else if (stringType === 'array') {
        return parseArray(value);
      } else if (stringType === 'collection') {
        return parseObject(value);
      } else if (stringType === 'null') {
        return { type: 'text' };
      } else {
        return { type: check.toString() };
      }
    }
  }
  throw new Error('Invalid property type.');
}

/**
 * Label parser. Divides camelCase, PascalCase,
 * snake_case and other cases by words.
 * @param {string} name
 * @return {string}
 */
const parseLabel = (name) => {
  const regex = /(\d*[A-Z]*\d*[a-zA-Z]\d*[a-z]*)/g;
  const words = name.match(regex);
  return words.map(w => parseMisc(w)).join(' ');
}

/**
 * Parses miscellaneous
 * @param {string} string
 * @return {string}
 */
const parseMisc = (string) => {
  if (articles.includes(string.toLowerCase())) {
    return string.toLowerCase();
  } else if (acronyms.includes(string.toUpperCase())) {
    return string.toUpperCase();
  } else {
    // check if word initially in uppercase
    if (string.toUpperCase() === string) return string;
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  }
}

/**
 * Constructor function for single item
 * @param {string} key
 * @param {*} other - contains type and misc prop, like spec or options
 * @return {{name, label, type}}
 */
let itemConstructor;

/**
 * Cleans JSON from array wrapper
 * @param jsonObj Initial JSON object
 * @return {*} Cleaned JSON object
 */
const cleanJson = (jsonObj) => {
  if (MATCH_TYPES.array(jsonObj) && jsonObj.length === 1) {
    return jsonObj[0];
  } else if (MATCH_TYPES.collection(jsonObj)) {
    return jsonObj;
  } else {
    throw new Error(`Invalid JSON passed. 
      Probably it\`s array with multiple items. 
      Only Object or Object wrapped in array are valid input.`);
  }
};

/**
 *
 * @param {*} jsonObj
 * @param {boolean} withLabel
 * @return {IntegrationItem[]}
 */
const processJSON = (jsonObj, withLabel = false) => {
  jsonObj = cleanJson(jsonObj);
  if (withLabel) {
    itemConstructor = (key, other) => ({
      name: key,
      label: parseLabel(key),
      ...other,
    });
  } else {
    itemConstructor = (key, other) => ({
      name: key,
      ...other,
    });
  }

  return Object.keys(jsonObj)
    .map(item => itemConstructor(item, parseType(jsonObj[item])));
}

module.exports.processJSON = processJSON;
