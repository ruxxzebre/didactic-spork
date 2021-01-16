//TODO - object and array items

/**
 * Item for interfaces and parameters
 * @typedef {Object} IntegrationItem
 * @property {string} Name
 * @property {string} Label
 * @property {string} Type
 * @property {*} [spec]
 * @property {*} [options]
 */

const ACRONYMS = ['ID', 'URL', 'JSON', 'HTML', 'PDF', 'IP', 'SMS', 'ISO', 'ZIP', 'AMP', 'ISP', 'OS', 'IOS', 'UTM', 'UTC', 'GDPR', 'API', 'VAT', 'IVR', 'MRR', 'PO'];

const ARTICLES = ['at', 'by', 'to', 'on', 'in', 'of', 'for', 'from', 'or', 'via', 'be', 'is'];

const MATCH_TYPES = {
  array: (object) => Array.isArray(object),
  boolean: (object) => object.constructor.name === 'Boolean',
  string: (object) => object.constructor.name === 'String',
  number: (object) => !isNaN(+object),
  collection: (object) => object.constructor.name === 'Object',
  null: (object) => object === null,
}

const MATCH_STRING = {
  color: (string) => !!string.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g),
  date: (string) => !isNaN(Date.parse(string)),
  email: (string) => !!string.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi)
}

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
  return { type: check.toString() };
}

const parseObject = (object) => {
  const { collection: isObject } = MATCH_TYPES;
  const resultObj = {
    type: 'collection',
    options: []
  };
  Object.keys(object).forEach((key) => {
    if (isObject(key)) {
      // DO SOMETHING
      return;
    }
    resultObj.options.push(
      itemConstructor(key, parseType(object[key]))
    );
  });
  return resultObj;
}

/**
 * Parses values with array type, even with objects inside
 * @param {*[]} array
 * @param {string} customLabel
 * @return {{type: string, spec: *[]}}
 */
const parseArray = (array, customLabel='Probably should add yourself.') => {
  const resultObj = {
    type: 'array'
  };
  if (array.length > 1) {
    // TODO: parse inner objects
    resultObj.spec = [];
  } else if (array.length === 1) {
    resultObj.spec = {
      type: parseType(array[0]),
      label: customLabel
    }
  } else {
    resultObj.spec = [];
  }
  return resultObj;
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
      } else {
        return check.toString();
      }
    }
  }
  throw new Error('Invalid property type.');
}

/**
 * Label parser. Divides camelCase, snake_case and other cases
 * into needed form.
 * @param {string} name
 * @return {string}
 */
const parseLabel = (name) => {
  const regex = /(\d*[A-Z]*\d*[a-zA-Z]+\d*(?=[_\-\s]?)[a-z]*)/g;
  const words = name.match(regex);
  return words.map(w => parseMisc(w)).join(' ');
}

/**
 * Parses miscellaneous
 * @param {string} string
 * @return {string}
 */
const parseMisc = (string) => {
  if (ARTICLES.includes(string.toLowerCase())) {
    return string.toLowerCase();
  } else if (ACRONYMS.includes(string.toUpperCase())) {
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
const itemConstructor = (key, other) => {
  return {
    name: key,
    label: parseLabel(key),
    ...other,
  }
}

/**
 *
 * @param {*} jsonObj
 * @return {IntegrationItem[]}
 */
export const processJSON = (jsonObj) => {
  const result = [];
  Object.keys(jsonObj).map(item => result.push(itemConstructor(item, parseType(jsonObj[item]))));
  return result;
}
