const MATCH_TYPES = {
  null: (object) => object === null,
  array: (object) => Array.isArray(object),
  boolean: (object) => object.constructor.name === 'Boolean',
  string: (object) => object.constructor.name === 'String',
  number: (object) => !isNaN(+object),
  collection: (object) => object.constructor.name === 'Object',
}

const MATCH_STRING = {
  color: (string) => !!string.match(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g),
  date: (string) => /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(string)
    && (new Date(string)).toISOString() === string,
  email: (string) => !!string.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi)
}

module.exports = {
  MATCH_TYPES,
  MATCH_STRING
}
