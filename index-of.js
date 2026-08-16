/**
 * Returns the first index at which a given element appears.
 * @param {Array} array - The array to search.
 * @param {*} searchElement - The element to locate.
 * @param {number} [fromIndex=0] - The index to start searching from.
 * @returns {number} The first matching index, or -1 if not found.
 */
function indexOf(array, searchElement, fromIndex) {
  const len = array.length;
  if (len === 0) return -1;

  // Default start position is 0
  let start = fromIndex === undefined ? 0 : Math.floor(fromIndex);

  // If start is beyond the array, nothing to find
  if (start >= len) return -1;

  // If negative, count back from the end; if still negative, clamp to 0
  if (start < 0) {
    start = len + start;
    if (start < 0) start = 0;
  }

  // Search forward
  for (let i = start; i < len; i++) {
    // Skip holes in sparse arrays (matches native behavior)
    if (i in array && array[i] === searchElement) {
      return i;
    }
  }

  return -1;
}

/**
 * Returns the last index at which a given element appears.
 * @param {Array} array - The array to search.
 * @param {*} searchElement - The element to locate.
 * @param {number} [fromIndex=array.length-1] - The index to start searching backward from.
 * @returns {number} The last matching index, or -1 if not found.
 */
function lastIndexOf(array, searchElement, fromIndex) {
  const len = array.length;
  if (len === 0) return -1;

  // Default start position is the last index
  let start = fromIndex === undefined ? len - 1 : Math.floor(fromIndex);

  // If negative, count back from the end
  if (start < 0) {
    start = len + start;
  }

  // If still negative, nothing to search
  if (start < 0) return -1;

  // If beyond array length, clamp to last index
  if (start >= len) {
    start = len - 1;
  }

  // Search backward
  for (let i = start; i >= 0; i--) {
    if (i in array && array[i] === searchElement) {
      return i;
    }
  }

  return -1;
}

/**
 * Determines whether an array includes a certain value.
 * @param {Array} array - The array to search.
 * @param {*} searchElement - The element to locate.
 * @param {number} [fromIndex=0] - The index to start searching from.
 * @returns {boolean} true if found, false otherwise.
 */
function includes(array, searchElement, fromIndex) {
  const len = array.length;
  if (len === 0) return false;

  // Default start position is 0
  let start = fromIndex === undefined ? 0 : Math.floor(fromIndex);

  // If start is beyond the array, nothing to find
  if (start >= len) return false;

  // If negative, count back from the end; if still negative, clamp to 0
  if (start < 0) {
    start = len + start;
    if (start < 0) start = 0;
  }

  // Search forward using SameValueZero comparison
  for (let i = start; i < len; i++) {
    if (i in array) {
      const current = array[i];

      // SameValueZero: NaN equals NaN, and +0 equals -0
      if (current === searchElement || (current !== current && searchElement !== searchElement)) {
        return true;
      }
    }
  }

  return false;
}