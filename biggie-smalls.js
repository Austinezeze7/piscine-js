// const smalls = -Number.MAX_VALUE  // smallest (most negative) number
// const biggie = Number.MAX_VALUE   // largest number

//value beyond MAX_VALUE and below -MAX_VALUE(Wwhich is real min_value)
const smalls = -Infinity
const biggie = Infinity

// tests
console.log(smalls < -1e308)   // true
console.log(isFinite(smalls))  // false
console.log(biggie > 1e308)    // true
console.log(isFinite(biggie))  // false