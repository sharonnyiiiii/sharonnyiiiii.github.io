const topHeading = document.querySelector("h1");
console.log(topHeading);

const firstPara = document.querySelector("p");
console.log(firstPara);
console.log(firstPara.textContent);

const h2Heading = document.querySelector("h2");
console.log(h2Heading);
console.log(h2Heading.textContent);

const allParas = document.querySelectorAll("p");
console.log(allParas);
// console.log(allParas.textContent);
for (let i = 0; i < allParas.length; i++) {
  console.log("Para", i + 1, ":", allParas[i].textContnet);
}
const allANothers = document.querySelectorAll(".another");
console.log(allAnothers);
