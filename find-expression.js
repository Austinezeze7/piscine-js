const add4 = "+4";
const mul2 = "*2";

function findExpression(target) {
  // Edge case: target must be at least 1
  if (target < 1) {
    return undefined;
  }
  
  // Base case: if we've reached the target
  function search(current, expression) {
    if (current === target) {
      return expression;
    }
    
    // If we've exceeded the target, this path is invalid
    if (current > target) {
      return undefined;
    }
    
    // Try multiplying by 2 first (greedy approach, but we need to explore both)
    // Actually, we need to try both paths and see which one works
    
    // Try *2 path
    const mulResult = search(current * 2, expression + " " + mul2);
    if (mulResult !== undefined) {
      return mulResult;
    }
    
    // Try +4 path
    const addResult = search(current + 4, expression + " " + add4);
    if (addResult !== undefined) {
      return addResult;
    }
    
    return undefined;
  }
  
  // Start the search from 1
  const result = search(1, "1");
  return result;
}