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

// ===== AUDIO CONTROL FUNCTIONALITY =====
//
// Audio control button that appears when florist.mp3 starts playing
// Users can click to mute/unmute the audio
// Button switches between audio.png (unmuted) and mute.png (muted) states

// Get the audio control button
const audioControl = document.getElementById("audioControl");

// Track audio state
let isAudioPlaying = false;
let audioControlVisible = false;

// Function to show/hide audio control button
function setAudioControlVisibility(visible) {
  audioControl.style.display = visible ? "block" : "none";
  audioControlVisible = visible;
}

// Function to toggle play/pause
function toggleAudioPlayPause() {
  if (floristSound.paused) {
    floristSound
      .play()
      .then(() => {
        audioControl.src = "audio.png";
        isAudioPlaying = true;
      })
      .catch(() => console.log("Florist sound play failed"));
  } else {
    floristSound.pause();
    audioControl.src = "mute.png";
    isAudioPlaying = false;
  }
}

// Add click event listener to audio control button
audioControl.addEventListener("click", toggleAudioPlayPause);

// ===== END AUDIO CONTROL FUNCTIONALITY =====

// ===== PAINT BRUSH CURSOR SYSTEM - ARTISTIC INTERACTION HINTS =====
//
// You know how when you're in an art studio and you pick up a paintbrush, your hand naturally
// transforms into that of an artist? That's exactly what happens here! When users start dragging
// a color from our beautiful spiral palette, their cursor magically becomes a paint brush.
//
// This isn't just a visual gimmick - it's a psychological cue that transforms the user from
// a passive observer into an active artist. The brush cursor whispers to them: "You're not
// just clicking around, you're creating art. You're painting your own bouquet."
//
// The brush cursor appears the moment they start dragging, giving them that satisfying
// "I'm holding a real paintbrush" feeling, and disappears when they're done, returning them
// to normal browsing mode. It's like putting down your brush after finishing a masterpiece.

// ===== INTERACTION AREA LIMITATION - FOCUSED ARTISTIC EXPERIENCE =====
//
// Just like how a real artist works within the boundaries of their canvas, I want to guide
// users to focus their creative energy within  designated artistic workspace. The svg-and-colors-container
// becomes their creative canvas - this is where the magic happens, where colors meet flowers,
// where art is born.
//
// I also limit the area where the paintbrush cursor appear. This is because I want to give user a hint about this area is the main interaction happens.
//
// The brush cursor will only appear when users are actively working within their artistic
// workspace, making the interaction feel more purposeful and immersive.

// Get the main interaction container - this is my artistic workspace
const svgAndColorsContainer = document.querySelector(
  ".svg-and-colors-container"
);

