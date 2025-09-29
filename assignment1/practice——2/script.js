// Vinyl Record Player JavaScript - Updated for New Layout

class VinylPlayer {
  constructor() {
    this.currentSong = null;
    this.isPlaying = false;
    this.audio = document.getElementById("audio");
    this.audioPlayer = document.getElementById("audioPlayer");
    this.playPauseBtn = document.getElementById("playPauseBtn");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.currentSongTitle = document.getElementById("currentSong");
    this.currentArtist = document.getElementById("currentArtist");

    // New elements for the updated layout
    this.mainVinylImage = document.getElementById("mainVinylImage");
    this.mainPlayButton = document.getElementById("mainPlayButton");
    this.currentSongInfo = document.getElementById("currentSongInfo");
    this.currentSongTitleElement = document.getElementById("currentSongTitle");
    this.currentSongArtistElement =
      document.getElementById("currentSongArtist");
    this.currentSongLyricsElement =
      document.getElementById("currentSongLyrics");

    this.songs = {
      song1: {
        title: "Bohemian Rhapsody",
        artist: "Queen",
        year: "1975",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        lyrics:
          "Is this the real life? Is this just fantasy? Caught in a landslide, no escape from reality. Open your eyes, look up to the skies and see. I'm just a poor boy, I need no sympathy. Because I'm easy come, easy go, little high, little low. Any way the wind blows doesn't really matter to me...",
        imageUrl:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop&crop=center",
      },
      song2: {
        title: "Hotel California",
        artist: "Eagles",
        year: "1976",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        lyrics:
          'On a dark desert highway, cool wind in my hair. Warm smell of colitas, rising up through the air. Up ahead in the distance, I saw a shimmering light. My head grew heavy and my sight grew dim, I had to stop for the night. There she stood in the doorway, I heard the mission bell. And I was thinking to myself, "This could be Heaven or this could be Hell"...',
        imageUrl:
          "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop&crop=center",
      },
      song3: {
        title: "Imagine",
        artist: "John Lennon",
        year: "1971",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        lyrics:
          "Imagine there's no heaven, it's easy if you try. No hell below us, above us only sky. Imagine all the people living for today. Imagine there's no countries, it isn't hard to do. Nothing to kill or die for, and no religion too. Imagine all the people living life in peace...",
        imageUrl:
          "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&h=600&fit=crop&crop=center",
      },
      song4: {
        title: "Stairway to Heaven",
        artist: "Led Zeppelin",
        year: "1971",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        lyrics:
          "There's a lady who's sure all that glitters is gold, and she's buying a stairway to heaven. When she gets there she knows, if the stores are all closed, with a word she can get what she came for. And she's buying a stairway to heaven. There's a sign on the wall but she wants to be sure, 'cause you know sometimes words have two meanings...",
        imageUrl:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop&crop=center",
      },
      song5: {
        title: "Sweet Child O' Mine",
        artist: "Guns N' Roses",
        year: "1987",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        lyrics:
          "She's got a smile that it seems to me reminds me of childhood memories where everything was as fresh as the bright blue sky. Now and then when I see her face, she takes me away to that special place, and if I stared too long, I'd probably break down and cry. Sweet child o' mine, sweet love of mine...",
        imageUrl:
          "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop&crop=center",
      },
      song6: {
        title: "Billie Jean",
        artist: "Michael Jackson",
        year: "1982",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        lyrics:
          "Billie Jean is not my lover, she's just a girl who claims that I am the one. But the kid is not my son, she says I am the one, but the kid is not my son. For forty days and forty nights, the law was on her side. But who can stand when she's in demand, her schemes and plans...",
        imageUrl:
          "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&h=600&fit=crop&crop=center",
      },
    };

    this.songOrder = ["song1", "song2", "song3", "song4", "song5", "song6"];
    this.currentIndex = 0;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupAudioEvents();
    this.updateMainVinylDisplay();
  }

