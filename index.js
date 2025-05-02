import HashMap from "./hashMap.js";
const test = new HashMap() // or HashMap() if using a factory
console.log(test.hash("dog"));
console.log(test.hash("lion"));
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('gorilla', 'black')
console.log(test.buckets);
console.log(test.capacity);