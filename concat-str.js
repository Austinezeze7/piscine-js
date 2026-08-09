function concatStr(input1, input2) {
    return String(input1)+String(input2)
}

// Test with two strings
console.log(concatStr("Hello", "World")); // Should output 'HelloWorld'

// Test with a string and a number
console.log(concatStr("The answer is ", 42)); // Should output 'The answer is 42'

// Test with two numbers
console.log(concatStr(123, 456)); // Should output '123456'

// Test with boolean and string
console.log(concatStr(true, " statement")); // Should output 'true statement'