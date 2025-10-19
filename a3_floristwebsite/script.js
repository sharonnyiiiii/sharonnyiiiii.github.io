// all my colors are in inner boxes so I am first accessing them
const boxes = document.querySelectorAll(".inner");
const orangeFlowers = document.querySelectorAll(".orange");
let bgColor = null;

//  ===== FLORIST.MP3 =====
//
// This is my favourite song from a musician called Youzee, and I wanted the experience to be
// when the person starts to drag the color from the palette, they become their own artist.
// They can design their bouquet by their own, but also they are the artist for their life.
//
// The florist.mp3 audio represents the soundtrack of artistic creation and self-expression.
// As users begin to drag colors from the palette, they are not just painting flowers -
// they are painting their own life story, making choices that reflect their personal taste,
// creativity, and vision. Each color selection becomes a brushstroke in their life's canvas.
//
// The music provides the perfect backdrop for this moment of creative awakening,
// where users transition from passive observers to active artists of their own experience.
// The audio plays at the exact moment of drag initiation, symbolizing the beginning of
// their artistic journey - both in designing their bouquet and in crafting their life.
//
// This creates a deeper, more meaningful interaction that goes beyond simple drag-and-drop
// functionality, transforming the act of color selection into a moment of personal artistry
// and life design, accompanied by the inspiring soundtrack that celebrates their creative power.

//  audio element for florist sound
const floristSound = new Audio("florist.mp3");
floristSound.volume = 0.5; // Set volume to 50% for pleasant experience

// Capture dragged color for painting
boxes.forEach((colorBlock) => {
  colorBlock.addEventListener("dragstart", (event) => {
    bgColor = window.getComputedStyle(event.target).backgroundColor;
    console.log("Dragging color:", bgColor); // Debug log

    // Add brush cursor class to body during drag
    document.body.classList.add("brush-cursor");
    colorBlock.classList.add("dragging");

    // Play florist.mp3 when drag interaction starts - the soundtrack of artistic creation
    floristSound.play().catch((error) => {
      console.log("Florist sound play failed:", error);
      // Some browsers require user interaction before playing audio
    });
  });

  colorBlock.addEventListener("dragend", (event) => {
    // Remove brush cursor class when drag ends
    document.body.classList.remove("brush-cursor");
    colorBlock.classList.remove("dragging");
  });
});

orangeFlowers.forEach((flower) => {
  flower.addEventListener("dragover", (event) => {
    event.preventDefault();
    flower.classList.add("drag-over");
  });

  flower.addEventListener("dragleave", (event) => {
    flower.classList.remove("drag-over");
  });

  flower.addEventListener("drop", (event) => {
    event.preventDefault();
    //   // Set the background color of the body to the dropped color
    //   //   target.style.backgroundColor = bgColor;
    flower.style.fill = bgColor;

    // Remove highlight and restore normal cursor when color is dropped
    flower.classList.remove("drag-over");
    document.body.classList.remove("brush-cursor");
  });
});

//  DRAG AND DROP FOR E04819 PATHS
//
// Add drag and drop functionality for the two paths with fill #e04819
// This allows users to drag color boxes onto these specific paths to change their color
//
// VISUAL HIGHLIGHTING FOR DROP ZONES
//
// In order to make the drag and drop interaction more obvious and visible, I add a visual highlighting drop zone
// that activates when dragging over SVG paths. This provides immediate visual feedback to users, making it clear
// which areas can accept dropped colors and enhancing the overall user experience with clear visual cues.

const e04819Paths = document.querySelectorAll("#path-e04819-1, #path-e04819-2");

e04819Paths.forEach((path) => {
  path.addEventListener("dragover", (event) => {
    event.preventDefault();
    path.classList.add("drag-over");
  });

  path.addEventListener("dragleave", (event) => {
    path.classList.remove("drag-over");
  });

  path.addEventListener("drop", (event) => {
    event.preventDefault();
    // Set the fill color of the path to the dropped color
    path.style.fill = bgColor;
    console.log("Dropped color onto e04819 path:", bgColor); // Debug log

    // Remove highlight and restore normal cursor when color is dropped
    path.classList.remove("drag-over");
    document.body.classList.remove("brush-cursor");
  });
});

// DRAG AND DROP FOR F16691 PATHS
//
// Add drag and drop functionality for the two paths with fill #f16691
// This allows users to drag color boxes onto these specific paths to change their color

const f16691Paths = document.querySelectorAll("#path-f16691-1, #path-f16691-2");