// Function to check if mouse is within the artistic workspace
function isWithinArtisticWorkspace(event) {
  if (!svgAndColorsContainer) return false;

  const rect = svgAndColorsContainer.getBoundingClientRect();
  const x = event.clientX;
  const y = event.clientY;

  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

// Enhanced drag start with workspace awareness
boxes.forEach((colorBlock) => {
  colorBlock.addEventListener("dragstart", (event) => {
    bgColor = window.getComputedStyle(event.target).backgroundColor;
    console.log("Dragging color:", bgColor); // Debug log

    // Only transform into artist mode if user is in the artistic workspace
    if (isWithinArtisticWorkspace(event)) {
      // Transform the user into an artist! Add brush cursor class during drag
      // This magical moment when their cursor becomes a paintbrush
      document.body.classList.add("brush-cursor");
      colorBlock.classList.add("dragging");
    }

    // Play florist.mp3 when drag interaction starts - the soundtrack of artistic creation
    floristSound
      .play()
      .then(() => {
        audioControl.src = "audio.png";
        isAudioPlaying = true;
        setAudioControlVisibility(true);
      })
      .catch(() => console.log("Florist sound play failed"));
  });

  // Enhanced drag end with workspace cleanup
  colorBlock.addEventListener("dragend", (event) => {
    // The artistic moment is over - return to normal cursor
    // Like putting down your paintbrush after finishing your masterpiece
    document.body.classList.remove("brush-cursor");
    colorBlock.classList.remove("dragging");
  });
});

// Add mouse movement tracking to dynamically manage brush cursor visibility
// This ensures the brush cursor only appears when users are actively working in their artistic space
document.addEventListener("mousemove", (event) => {
  // Only apply workspace logic if user is currently in brush mode (dragging)
  if (document.body.classList.contains("brush-cursor")) {
    if (!isWithinArtisticWorkspace(event)) {
      // User moved outside their artistic workspace - remove brush cursor
      document.body.classList.remove("brush-cursor");
    } else {
      // User is back in their artistic workspace - restore brush cursor
      document.body.classList.add("brush-cursor");
    }
  }
});

// Helper function to setup drag-and-drop for elements
function setupDragAndDrop(elements) {
  elements.forEach((element) => {
    element.addEventListener("dragover", (event) => {
      event.preventDefault();
      element.classList.add("drag-over");
    });

    element.addEventListener("dragleave", () => {
      element.classList.remove("drag-over");
    });

    element.addEventListener("drop", (event) => {
      event.preventDefault();
      element.style.fill = bgColor;
      element.classList.remove("drag-over");
      document.body.classList.remove("brush-cursor");
    });
  });
}

// Setup drag-and-drop for orange flowers
setupDragAndDrop(orangeFlowers);

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
setupDragAndDrop(e04819Paths);

// DRAG AND DROP FOR F16691 PATHS
//
// Add drag and drop functionality for the two paths with fill #f16691
// This allows users to drag color boxes onto these specific paths to change their color

const f16691Paths = document.querySelectorAll("#path-f16691-1, #path-f16691-2");
setupDragAndDrop(f16691Paths);

// Add drag and drop functionality for the seven paths with fill #f7df52
// This allows users to drag color boxes onto these specific paths to change their color

const f7df52Paths = document.querySelectorAll(
  "#path-f7df52-1, #path-f7df52-2, #path-f7df52-3, #path-f7df52-4, #path-f7df52-5, #path-f7df52-6, #path-f7df52-7"
);
setupDragAndDrop(f7df52Paths);

//
// Add drag and drop functionality for the path with fill #f79c53
// This allows users to drag color boxes onto this specific path to change its color

const f79c53Paths = document.querySelectorAll("#path-f79c53-1");
setupDragAndDrop(f79c53Paths);

const ffa58bPaths = document.querySelectorAll(
  "#path-ffa58b-1, #path-ffa58b-2, #path-ffa58b-3"
);
setupDragAndDrop(ffa58bPaths);

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
let wasAtTop = true; // Track if I was at the top previously

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
  // Play bell sound when scroll.gif starts being triggered by scroll movement (rotationProgress > 0.02)
  // This mimics the real-world experience of hearing a shop bell when opening a door to enter a flower shop
  // The sound plays when doors start visibly rotating and scroll.gif begins its animation, reinforcing the immersive shop entrance experience
  // Only play once when scroll movement becomes noticeable (about 2% door opening = ~4vh scroll)
  if (rotationProgress > 0.02 && !bellHasPlayedForOpening) {
    bellSound.play().catch(() => console.log("Bell sound play failed"));
    bellHasPlayedForOpening = true;
  }

  // =====  DOOR CLOSING EXPERIENCE =====
  //
  // Play bell sound when user scrolls back to the top, representing the customer closing the door
  // This creates a complete shop experience: bell rings when entering, bell rings when leaving
  // Reset the opening bell flag when returning to top so it can play again on next scroll down
  const isAtTop = scrollY <= 10; // Consider "at top" when within 10px of the very top

  if (isAtTop && !wasAtTop && !bellHasPlayedForClosing) {
    bellSound.play().catch(() => console.log("Bell sound play failed"));
    bellHasPlayedForClosing = true;
    bellHasPlayedForOpening = false; // Reset opening bell so it can play again
  } else if (!isAtTop && wasAtTop) {
    bellHasPlayedForClosing = false;
  }

  wasAtTop = isAtTop;

  // scroll to trigger door rotation but with fixed position=====
  //
  // The doors and background are now fixed in position and rotate based on scroll progress.
  // As the user scrolls, the doors rotate to reveal the background image underneath.
  // The doors stay fixed on top of the scrolling content until fully opened.

  // Apply rotation to doors using CSS transform
  if (door1) door1.style.transform = `rotateY(${rotationDegrees}deg)`;
  if (door2) door2.style.transform = `rotateY(-${rotationDegrees}deg)`;
  if (background) background.style.transform = `none`;

  // When doors reach 90 degrees (fully opened), hide the door section
  // to allow the background content to be fully visible

  const doorSection = document.querySelector(".door-section");
  if (doorSection) {
    if (rotationProgress >= 1) {
      doorSection.style.opacity = "0";
      doorSection.style.pointerEvents = "none";
    } else if (rotationProgress >= 0.85) {
      // Gradually fade from 85% to 100% opening
      const opacity = 1 - (rotationProgress - 0.85) / 0.15;
      doorSection.style.opacity = opacity.toString();
      doorSection.style.pointerEvents = "auto";
    } else {
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
  // Reset bell flags so bell sound plays on first scroll after refresh/load
  bellHasPlayedForOpening = false;
  bellHasPlayedForClosing = false;
  wasAtTop = true;
});

// Also handle page refresh with beforeunload to ensure clean state
window.addEventListener("beforeunload", function () {
  // Reset scroll position to top before page unloads
  window.scrollTo(0, 0);
});

// The scroll motion now creates a sophisticated real-time interaction where doors and background follow the scroll position in real-time, creating the illusion that the user's scroll action is physically moving the door elements. Simultaneously, doors rotate to reveal the background, symbolizing the entry ritual into the flower shop. The synchronized dual bell sound system enhances this experience by providing authentic audio feedback that mimics the traditional shop door bell for both entering and leaving, creating a complete immersive multi-sensory interaction that makes users feel like they are physically walking into and out of a real flower shop. The doors and background move with the scroll until they reach 90 degrees, then they stop following scroll but remain in their final positions, allowing users to continue scrolling to the SVG section while maintaining the visual state of fully opened doors.

// ===== RESET COLORS FUNCTIONALITY =====
//
// The reset button allows users to clear all applied paint colors from the flower bouquet
// and return it to its default state. This provides a way to start fresh and explore
// different color combinations without needing to reload the page.
//
// The reset function restores all SVG paths to their original fill colors, giving users
// a clean canvas to work with. The hover effect provides visual feedback, making it clear
// that the button is interactive and ready to restore the bouquet's original appearance.

// Get the reset button
const resetColorsBtn = document.getElementById("resetColorsBtn");

// Default colors mapping for reset functionality
const defaultColors = {
  ".orange": "#e57b26",
  "#path-e04819-1, #path-e04819-2": "#e04819",
  "#path-f16691-1, #path-f16691-2": "#f16691",
  "#path-f7df52-1, #path-f7df52-2, #path-f7df52-3, #path-f7df52-4, #path-f7df52-5, #path-f7df52-6, #path-f7df52-7":
    "#f7df52",
  "#path-f79c53-1": "#f79c53",
  "#path-ffa58b-1, #path-ffa58b-2, #path-ffa58b-3": "#ffa58b",
};

// Function to reset all colors to their default state
function resetColors() {
  Object.entries(defaultColors).forEach(([selector, color]) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.style.fill = color;
    });
  });
  console.log("All colors have been reset to default state");
}

