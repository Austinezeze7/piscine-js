function get(src, path) {
  // Split the path into segments using dot notation
  const segments = path.split('.');
  
  // Start from the source object
  let result = src;
  
  // Traverse through each segment
  for (const segment of segments) {
    // If current result is null/undefined or doesn't have the property, return undefined
    if (result === null || result === undefined || !(segment in result)) {
      return undefined;
    }
    // Move to the next level
    result = result[segment];
  }
  
  return result;
}