f16691Paths.forEach((path) => {
  path.addEventListener("dragover", (event) => {
    event.preventDefault();
    path.classList.add("drag-over");
  });

  path.addEventListener("dragleave", (event) => {
    path.classList.remove("drag-over");
  });

  path.addEventListener("drop", (event) => {
    event.preventDefault();
    // Set the fill color of the path to the dropped color
    path.style.fill = bgColor;
    console.log("Dropped color onto f16691 path:", bgColor); // Debug log

    // Remove highlight and restore normal cursor when color is dropped
    path.classList.remove("drag-over");
    document.body.classList.remove("brush-cursor");
  });
});

// Add drag and drop functionality for the seven paths with fill #f7df52
// This allows users to drag color boxes onto these specific paths to change their color

const f7df52Paths = document.querySelectorAll(
  "#path-f7df52-1, #path-f7df52-2, #path-f7df52-3, #path-f7df52-4, #path-f7df52-5, #path-f7df52-6, #path-f7df52-7"
);

f7df52Paths.forEach((path) => {
  path.addEventListener("dragover", (event) => {
    event.preventDefault();
    path.classList.add("drag-over");
  });

  path.addEventListener("dragleave", (event) => {
    path.classList.remove("drag-over");
  });

  path.addEventListener("drop", (event) => {
    event.preventDefault();
    // Set the fill color of the path to the dropped color
    path.style.fill = bgColor;
    console.log("Dropped color onto f7df52 path:", bgColor); // Debug log

    // Remove highlight and restore normal cursor when color is dropped
    path.classList.remove("drag-over");
    document.body.classList.remove("brush-cursor");
  });
});

//
// Add drag and drop functionality for the path with fill #f79c53
// This allows users to drag color boxes onto this specific path to change its color

const f79c53Paths = document.querySelectorAll("#path-f79c53-1");

f79c53Paths.forEach((path) => {
  path.addEventListener("dragover", (event) => {
    event.preventDefault();
    path.classList.add("drag-over");
  });

  path.addEventListener("dragleave", (event) => {
    path.classList.remove("drag-over");
  });

  path.addEventListener("drop", (event) => {
    event.preventDefault();
    // Set the fill color of the path to the dropped color
    path.style.fill = bgColor;
    console.log("Dropped color onto f79c53 path:", bgColor); // Debug log

    // Remove highlight and restore normal cursor when color is dropped
    path.classList.remove("drag-over");
    document.body.classList.remove("brush-cursor");
  });
});

const ffa58bPaths = document.querySelectorAll(
  "#path-ffa58b-1, #path-ffa58b-2, #path-ffa58b-3"
);

ffa58bPaths.forEach((path) => {
  path.addEventListener("dragover", (event) => {
    event.preventDefault();
    path.classList.add("drag-over");
  });

  path.addEventListener("dragleave", (event) => {
    path.classList.remove("drag-over");
  });

  path.addEventListener("drop", (event) => {
    event.preventDefault();
    // Set the fill color of the path to the dropped color
    path.style.fill = bgColor;
    console.log("Dropped color onto ffa58b path:", bgColor); // Debug log

    // Remove highlight and restore normal cursor when color is dropped
    path.classList.remove("drag-over");
    document.body.classList.remove("brush-cursor");
  });
});

//
// This interaction represents the symbolic "opening" of my flower shop. As the user scrolls, the door gradually opens to reveal a bouquet image behind it. The rotation is directly controlled by scroll progress where more scroll equals more rotation, creating a direct connection between user action and door opening.

// During my experimentation process, I first tried a simple scroll listener but the doors rotated too fast with no smooth progression and there was no relationship between scroll distance and rotation. Then I attempted fixed rotation steps but the animation was jerky and doors jumped between positions with no smooth interpolation between rotation states.

// The breakthrough came when I used window.innerHeight as scroll distance reference, which made the doors open over exactly one viewport height. I then implemented progress-based rotation using Math.min(scrollY / windowHeight, 1) for 0-1 progress, which resulted in smooth and proportional rotation based on scroll.

// I also added a parallax experiment using translateY() with parallax factor, and implemented a smart stopping mechanism that stops parallax when rotation reaches 90 degrees, preventing over-scrolling while maintaining final positions.

// The final technique combination includes scroll event listener, window height calculation, Math.min() for progress calculation, CSS transform rotateY() and translateY(), and conditional logic for smart stopping, all using W3Schools techniques.

const door1 = document.getElementById("doorImage1");
const door2 = document.getElementById("doorImage2");
const background = document.getElementById("background");

// ===== BELL SOUND FUNCTIONALITY - COMPLETE FLOWER SHOP EXPERIENCE =====
//
// The bell.wav sound represents the traditional shop door bell that rings when customers enter AND leave a flower shop.
// This creates a synchronized audio-visual experience where the bell sound accompanies both door opening and closing animations,
// mimicking the complete real-world interaction of walking into and out of a physical flower shop.

