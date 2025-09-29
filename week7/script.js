// I need to access the play button

const playButton = document.querySelector("#play-button");
console.log(playButton);

// I should also access the audio so that i can conreol with my buttons
const myAudio = document.querySelector("#my-audio");
console.log(myAudio);

const myVideo = document.querySelector("#my-video");
console.log(myAudio);

const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

pauseButton.addEventListener("click", pauseAudio);

function pauseAudio() {
  myAudio.pause();
}
// my logic for creating a popping sound effecr
// first i need to access the popping sound
const popSound = document.querySelector("#pop-sound");
console.log(popSound);

// I need to acccess the button and listen to clicks on it.
// so whenever someone clicks on that button,
// we hear a popping sounds.
const popButton = document.querySelector("#pop-sound");
console.log(popSound);

popButton.addEventListener("click", popAudio);

function popAudio() {
  popSound.play();
}
