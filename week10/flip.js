const card = document.querySelector(".card");
console.log(card);

card.addEventListener("click", toggleFlip);

function toggleFLip() {
  card.classList.toggle("flip");
}
