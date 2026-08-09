function arrToSet(v){
    if (Array.isArray(v)){
        return new Set(v)
    }
}
function arrToStr(v){
    if (Array.isArray(v)){
        return v.join('')
    }   
}
function setToArr(v){
    if (v instanceof Set){
        return Array.from(v)
        
    }   
}
function setToStr(v){
    if (v instanceof Set){
        return [...v].join('')
    }
}
function strToArr(v){
    if (typeof v === "string"){
        return Array.from(v)
    }
}
function strToSet(v){
    if(typeof v === "string"){
        return new Set(v)
    }
}
function mapToObj(v){
    if(v instanceof Map){
        return Object.fromEntries(v)
    }

}

function objToArr(v){
    if (typeof v === "object"){
        return Object.values(v)
    }
}

function objToMap(v){
    if(typeof v === "object"){
        return new Map(Object.entries(v))

   }
}
function arrToObj(v){
    if (Array.isArray(v)){
        return { ...v }
    }
}
function strToObj(v){
    if (typeof v === "string"){
        return { ...v}

    }
}
function superTypeOf(v) {
    // Handle the lowercase primitives first
    if (v === null) return "null";
    if (v === undefined) return "undefined";

    if (typeof v === "object") {
        if (v instanceof Map) return "Map";
        if (v instanceof Set) return "Set";
        if (Array.isArray(v)) return "Array";
        return "Object";
    }

    // Capitalize primitives (string -> String, number -> Number, function -> Function)
    const type = typeof v;
    return type.charAt(0).toUpperCase() + type.slice(1);
}




// Create test data
const str = "hello";
const arr = [1, 2, 1, 3];
const obj = { x: 45, y: 75, radius: 24 };
const set = new Set();
set.add(1);
set.add(2);
set.add(1); // Duplicate will be ignored
set.add(3);
const map = new Map();
map.set("a", 1);
map.set("b", 2);
map.set(3, "c");
map.set(4, "d");

// Test each function
console.log("arrToSet:", arrToSet(arr));
console.log("arrToStr:", arrToStr(arr));
console.log("setToArr:", setToArr(set));
console.log("setToStr:", setToStr(set));
console.log("strToArr:", strToArr(str));
console.log("strToSet:", strToSet(str));
console.log("mapToObj:", mapToObj(map));
console.log("objToArr:", objToArr(obj));
console.log("objToMap:", objToMap(obj));
console.log("arrToObj:", arrToObj(arr));
console.log("strToObj:", strToObj(str));

// Test superTypeOf with different types
console.log("superTypeOf(map):", superTypeOf(map));
console.log("superTypeOf(set):", superTypeOf(set));
console.log("superTypeOf(obj):", superTypeOf(obj));
console.log("superTypeOf(str):", superTypeOf(str));
console.log("superTypeOf(666):", superTypeOf(666));
console.log("superTypeOf(NaN):", superTypeOf(NaN));
console.log("superTypeOf(arr):", superTypeOf(arr));
console.log("superTypeOf(null):", superTypeOf(null));
console.log("superTypeOf(undefined):", superTypeOf(undefined));
console.log("superTypeOf(superTypeOf):", superTypeOf(superTypeOf));