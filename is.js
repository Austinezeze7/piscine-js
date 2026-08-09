// is.js

const is = {};

// is.num: Returns true if the value is of type number (including NaN)
is.num = function(value) {
  return typeof value === 'number';
};

// is.nan: Returns true if the value is NaN
is.nan = function(value) {
  return Number.isNaN(value);
};

// is.str: Returns true if the value is a string
is.str = function(value) {
  return typeof value === 'string';
};

// is.bool: Returns true if the value is a boolean
is.bool = function(value) {
  return typeof value === 'boolean';
};

// is.undef: Returns true if the value is undefined
is.undef = function(value) {
  return value === undefined;
};

// is.def: Returns true if the value is defined (not undefined)
is.def = function(value) {
  return value !== undefined;
};

// is.arr: Returns true if the value is an array
is.arr = function(value) {
  return Array.isArray(value);
};

// is.obj: Returns true if the value is a simple object or null (but not an array or function)
is.obj = function(value) {
  return typeof value === 'object' && !Array.isArray(value);
};

// is.fun: Returns true if the value is a function
is.fun = function(value) {
  return typeof value === 'function';
};

// is.truthy: Returns true if the value is truthy
is.truthy = function(value) {
  return !!value;
};

// is.falsy: Returns true if the value is falsy
is.falsy = function(value) {
  return !value;
};