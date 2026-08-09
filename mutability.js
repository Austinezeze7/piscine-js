const clone1 = Object.assign({}, person); 
const clone2 = { ...person }; 
const samePerson = person;

person.age += 1;
person.country = "FR";

                   //TESTS
console.log(person.age === 78); 
console.log(person.country === "FR"); 

console.log(clone1.age === 77); 
console.log(clone1.country === "US"); 

console.log(clone2.age === 77); 
console.log(clone2.country === "US"); 

console.log(samePerson.age === 78); 
console.log(samePerson.country === "FR"); 
