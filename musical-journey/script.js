// Simple Vinyl Player Implementation with Unwrap Effect
// Lid interaction for covers (learned with ChatGPT guidance):
// toggles a 3D overlay lid on each cover when clicked.
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
cover1.addEventListener("click", () => {
  toggleLid(cover1);
  playRecord(vinyl1, song1, wrapper1);
});

// Vinyl 2
cover2.addEventListener("mouseenter", () => openRecord(vinyl2));
cover2.addEventListener("mouseleave", () => closeRecord(vinyl2));
cover2.addEventListener("click", () => {
  toggleLid(cover2);
  playRecord(vinyl2, song2, wrapper2);
});

// Vinyl 3
cover3.addEventListener("mouseenter", () => openRecord(vinyl3));
cover3.addEventListener("mouseleave", () => closeRecord(vinyl3));
cover3.addEventListener("click", () => {
  toggleLid(cover3);
  playRecord(vinyl3, song3, wrapper3);
});

// Vinyl 4
cover4.addEventListener("mouseenter", () => openRecord(vinyl4));
cover4.addEventListener("mouseleave", () => closeRecord(vinyl4));
cover4.addEventListener("click", () => {
  toggleLid(cover4);
  playRecord(vinyl4, song4, wrapper4);
});

// Vinyl 5
cover5.addEventListener("mouseenter", () => openRecord(vinyl5));
cover5.addEventListener("mouseleave", () => closeRecord(vinyl5));
cover5.addEventListener("click", () => {
  toggleLid(cover5);
  playRecord(vinyl5, song5, wrapper5);
});

// Vinyl 6
cover6.addEventListener("mouseenter", () => openRecord(vinyl6));
cover6.addEventListener("mouseleave", () => closeRecord(vinyl6));
cover6.addEventListener("click", () => {
  toggleLid(cover6);
  playRecord(vinyl6, song6, wrapper6);
});

function openRecord(vinyl) {
  vinyl.classList.add("openrecord");
}

function closeRecord(vinyl) {
  vinyl.classList.remove("openrecord");
}

function playRecord(vinyl, song, wrapper) {
  vinyl.classList.toggle("playrecord");

  // Play/pause audio without wrapper effects
  if (song.paused || song.ended) {
    song.volume = 1.0; // Set volume to 100%
    song.play();
  } else {
    song.pause();
  }
}

function toggleLid(coverEl) {
  coverEl.classList.toggle("lid-open");
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

// Initialize all audio elements with increased volume
document.addEventListener("DOMContentLoaded", () => {
  // Set volume for all song elements
  for (let i = 1; i <= 6; i++) {
    const songElement = document.querySelector(`#song-${i}`);
    if (songElement) {
      songElement.volume = 1.0;
    }
  }

  // Set volume for all audio elements
  for (let i = 1; i <= 6; i++) {
    const audioElement = document.querySelector(`#audio${i}`);
    if (audioElement) {
      audioElement.volume = 1.0;
    }
  }

  // Inject play/pause overlays above each vinyl cover and sync with audio state
  const items = [
    { outer: document.querySelector("#cover-1")?.parentElement, audio: song1 },
    { outer: document.querySelector("#cover-2")?.parentElement, audio: song2 },
    { outer: document.querySelector("#cover-3")?.parentElement, audio: song3 },
    { outer: document.querySelector("#cover-4")?.parentElement, audio: song4 },
    { outer: document.querySelector("#cover-5")?.parentElement, audio: song5 },
    { outer: document.querySelector("#cover-6")?.parentElement, audio: song6 },
  ];

  items.forEach((item, idx) => {
    if (!item.outer || !item.audio) return;
    const overlay = document.createElement("img");
    overlay.className = "play-pause-overlay";
    overlay.alt = "Play/Pause";
    overlay.src = "play.png";
    // ensure overlay is clickable without affecting other UI
    overlay.addEventListener("click", (e) => {
      e.stopPropagation();
      // Simulate clicking the cover to reuse existing logic
      const coverEl = document.querySelector(`#cover-${idx + 1}`);
      if (coverEl) coverEl.click();
    });
    item.outer.appendChild(overlay);

    const updateIcon = () => {
      overlay.src = item.audio.paused ? "play.png" : "pause.png";
    };

    // Initial icon state
    updateIcon();

    // Sync on audio events
    item.audio.addEventListener("play", updateIcon);
    item.audio.addEventListener("pause", updateIcon);
    item.audio.addEventListener("ended", () => {
      item.audio.currentTime = 0;
      updateIcon();
    });
  });

  // Trigger text animations for song details
  const triggerTextAnimations = () => {
    const songInfos = document.querySelectorAll(".song-info");
    songInfos.forEach((songInfo, index) => {
      // Reset animations
      const h3 = songInfo.querySelector("h3");
      const paragraphs = songInfo.querySelectorAll("p");
      const releaseInfo = songInfo.querySelector(".release-info");

      if (h3) {
        h3.style.animation = "none";
        h3.offsetHeight; // Trigger reflow
        h3.style.animation = `fadeInUp 0.8s ease-out ${
          0.2 + index * 0.3
        }s forwards`;
      }

      paragraphs.forEach((p, pIndex) => {
        if (p !== releaseInfo) {
          p.style.animation = "none";
          p.offsetHeight; // Trigger reflow
          p.style.animation = `fadeInUp 0.8s ease-out ${
            0.4 + index * 0.3 + pIndex * 0.2
          }s forwards`;
        }
      });

      if (releaseInfo) {
        releaseInfo.style.animation = "none";
        releaseInfo.offsetHeight; // Trigger reflow
        releaseInfo.style.animation = `fadeInUp 0.8s ease-out ${
          0.6 + index * 0.3
        }s forwards`;
      }
    });
  };

  // Trigger animations after a short delay to ensure page is loaded
  // setTimeout(triggerTextAnimations, 500);

  // IntersectionObserver to trigger text animations only when section is in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const item = entry.target;
        if (entry.isIntersecting) {
          item.classList.add("in-view");
        } else {
          item.classList.remove("in-view");
        }
      });
    },
    {
      root: null,
      threshold: 0.25,
    }
  );

  document
    .querySelectorAll(".album-item")
    .forEach((el) => observer.observe(el));
});
