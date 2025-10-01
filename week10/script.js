const hoverclickButton = document.querySelector("#hoverclick-button");
console.log(hoverclickButton);

hoverclickButton.addEventListener("click", gotoFlip);

function gotoFlip() {
  window.location.href = "flip.html";
}

const dragdropButton = document.querySelector("#dragdrop-button");
console.log(dragdropButton);

dragdropButton.addEventListener("click", gotoFlip);

function gotoFlip() {
  window.location.href = "dragdrop.html";
}
