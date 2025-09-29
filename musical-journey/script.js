// Simple Vinyl Player Implementation with Unwrap Effect
const cover1 = document.querySelector("#cover-1");
const vinyl1 = document.querySelector("#vinyl-1");
const song1 = document.querySelector("#song-1");
const wrapper1 = document.querySelector("#wrapper-1");

const cover2 = document.querySelector("#cover-2");
const vinyl2 = document.querySelector("#vinyl-2");
const song2 = document.querySelector("#song-2");
const wrapper2 = document.querySelector("#wrapper-2");

const cover3 = document.querySelector("#cover-3");
const vinyl3 = document.querySelector("#vinyl-3");
const song3 = document.querySelector("#song-3");
const wrapper3 = document.querySelector("#wrapper-3");

const cover4 = document.querySelector("#cover-4");
const vinyl4 = document.querySelector("#vinyl-4");
const song4 = document.querySelector("#song-4");
const wrapper4 = document.querySelector("#wrapper-4");

const cover5 = document.querySelector("#cover-5");
const vinyl5 = document.querySelector("#vinyl-5");
const song5 = document.querySelector("#song-5");
const wrapper5 = document.querySelector("#wrapper-5");

const cover6 = document.querySelector("#cover-6");
const vinyl6 = document.querySelector("#vinyl-6");
const song6 = document.querySelector("#song-6");
const wrapper6 = document.querySelector("#wrapper-6");

// Vinyl 1
cover1.addEventListener("mouseenter", () => openRecord(vinyl1));
cover1.addEventListener("mouseleave", () => closeRecord(vinyl1));
cover1.addEventListener("click", () => playRecord(vinyl1, song1, wrapper1));

// Vinyl 2
cover2.addEventListener("mouseenter", () => openRecord(vinyl2));
cover2.addEventListener("mouseleave", () => closeRecord(vinyl2));
cover2.addEventListener("click", () => playRecord(vinyl2, song2, wrapper2));

// Vinyl 3
cover3.addEventListener("mouseenter", () => openRecord(vinyl3));
cover3.addEventListener("mouseleave", () => closeRecord(vinyl3));
cover3.addEventListener("click", () => playRecord(vinyl3, song3, wrapper3));

// Vinyl 4
cover4.addEventListener("mouseenter", () => openRecord(vinyl4));
cover4.addEventListener("mouseleave", () => closeRecord(vinyl4));
cover4.addEventListener("click", () => playRecord(vinyl4, song4, wrapper4));

// Vinyl 5
cover5.addEventListener("mouseenter", () => openRecord(vinyl5));
cover5.addEventListener("mouseleave", () => closeRecord(vinyl5));
cover5.addEventListener("click", () => playRecord(vinyl5, song5, wrapper5));

// Vinyl 6
cover6.addEventListener("mouseenter", () => openRecord(vinyl6));
cover6.addEventListener("mouseleave", () => closeRecord(vinyl6));
cover6.addEventListener("click", () => playRecord(vinyl6, song6, wrapper6));

function openRecord(vinyl) {
  vinyl.classList.add("openrecord");
}

function closeRecord(vinyl) {
  vinyl.classList.remove("openrecord");
}

function playRecord(vinyl, song, wrapper) {
  vinyl.classList.toggle("playrecord");

  // Trigger unwrap effect when starting to play
  if (song.paused || song.ended) {
    wrapper.classList.remove("fade-in");
    wrapper.classList.add("unwrap");
    song.play();
  } else {
    // Trigger fade-in effect when pausing
    wrapper.classList.remove("unwrap");
    wrapper.classList.add("fade-in");
    song.pause();
  }
}

// Scroll to top functionality
const scrollTopBtn = document.querySelector(".scroll-top");
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Parallax hero scroll interaction
const bg = document.getElementById("bg");
const moon = document.getElementById("moon");
const mountain = document.getElementById("mountain");
const road = document.getElementById("road");
const text = document.getElementById("text");

window.addEventListener("scroll", () => {
  const value = window.scrollY;

  if (bg) bg.style.top = value * 0.5 + "px";
  if (moon) moon.style.left = -value * 0.5 + "px";
  if (mountain) mountain.style.top = -value * 0.15 + "px";
  if (road) road.style.top = value * 0.15 + "px";
  // Parallax for centered hero title: nudge vertically while staying centered
  if (text) {
    const offset = value * 0.35; // tune intensity
    text.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;
  }
});
