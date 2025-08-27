let a = 10;
let b = 40;

// declaring or defining a function
function add(a, b) {
  let c = a + b;
  console.log("value of c", c);
}
// calling of a function
let sum = add(a, b);
console.log("value of sum", sum);
let sum2 = add(45, 67);
let d = 56;
let e = 8788;
let sum3 = add(d, e);
console.log("value of sum", sum3);
let balance = substract(100, 35);
console.log("value of balance", balance);

// function to change upper case to lower case

function greet(name) {
  let newName = name.toUpperCase();
  let msg ="";
  msg =  "Hello" + newName;
}else{
  msg = "Sorry I do not know you!"
}
console.log(msg);
  return msg;

let name = "Sharon";
greet(name);

greet ("Sarah");

