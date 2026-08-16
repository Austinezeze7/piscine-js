// chunky.js

function chunk(arr, size) {
  // If size is less than or equal to 0, return empty array
  if (size <= 0) {
    return [];
  }
  
  const result = [];
  
  // Loop through the array, creating chunks of the specified size
  for (let i = 0; i < arr.length; i += size) {
    const chunk = [];
    // Build each chunk
    for (let j = i; j < i + size && j < arr.length; j++) {
      chunk.push(arr[j]);
    }
    result.push(chunk);
  }
  
  return result;
}

// Test cases
console.log(chunk(["a", "b", "c", "d"], 2)); 
// Output: [ [ 'a', 'b' ], [ 'c', 'd' ] ]

console.log(chunk(["a", "b", "c", "d", "e"], 2)); 
// Output: [ [ 'a', 'b' ], [ 'c', 'd' ], [ 'e' ] ]

console.log(chunk(["a", "b", "c", "d"], 3)); 
// Output: [ [ 'a', 'b', 'c' ], [ 'd' ] ]

console.log(chunk(["a", "b", "c", "d", "e", "f"], 2)); 
// Output: [ [ 'a', 'b' ], [ 'c', 'd' ], [ 'e', 'f' ] ]

console.log(chunk(["a", "b", "c"], 1)); 
// Output: [ [ 'a' ], [ 'b' ], [ 'c' ] ]

console.log(chunk([], 2)); 
// Output: []

console.log(chunk(["a", "b", "c", "d"], 5)); 
// Output: [ [ 'a', 'b', 'c', 'd' ] ]