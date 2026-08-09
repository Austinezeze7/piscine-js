const circular = {}
circular.circular = circular

// tests
console.log(circular.circular === circular)                         // true
console.log(circular.circular.circular.circular === circular)       // true
console.log(circular)                                               // <ref *1> { circular: [Circular *1] }