// Create audio element for bell sound
const bellSound = new Audio("bell.wav");
bellSound.volume = 0.7; // Set volume to 70% for pleasant experience

// Track bell states for door opening and closing
let bellHasPlayedForOpening = false;
let bellHasPlayedForClosing = false;
let wasAtTop = true; // Track if we were at the top previously

//
// The scroll motion now creates a real-time following effect where doors and background move with the scroll position while simultaneously rotating to reveal the background. This creates the illusion that the user's scroll action is physically moving the door elements while triggering the door opening animation. The doors and background follow the scroll in real-time until they reach 90 degrees, then normal scrolling continues to the next section.

// During my scroll calculation experiments, I first tried scrollY / document.body.scrollHeight but it was inconsistent across different content lengths. Then I tried fixed pixel values like 500px but it wasn't responsive to different screen sizes. The breakthrough came when I used scrollY / window.innerHeight which provided perfect 1:1 relationship with viewport height.

// For rotation progress calculation, I used Math.min(scrollY / doorOpeningDistance, 1) which ensures progress never exceeds 1 (100%), provides smooth linear progression from 0 to 1, and caps rotation at exactly 90 degrees.

// For real-time scroll-following, I use scrollFollowingFactor = 1.0 which means the elements move at the same speed as the scroll, creating direct following behavior. This makes the doors and background appear to be physically attached to the scroll position, moving in real-time as the user scrolls.

// I implemented a smart stopping mechanism where after doors reach 90 degrees, they stop following scroll but remain in final positions. This allows users to continue scrolling to the SVG section while maintaining the visual state of fully opened doors revealing the background.

// I used several W3Schools base tutorials including JavaScript Window Object with scrollY property, JavaScript Window Object with innerHeight property, JavaScript Math with min() method, and CSS Transform with rotateY() and translateY() functions.

// My modifications to achieve scroll-following effect started with the original W3Schools scroll example which was simply "window.onscroll = function() { var scrollTop = window.pageYOffset; // Basic scroll handling };". I enhanced this version by combining multiple W3Schools techniques to create a dual-effect where doors rotate based on scroll progress and elements move with scroll, creating the illusion that scrolling physically moves the door elements while simultaneously triggering the door opening animation.

function updateDoorRotation() {
  // W3SCHOOLS TECHNIQUE: window.scrollY
  // Reference: https://www.w3schools.com/jsref/prop_win_scrolly.asp
  // MODIFICATION: Using scrollY instead of pageYOffset for modern compatibility
  const scrollY = window.scrollY; // Current scroll position

  // Play bell sound when user first starts scrolling
  playBellOnScrollStart();

  //  W3SCHOOLS TECHNIQUE: window.innerHeight
  //  Reference: https://www.w3schools.com/jsref/prop_win_innerheight.asp
  // MODIFICATION: Using innerHeight to create responsive door opening distance
  const windowHeight = window.innerHeight; // Viewport height

  // Define the scroll distance for door opening (extended to 200vh for longer scroll)
  // Increased scroll distance for more gradual door opening and longer fade effect
  const doorOpeningDistance = windowHeight * 2; // 200vh instead of 100vh

  // W3SCHOOLS TECHNIQUE: Math.min()
  //  Reference: https://www.w3schools.com/jsref/jsref_min.asp
  // MODIFICATION: Using Math.min() to cap rotation progress at 1 (100%)
  // This prevents doors from rotating beyond 90 degrees
  const rotationProgress = Math.min(scrollY / doorOpeningDistance, 1);

  // Convert progress to degrees (0 to 90 degrees)
  const rotationDegrees = rotationProgress * 90;

  // ===== BELL SOUND TRIGGER - SYNCHRONIZED SHOP ENTRANCE & EXIT EXPERIENCE =====
  //
  // Play bell sound when user starts scrolling to rotate doors (opening), creating synchronized audio-visual feedback
  // This mimics the real-world experience of hearing a shop bell when opening a door to enter a flower shop
  // The sound plays at the moment doors begin rotating, reinforcing the immersive shop entrance experience
  // Only play once when rotation begins (progress > 0.05 to avoid accidental triggers)
  if (rotationProgress > 0.05 && !bellHasPlayedForOpening) {
    bellSound.play().catch((error) => {
      console.log("Bell sound play failed:", error);
    });
    bellHasPlayedForOpening = true; // Prevent multiple bell plays during door opening
  }

  // =====  DOOR CLOSING EXPERIENCE =====
  //
  // Play bell sound when user scrolls back to the top, representing the customer closing the door
  // This creates a complete shop experience: bell rings when entering, bell rings when leaving
  // Reset the opening bell flag when returning to top so it can play again on next scroll down
  const isAtTop = scrollY <= 10; // Consider "at top" when within 10px of the very top

  if (isAtTop && !wasAtTop && !bellHasPlayedForClosing) {
    // User just returned to the top - play closing bell
    bellSound.play().catch((error) => {
      console.log("Bell sound play failed:", error);
    });
    bellHasPlayedForClosing = true;
    // Prevent multiple closing bell plays
    bellHasPlayedForOpening = false;
    // Reset opening bell so it can play again
  } else if (!isAtTop && wasAtTop) {
    // User just left the top - reset closing bell flag
    bellHasPlayedForClosing = false;
  }

  wasAtTop = isAtTop;

  // scroll to trigger door rotation but with fixed position=====
  //
  // The doors and background are now fixed in position and rotate based on scroll progress.
  // As the user scrolls, the doors rotate to reveal the background image underneath.
  // The doors stay fixed on top of the scrolling content until fully opened.

  // Apply rotation to doors using CSS transform
  if (door1) {
    // Left door rotates clockwise from its left edge
    door1.style.transform = `rotateY(${rotationDegrees}deg)`;
  }
  if (door2) {
    // Right door rotates counter-clockwise from its right edge
    door2.style.transform = `rotateY(-${rotationDegrees}deg)`;
  }
  if (background) {
    // Background stays in place, no transform needed
    background.style.transform = `none`;
  }

  // When doors reach 90 degrees (fully opened), hide the door section
  // to allow the background content to be fully visible

  const doorSection = document.querySelector(".door-section");
  if (doorSection) {
    if (rotationProgress >= 1) {
      // Doors are fully opened, fade out the door section
      doorSection.style.opacity = "0";
      doorSection.style.pointerEvents = "none";
    } else if (rotationProgress >= 0.85) {
      // Start gradual fade when doors are 85% opened for quicker transition
      const fadeProgress = (rotationProgress - 0.85) / 0.15; // 0 to 1 as doors open from 85% to 100%
      const opacity = 1 - fadeProgress; // Gradually fade from 1 to 0
      doorSection.style.opacity = opacity.toString();
      doorSection.style.pointerEvents = "auto";
    } else {
      // Doors are still opening, keep door section fully visible
      doorSection.style.opacity = "1";
      doorSection.style.pointerEvents = "auto";
    }
  }
}