// Add click event listener to reset button
resetColorsBtn.addEventListener("click", resetColors);

// ===== SAVE IMAGE FUNCTIONALITY =====
//
// The save button allows users to download their customized bouquet as an image.
// This saves the SVG content with all the applied colors, giving users a way to
// preserve their artistic creation and share it with others.
//
// The save function converts the SVG to a PNG image for easy sharing and downloading.

// ===== CAMERA.WAV SOUND EFFECT - MEMORY CAPTURE EXPERIENCE =====
//
// The camera.wav audio is a crucial part of the memory preservation experience.
// When users click on savebutton.png, they are not just downloading an image -
// they are capturing a precious memory that they designed with their own creative touch.
//
// This sound effect mimics the nostalgic experience of taking a photograph with an
// old camera, creating an emotional connection between the action of saving and the
// concept of memory preservation. It transforms the technical act of downloading an
// image into a meaningful moment of capturing something beautiful and personal.
//
// The sound plays at the exact moment the user clicks the save button, reinforcing
// that they are "keeping" the flower bouquet they designed, just like how you would
// take a photo to keep a memory. This audio feedback enhances the emotional value
// of the interaction, making users feel that they are truly preserving something
// special - their own artistic creation and the memories associated with it.

// Audio element for camera sound
const cameraSound = new Audio("camera.wav");
cameraSound.volume = 0.7; // Set volume to 70% for pleasant experience

