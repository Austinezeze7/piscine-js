function isPositive(num){
    return num > 0
}

// function fn6(num) {
//     if (num > 0) {
//         return true
//     } else {
//         return false
//     }
// }
function abs(num){
    if (num < 0){
        return -num
    }
    return num
}

// Test isPositive function
console.log(isPositive(3)); // true
console.log(isPositive(0)); // false
console.log(isPositive(-3)); // false

// Test abs function
console.log(abs(0)); // Should output 0
console.log(abs(5)); // Should output 5
console.log(abs(-5)); // Should output 5
console.log(abs(-10)); // Should output 10