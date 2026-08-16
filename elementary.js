/**
 * Multiplies two integers without using the * operator.
 * Uses the "Russian peasant multiplication" method (repeated doubling & halving).
 */
function multiply(a, b) {
  // Edge case: anything times zero is zero
  if (a === 0 || b === 0) return 0;

  // Determine if the result should be negative
  const isNegative = (a < 0) !== (b < 0);
  
  // Work with absolute values
  let multiplicand = a < 0 ? -a : a;
  let multiplier   = b < 0 ? -b : b;
  let result = 0;

  while (multiplier > 0) {
    // If multiplier is odd, add current multiplicand to result
    if (multiplier & 1) {
      result += multiplicand;
    }
    // Double the multiplicand and halve the multiplier
    multiplicand += multiplicand;
    multiplier >>= 1;
  }

  return isNegative ? -result : result;
}

/**
 * Divides two integers without using the / operator.
 * Performs integer division (truncates toward zero), matching JavaScript's / on integers.
 */
function divide(a, b) {
  // Division by zero behavior (matches JavaScript)
  if (b === 0) {
    if (a === 0) return NaN;
    return (a < 0) ? -Infinity : Infinity;
  }
  if (a === 0) return 0;

  const isNegative = (a < 0) !== (b < 0);
  
  let dividend = a < 0 ? -a : a;
  let divisor  = b < 0 ? -b : b;
  let result = 0;

  while (dividend >= divisor) {
    // Find the largest multiple of divisor that fits into remaining dividend
    let tempDivisor = divisor;
    let multiple = 1;

    while (dividend >= (tempDivisor + tempDivisor)) {
      tempDivisor += tempDivisor;  // Double it
      multiple    += multiple;     // Double the count
    }

    dividend -= tempDivisor;
    result   += multiple;
  }

  return isNegative ? -result : result;
}

/**
 * Computes the remainder of division without using the % operator.
 * Result carries the sign of the dividend (a), matching JavaScript's %.
 */
function modulo(a, b) {
  if (b === 0) return NaN;
  if (a === 0) return 0;

  const divisor = b < 0 ? -b : b;
  let remainder = a < 0 ? -a : a;

  while (remainder >= divisor) {
    let tempDivisor = divisor;
    
    while (remainder >= (tempDivisor + tempDivisor)) {
      tempDivisor += tempDivisor;
    }
    
    remainder -= tempDivisor;
  }

  // Restore the sign of the dividend
  return (a < 0) ? -remainder : remainder;
}