// Get the save button
const saveButton = document.getElementById("saveButton");

// Function to save the SVG as an image
function saveSVGAsImage() {
  cameraSound.play().catch(() => console.log("Camera sound play failed"));

  // Get the SVG element
  const svgElement = document.querySelector(".svg-container svg");

  if (!svgElement) {
    console.error("SVG element not found");
    return;
  }

  // Clone the SVG to avoid modifying the original
  const svgClone = svgElement.cloneNode(true);

  // Get the current styles and dimensions
  const styles = window.getComputedStyle(svgElement);
  const width = parseInt(
    svgElement.getAttribute("width") || svgElement.viewBox.baseVal.width || 1200
  );
  const height = parseInt(
    svgElement.getAttribute("height") ||
      svgElement.viewBox.baseVal.height ||
      1200
  );

  // Set dimensions on the clone
  svgClone.setAttribute("width", width);
  svgClone.setAttribute("height", height);

  // Serialize the SVG to string
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgClone);

  // Create a blob from the SVG string
  const svgBlob = new Blob([svgString], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = URL.createObjectURL(svgBlob);

  // Create an image element to convert SVG to canvas
  const img = new Image();
  img.onload = function () {
    // Create a canvas element
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    // Draw the image on the canvas
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Convert canvas to blob and trigger download
    canvas.toBlob(function (blob) {
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "bouquet-" + Date.now() + ".png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up URLs
      URL.revokeObjectURL(url);
      URL.revokeObjectURL(downloadUrl);
    }, "image/png");
  };

  img.onerror = function () {
    console.error("Error loading SVG image");
    URL.revokeObjectURL(url);
  };

  img.src = url;

  console.log("Bouquet saved successfully!");
}

// Add click event listener to save button
saveButton.addEventListener("click", saveSVGAsImage);

// ===== FINISH BUTTON FUNCTIONALITY - WARM CARD MESSAGE EXPERIENCE =====
//
// The finish button provides users with a perfect ending to their creative journey.
// When users click on finishbutton.png after completing their bouquet design, they
// are presented with a warm card message that creates an emotionally satisfying closure.
//
// This isn't just a technical "end" to the interaction - it's a meaningful farewell
// that acknowledges the personal artistic expression the user just experienced.
// The card message reads: "Every design tells a story, thank you for sharing your
// beautiful touch with us, may beauty follow until we meet again."
//
// This message brings out the deeper value of the interactive game by:
// - Recognizing that each color choice and design tells a unique personal story
// - Expressing gratitude for the time and creativity the user invested
// - Ending on a positive, hopeful note that wishes them well
// - Transforming the ending from a simple "game over" into a heartfelt
//   gratitude and appreciation moment
//
// The finish button creates a complete emotional arc: users start by entering a
// flower shop, they become artists as they paint flowers with colors, they capture
// memories by saving their creation, and they end with a warm, personal message
// that validates their creative expression and leaves them feeling appreciated.
//
// Users can close the message by clicking the close icon, which hides both the
// message and icon, allowing them to return to their bouquet if desired.

// Audio element for finish sound
const finishSound = new Audio("finnish.wav");
finishSound.volume = 0.7; // Set volume to 70% for pleasant experience

// Get the finish button and card message elements
const finishButton = document.getElementById("finishButton");
const cardMessageOverlay = document.getElementById("cardMessageOverlay");
const closeCardMessageBtn = document.getElementById("closeCardMessage");

// Function to show the card message
function showCardMessage() {
  finishSound.play().catch(() => console.log("Finish sound play failed"));
  if (cardMessageOverlay) cardMessageOverlay.style.display = "flex";
}

// Function to hide the card message
function hideCardMessage() {
  if (cardMessageOverlay) cardMessageOverlay.style.display = "none";
}

// Add click event listener to finish button
if (finishButton) {
  finishButton.addEventListener("click", showCardMessage);
}

// Add click event listener to close button
if (closeCardMessageBtn) {
  closeCardMessageBtn.addEventListener("click", hideCardMessage);
}

