function sign(num) {
    if (num > 0) return 1
    if (num < 0) return -1
    return 0
}

function sameSign(a, b) {
    return sign(a) === sign(b)
}

// Test sign
console.log(sign(3))   // 1
console.log(sign(-3))  // -1
console.log(sign(0))   // 0

// Test sameSign
console.log(sameSign(3, 4))    // true
console.log(sameSign(-3, -4))  // true
console.log(sameSign(0, 0))    // true
console.log(sameSign(3, -4))   // false
console.log(sameSign(0, 4))    // false
console.log(sameSign(0, -4))   // false