// ===== W3SCHOOLS SCROLL EVENT HANDLING references =====
//
//  W3SCHOOLS BASE TUTORIAL: JavaScript Events - onscroll
//  Reference: https://www.w3schools.com/jsref/event_onscroll.asp
//
// W3SCHOOLS ORIGINAL TECHNIQUE:
// window.onscroll = function() {
//   Basic scroll event handling
// };
//
//  MY MODIFICATION TO ACHIEVE DOOR SCROLL-FOLLOWING:
// Instead of using requestAnimationFrame which is not covered in W3Schools tutorials, I'm using the direct W3Schools onscroll method with enhanced functionality to create both door rotation AND scroll-following effects simultaneously.

// I used several W3Schools techniques including window.onscroll for JavaScript Events, window.scrollY for JavaScript Window Object, window.innerHeight for JavaScript Window Object, Math.min() for JavaScript Math, CSS transform for W3Schools CSS Transform, and addEventListener() for W3Schools JavaScript Events.

// Listen for scroll events using W3Schools onscroll method
window.onscroll = updateDoorRotation;

//
// When the page is refreshed or loaded, automatically scroll to the top
// This ensures users always start at the beginning of the flower shop experience
// regardless of where they were when they refreshed the page

window.addEventListener("load", function () {
  // Scroll to the very top of the page when page loads/refreshes
  window.scrollTo(0, 0);
});

// Also handle page refresh with beforeunload to ensure clean state
window.addEventListener("beforeunload", function () {
  // Reset scroll position to top before page unloads
  window.scrollTo(0, 0);
});

let hasScrolled = false; // Track if user has started scrolling

function playBellOnScrollStart() {
  // Play bell sound when user first starts scrolling
  if (!hasScrolled) {
    bellSound.play().catch((error) => {
      console.log("Bell sound play failed:", error);
    });
    hasScrolled = true; // Prevent multiple plays
  }
}

// The scroll motion now creates a sophisticated real-time interaction where doors and background follow the scroll position in real-time, creating the illusion that the user's scroll action is physically moving the door elements. Simultaneously, doors rotate to reveal the background, symbolizing the entry ritual into the flower shop. The synchronized dual bell sound system enhances this experience by providing authentic audio feedback that mimics the traditional shop door bell for both entering and leaving, creating a complete immersive multi-sensory interaction that makes users feel like they are physically walking into and out of a real flower shop. The doors and background move with the scroll until they reach 90 degrees, then they stop following scroll but remain in their final positions, allowing users to continue scrolling to the SVG section while maintaining the visual state of fully opened doors.
