function flat(arr, depth = 1) {
  // Handle edge cases
  if (!Array.isArray(arr) || depth === 0) {
    return arr;
  }
  
  let result = [];
  
  for (const element of arr) {
    if (Array.isArray(element) && depth > 0) {
      // If element is an array and we still have depth remaining,
      // recursively flatten it with depth-1
      const flattened = flat(element, depth - 1);
      // Merge the flattened result into our result array
      result.push(...flattened);
    } else {
      // If element is not an array or depth is 0, push it directly
      result.push(element);
    }
  }
  
  return result;
}