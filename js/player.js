const playlist = ["audio/1.mp3", "audio/2.mp3", "audio/3.mp3", "audio/4.mp3", "audio/5.mp3"];
let currentIndex = 0;

const player = document.getElementById("player");
const progressBar = document.getElementById("progress-bar");
const playPauseBtn = document.getElementById("playPauseBtn");
const ball = document.getElementById("musicBall");
const messageBalloon = document.getElementById("musicMessage");

// Otimização: Carrega apenas metadados inicialmente
player.preload = "metadata";
player.src = playlist[currentIndex];

function playPause() {
  if (player.paused) {
    player.play();
  } else {
    player.pause();
  }
}

function nextSong() {
  currentIndex = (currentIndex + 1) % playlist.length;
  player.src = playlist[currentIndex];
  player.play();
}

function prevSong() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  player.src = playlist[currentIndex];
  player.play();
}

player.addEventListener("timeupdate", () => {
  const percent = (player.currentTime / player.duration) * 100;
  progressBar.style.width = percent + "%";
});

player.addEventListener("play", () => {
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  ball.classList.add("playing");
  messageBalloon.classList.add("hidden");
});

player.addEventListener("pause", () => {
  playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  ball.classList.remove("playing");
  messageBalloon.classList.remove("hidden");
});