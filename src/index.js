//TODO - object and array items

/**
 * Item for interfaces and parameters
 * @typedef {Object} IntegrationItem
 * @property {string} Name
 * @property {string} Type
 * @property {string} Label
 */

const ACRONYMS = ['ID', 'URL', 'JSON', 'HTML', 'PDF', 'IP', 'SMS', 'ISO', 'ZIP', 'AMP', 'ISP', 'OS', 'IOS', 'UTM', 'UTC', 'GDPR', 'API', 'VAT', 'IVR', 'MRR', 'PO'];

const ARTICLES = ['at', 'by', 'to', 'on', 'in', 'of', 'for', 'from', 'or', 'via', 'be', 'is'];

const MATCH_TYPES = {
  array: (object) => Array.isArray(object),
  boolean: (object) => object.constructor.name === 'Boolean',
  string: (object) => object.constructor.name === 'String',
  number: (object) => !isNaN(+object),
  object: (object) => object.constructor.name === 'Object',
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
 * @return {string}
 */
const parseText = (text) => {
  for (let check in MATCH_STRING) {
    if (MATCH_STRING[check](text)) {
      return check.toString();
    }
  }
  return 'text';
}

/**
 * Parses type of passed value accordingly to prod docs
 * @param {*} value
 * @return {string}
 */
const parseType = (value) => {
  for (let check in MATCH_TYPES) {
    if (MATCH_TYPES[check](value)) {
      const stringType = check.toString();
      if (stringType !== 'string') {
        return check.toString();
      } else {
        return parseText(value);
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
 * @param {*} type
 * @return {{name, label, type}}
 */
const itemConstructor = (key, type) => {
  return {
    name: key,
    type,
    label: parseLabel(key)
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
