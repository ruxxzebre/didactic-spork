const input = document.getElementById('input');
const output = document.getElementById('output');
const rotate = document.getElementById('arrowBtn');

rotate.addEventListener('click', () => {
  const wrapper = document.getElementsByClassName('wrapper')[0];
  if (wrapper.className === 'wrapper vertical') {
    wrapper.className = 'wrapper horizontal';
  } else {
    wrapper.className = 'wrapper vertical';
  }
});

input.focus();
input.addEventListener('input', (e) => {
  let obj;
  try {
    obj = JSON.parse(e.target.value);
    obj = processJSON(obj);
    output.value = JSON.stringify(obj, null, 4);
    output.select();
  } catch (e) {
    output.value = 'It is not valid JSON.';
  }
});

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

const parseText = (text) => {
  for (let check in MATCH_STRING) {
    if (MATCH_STRING[check](text)) {
      return check.toString();
    }
  }
  return 'text';
}

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

const parseLabel = (name) => {
  const regex = /(\d*[A-Z]*\d*[a-zA-Z]+\d*(?=[_\-\s]?)[a-z]*)/g;
  const words = name.match(regex);
  return words.map(w => parseMisc(w)).join(' ');
}

const parseMisc = (string) => {
  if (ARTICLES.includes(string.toLowerCase())) {
    return string.toLowerCase();
  } else if (ACRONYMS.includes(string.toUpperCase())) {
    return string.toUpperCase();
  } else {
    return w[0].toUpperCase() + w.slice(1).toLowerCase();
  }
}

const itemConstructor = (key, type) => {
  return {
    name: key,
    type,
    label: parseLabel(key)
  }
}

const processJSON = (jsonObj) => {
  const result = [];
  Object.keys(jsonObj).map(item => result.push(itemConstructor(item, parseType(jsonObj[item]))));
  return result;
}
