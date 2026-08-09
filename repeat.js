/**
 * Repeats a string a specified number of times.
 * @param {string} str - The string to repeat.
 * @param {number} count - The number of times to repeat the string.
 * @returns {string} The repeated string.
 */

// ============================================
// Approach 1: Using a Loop (Iterative)
// ============================================
function repeat(str, count) {
  // Handle edge cases like the native method
  if (count < 0) {
    throw new RangeError('Repeat count must be non-negative');
  }
  if (count === Infinity) {
    throw new RangeError('Repeat count must be less than infinity');
  }
  
  // Convert count to integer (native repeat truncates decimals)
  count = Math.floor(count);
  
  let result = '';
  for (let i = 0; i < count; i++) {
    result += str;
  }
  return result;
}

// ============================================
// Approach 2: Using Recursion
// ============================================
function repeatRecursive(str, count) {
  // Handle edge cases
  if (count < 0) {
    throw new RangeError('Repeat count must be non-negative');
  }
  if (count === Infinity) {
    throw new RangeError('Repeat count must be less than infinity');
  }
  
  count = Math.floor(count);
  
  // Base cases
  if (count === 0) return '';
  if (count === 1) return str;
  
  // Recursive step: build result by combining smaller repeats
  return str + repeatRecursive(str, count - 1);
}

// ============================================
// Approach 3: Optimized Recursion (Binary Exponentiation style)
// ============================================
function repeatOptimized(str, count) {
  if (count < 0) {
    throw new RangeError('Repeat count must be non-negative');
  }
  if (count === Infinity) {
    throw new RangeError('Repeat count must be less than infinity');
  }
  
  count = Math.floor(count);
  
  if (count === 0) return '';
  if (count === 1) return str;
  
  // If count is even: repeat(str, n) = repeat(str, n/2) + repeat(str, n/2)
  // If count is odd:  repeat(str, n) = repeat(str, n-1) + str
  const half = repeatOptimized(str, Math.floor(count / 2));
  if (count % 2 === 0) {
    return half + half;
  } else {
    return half + half + str;
  }
}