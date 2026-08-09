function max(a, b) {
    if (a > b) {
        return a
    }
    return b
}

function min(a, b) {
    if (a < b) {
        return a
    }
    return b
}

// Test max
console.log(max(5, 9))    // 9
console.log(max(9, 5))    // 9
console.log(max(5, 5))    // 5
console.log(max(-5, -9))  // -5

// Test min
console.log(min(5, 9))    // 5
console.log(min(9, 5))    // 5
console.log(min(5, 5))    // 5
console.log(min(-5, -9))  // -9