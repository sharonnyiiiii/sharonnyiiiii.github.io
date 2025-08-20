// console.log("hello");
// console.log("how are you?");
// const myName = "rohit";
// console.log("hello", myName);

// // let name = prompt("What is your name?");
// // console.log("hello", name);
// // name = 'alice'
// // console.log("hello", name);
// //this is a comment
// let a = 10;
// const b = 10;
// console.log(a);
// a = 30;
// console.log(a);
// console.log(b);
// // b = 30;
// const myName2 = "Robert";
// console.log("hello", myName);
// console.log("hello", myName2);
//string varaibles = text varaibles alphanumetric
const myName = "Rohit";
const myAge = " 41";
console.log(myName, myAge);
//number variable add subtract multiplt divide
let a = 10;
let b = 1234;
let c = b + a;
console.log(c);
const id = 12345;
const city = "melbourne";
const uni = "RMIT";

//object:collection of related variables or data
const myStudentRecord = {
  name: "Rohit",
  id: 12345,
  city: "melbourne",
};
console.log(myStudentRecord.name);
console.log(myStudentRecord.city);
const myAssignmentRecord = {
  id: 12345,
  as1score: 98,
  as2core: 97,
  as3core: 96,
};
const total =
  myAssignmentRecord.as1Score +
  myAssignmentRecord.as2Score +
  myAssignmentRecord.as3Score;
console.log(total);
//boolean = test condition check True or False
const isItEvening = true;
const isItRaining = false;
//back ticks
const myAddress = `rmit university 124 latrobe st melbourne

melbourne is ${myName}'s address`;
console.log(myAddress);
const myDetails = `hello, I am ${myName}, I work for ${uni}`;
console.log(myDetails);

const student1 = "Alice";
const student2 = "Sarah";
const student3 = "Jaclk";
const student4 = "Mike";
console.log("hello", student1);
console.log("hello", student2);
console.log("hello", student3);
console.log("hello", student4);

let students = ["Alice", "Sarah", "Jack", "Mike", "Emily"];
// console.log("hello", student[0]);
// console.log("hello", student[1]);
// console.log("hello", student[2]);
// console.log("hello", student[3]);
// console.log("hello", student[4]);
console.log("array size", students.length);
for (let i = 0; i < students.length; i++) {
  console.log("value of i", i);
  console.log("hello, students", [i]);
}

// let ids = [12, 13, 14, 15, 16];
// console.log(ids[2]);

// let score = 8;
// if (score > 80) {
//   console.log("hey you got HD");
//   console.log("time for celebration");
// } else if (score <= 80 && score > 70) {
//   console.log("hey you D");
// } else if (score <= 70 && score > 50) {
//   console.log("hey you passed");
// } else if (score < 50) {
//   console.log("sorry you failed");
// }

// let marks = "88";
// let marks2 = 88;
// let compare = marks == marks2;
// console.log(marks === marks2);

let shoppingCart = [
  { name: "T-shirt", price: 20 },
  { name: "Jeans", price: 50 },
  { name: "Sneaker", price: 80 },
  { name: "Backpack", price: 30 },
  { name: "cap", price: 50 },
];
console.log("shopping array size", shoppingCart.length);
let cartTotal = 0;
for (let i = 0; i < shoppingCart.length; i++) {
  cartTotal = cartTotal + shoppingCart[i].price;
  console.log("my purchased item is", shoppingCart[i].name);
  console.log("value of i ", i);
  console.log("total so far ", cartTotal);
}

if (cartTotal > 100) {
  console.log("you got 10% discount");
} else {
  console.log("sorry tou need to make purchase of $200");
}