// ===== DRAGGABLE FLOWERS ON HAVE FUN IMAGE =====
//
// I added draggable flowers on the have fun image with random initial positions because I want the experience
// before entering into the main interaction of dragging color dots from the color palette to be more explorable.
// I want users to discover this drag and drop flower feature on the have fun page as an interactive preview
// of what they can do in the main design section.
//
// This functionality allows users to drag f1-f5 flower images within the havefun.png container.
// The flowers are positioned randomly on page load and can be dragged around, but their movement
// is constrained within the container boundaries to keep them visible and within the design.
//
// Features:
// - Random initial positioning for each flower
// - Drag and drop interaction
// - Boundary constraints to keep flowers within container
// - Visual feedback during dragging

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const draggableFlowers = document.querySelectorAll(".draggable-flower");
  const haveFunContainer = document.querySelector(".have-fun-container");

  if (!haveFunContainer || draggableFlowers.length === 0) {
    console.log("Have fun container or draggable flowers not found");
    return;
  }

  // Function to generate random position within container bounds
  function getRandomPosition(container, flower) {
    const containerRect = container.getBoundingClientRect();
    const flowerWidth = flower.offsetWidth || 80; // Default width if not rendered yet
    const flowerHeight = flower.offsetHeight || 80; // Default height if not rendered yet

    // Calculate random position within bounds
    const maxX = containerRect.width - flowerWidth;
    const maxY = containerRect.height - flowerHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    return { x: randomX, y: randomY };
  }

  // Set random initial positions for all flowers
  draggableFlowers.forEach((flower) => {
    const randomPos = getRandomPosition(haveFunContainer, flower);
    flower.style.left = randomPos.x + "px";
    flower.style.top = randomPos.y + "px";
  });

  // Add drag and drop functionality
  draggableFlowers.forEach((flower) => {
    let isDragging = false;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    // Get initial position from style
    const getCurrentPosition = (element) => {
      const left = parseInt(element.style.left) || 0;
      const top = parseInt(element.style.top) || 0;
      return { left, top };
    };

    // Mouse events for desktop - only start on the flower
    flower.addEventListener("mousedown", dragStart);

    // Document-level events to handle dragging anywhere on screen
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);

    // Touch events for mobile support
    flower.addEventListener("touchstart", dragStart);
    document.addEventListener("touchmove", drag);
    document.addEventListener("touchend", dragEnd);

    function dragStart(e) {
      e.preventDefault();

      // Get current position of the flower
      const pos = getCurrentPosition(flower);
      xOffset = pos.left;
      yOffset = pos.top;

      // Get the container position
      const containerRect = haveFunContainer.getBoundingClientRect();

      // Convert client coordinates to container coordinates
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - containerRect.left;
        initialY = e.touches[0].clientY - containerRect.top;
      } else {
        initialX = e.clientX - containerRect.left;
        initialY = e.clientY - containerRect.top;
      }

      isDragging = true;
      flower.classList.add("dragging");
    }

    function dragEnd(e) {
      if (isDragging) {
        isDragging = false;
        flower.classList.remove("dragging");
      }
    }

    function drag(e) {
      if (!isDragging) return;

      e.preventDefault();

      // Get the container position
      const containerRect = haveFunContainer.getBoundingClientRect();

      // Get current mouse/touch position relative to container
      let currentMouseX, currentMouseY;
      if (e.type === "touchmove") {
        currentMouseX = e.touches[0].clientX - containerRect.left;
        currentMouseY = e.touches[0].clientY - containerRect.top;
      } else {
        currentMouseX = e.clientX - containerRect.left;
        currentMouseY = e.clientY - containerRect.top;
      }

      // Calculate new position
      const newX = currentMouseX - (initialX - xOffset);
      const newY = currentMouseY - (initialY - yOffset);

      // Get flower dimensions
      const flowerWidth = flower.offsetWidth;
      const flowerHeight = flower.offsetHeight;

      // Constrain within container boundaries
      const maxX = containerRect.width - flowerWidth;
      const maxY = containerRect.height - flowerHeight;

      const constrainedX = Math.max(0, Math.min(newX, maxX));
      const constrainedY = Math.max(0, Math.min(newY, maxY));

      // Apply constrained position
      flower.style.left = constrainedX + "px";
      flower.style.top = constrainedY + "px";
    }
  });
});