  setupEventListeners() {
    // Main vinyl play button
    this.mainPlayButton.addEventListener("click", () => {
      if (this.currentSong) {
        this.togglePlayPause();
      }
    });

    // Main vinyl image click
    this.mainVinylImage.addEventListener("click", () => {
      if (this.currentSong) {
        this.togglePlayPause();
      }
    });

    // Song item clicks
    document.querySelectorAll(".song-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        const songId = item.getAttribute("data-song");
        this.playSong(songId);
      });
    });

    // Player controls
    this.playPauseBtn.addEventListener("click", () => this.togglePlayPause());
    this.prevBtn.addEventListener("click", () => this.previousSong());
    this.nextBtn.addEventListener("click", () => this.nextSong());

    // Keyboard controls
    document.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "Space":
          e.preventDefault();
          this.togglePlayPause();
          break;
        case "ArrowLeft":
          this.previousSong();
          break;
        case "ArrowRight":
          this.nextSong();
          break;
      }
    });
  }

  setupAudioEvents() {
    this.audio.addEventListener("ended", () => {
      this.nextSong();
    });

    this.audio.addEventListener("loadstart", () => {
      console.log("Loading audio...");
    });

    this.audio.addEventListener("canplay", () => {
      console.log("Audio ready to play");
    });

    this.audio.addEventListener("error", (e) => {
      console.log("Audio error:", e);
      this.showNotification(
        "Audio file not available. This is a demo with placeholder audio."
      );
    });
  }

  playSong(songId) {
    const song = this.songs[songId];
    if (!song) return;

    // Update current song
    this.currentSong = songId;
    this.currentIndex = this.songOrder.indexOf(songId);

    // Update main vinyl display
    this.updateMainVinylDisplay();

    // Update song selection UI
    this.updateSongSelectionUI(songId);

    // Update current song info
    this.updateCurrentSongInfo(song);

    // Set audio source
    this.audio.src = song.audioUrl;

    // Show player
    this.audioPlayer.classList.add("active");

    // Play audio
    this.audio
      .play()
      .then(() => {
        this.isPlaying = true;
        this.updatePlayPauseButton();
        this.updateMainPlayButton();
        this.showNotification(`Now playing: ${song.title} by ${song.artist}`);
      })
      .catch((error) => {
        console.log("Playback failed:", error);
        this.showNotification(
          "Playback failed. This is a demo with placeholder audio."
        );
      });
  }

  togglePlayPause() {
    if (!this.currentSong) return;

    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    } else {
      this.audio
        .play()
        .then(() => {
          this.isPlaying = true;
        })
        .catch((error) => {
          console.log("Playback failed:", error);
          this.showNotification(
            "Playback failed. This is a demo with placeholder audio."
          );
        });
    }

    this.updatePlayPauseButton();
    this.updateMainPlayButton();
    this.updateMainVinylDisplay();
  }

  previousSong() {
    if (!this.currentSong) return;

    this.currentIndex =
      (this.currentIndex - 1 + this.songOrder.length) % this.songOrder.length;
    const songId = this.songOrder[this.currentIndex];
    this.playSong(songId);
  }

  nextSong() {
    if (!this.currentSong) return;

    this.currentIndex = (this.currentIndex + 1) % this.songOrder.length;
    const songId = this.songOrder[this.currentIndex];
    this.playSong(songId);
  }

  updateMainVinylDisplay() {
    if (this.currentSong) {
      const song = this.songs[this.currentSong];
      this.mainVinylImage.src = song.imageUrl;

      // Add or remove playing class for spinning animation
      if (this.isPlaying) {
        this.mainVinylImage.classList.add("playing");
      } else {
        this.mainVinylImage.classList.remove("playing");
      }
    }
  }

  updateSongSelectionUI(activeSongId) {
    // Remove active class from all song items
    document.querySelectorAll(".song-item").forEach((item) => {
      item.classList.remove("active");
    });

    // Add active class to current song
    const activeItem = document.querySelector(`[data-song="${activeSongId}"]`);
    if (activeItem) {
      activeItem.classList.add("active");
    }
  }

  updateCurrentSongInfo(song) {
    this.currentSongTitleElement.textContent = song.title;
    this.currentSongArtistElement.textContent = `${song.artist} (${song.year})`;
    this.currentSongLyricsElement.textContent = song.lyrics;
  }

  updatePlayPauseButton() {
    this.playPauseBtn.textContent = this.isPlaying ? "⏸" : "▶";
  }

  updateMainPlayButton() {
    this.mainPlayButton.querySelector(".main-play-icon").textContent = this
      .isPlaying
      ? "⏸"
      : "▶";
  }

  showNotification(message) {
    // Create notification element
    const notification = document.createElement("section");
    notification.className = "notification";
    notification.textContent = message;
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 107, 107, 0.9);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            z-index: 1001;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: slideIn 0.3s ease;
        `;

    // Add animation keyframes
    if (!document.querySelector("#notification-styles")) {
      const style = document.createElement("style");
      style.id = "notification-styles";
      style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = "slideOut 0.3s ease";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
}

// Initialize the vinyl player when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new VinylPlayer();

  // Add some interactive effects
  document.querySelectorAll(".song-item").forEach((item, index) => {
    // Staggered animation on load
    item.style.opacity = "0";
    item.style.transform = "translateX(50px)";

    setTimeout(() => {
      item.style.transition = "all 0.6s ease";
      item.style.opacity = "1";
      item.style.transform = "translateX(0)";
    }, index * 100 + 500); // Delay after vinyl entrance
  });

  // Add click ripple effect to main vinyl
  const mainVinyl = document.getElementById("mainVinylImage");
  mainVinyl.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });

  // Add ripple animation
  if (!document.querySelector("#ripple-styles")) {
    const style = document.createElement("style");
    style.id = "ripple-styles";
    style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);
  }
});
