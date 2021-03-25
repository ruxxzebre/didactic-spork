const {
  MATCH_TYPES,
  MATCH_STRING
} = require('./match');

const { acronyms, articles } = require('./assets/exclusions.json');
const { CASE_REGEX } = require('./constants');

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
      .map((key) => ItemConstructor(key, parseType(object[key])))
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
  const words = name.match(CASE_REGEX);
  return words.filter(Boolean).map((w, i) => parseMisc(w, i)).join(' ');
}

/**
 * Parses miscellaneous
 * @param {string} string
 * @return {string}
 */
const parseMisc = (string, index) => {
  const upFirstLetter = ([first, ...rest]) => first.toUpperCase() + rest.join('');

  if (index === 0) return upFirstLetter(string);
  if (articles.includes(string.toLowerCase())) {
    return string.toLowerCase();
  } else if (acronyms.includes(string.toUpperCase())) {
    return string.toUpperCase();
  }
  // check if word initially in uppercase
  if (string.toUpperCase() === string) return string;
  return upFirstLetter(string);

}

/**
 * Constructor function for single item
 * @function ItemConstructor
 * @param {string} key
 * @param {*} other - contains type and misc prop, like spec or options
 * @return {{name, label, type}}
 */
let ItemConstructor;

/**
 *
 * @param {boolean} includeLabel
 * @return ItemConstructor
 */
const NewItemConstructor = (includeLabel) => (key, other) => {
  return {
    name: key,
    ...includeLabel && ({label: parseLabel(key)}),
    ...other,
  };
}

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

const ParseFormattedParameters = (json, withLabel) => {
  const fields = [
    'name', 'label', 'type', 'help', 'required', 'default', 'advanced', 'options', 'spec'
  ];
  const stabilityConf = -3;
  const validateParam = (obj) => {
    const keys = Object.keys(obj);
    const cb = (i) => fields.includes(i);
    return keys.filter(cb).length === keys.length;
  };
  let validFlag = true;
  if (json.constructor.name !== 'Array') return null;
  json = json.map(obj => {
    if (!validateParam(obj)) return validFlag = false;
    if (obj.name) {
      if (!obj.label || withLabel) {
        const parsedLabel = parseLabel(obj.name);
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
const processJSON = (jsonObj, withLabel = false) => {
  let formatted;
  if (formatted = ParseFormattedParameters(jsonObj, withLabel)) return formatted;
  jsonObj = cleanJson(jsonObj);
  ItemConstructor = NewItemConstructor(withLabel);
  return Object.keys(jsonObj)
    .map(item => ItemConstructor(item, parseType(jsonObj[item])));
}

module.exports.processJSON = processJSON;
