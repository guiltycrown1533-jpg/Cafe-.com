/* ==========================================================================
   1. PLAYER DE ÁUDIO E VISUALIZADOR
   ========================================================================== */

const audio = document.querySelector("audio");
const bars = document.querySelectorAll(".bar");
let animationInterval = null;

function moveBars() {
  bars.forEach((bar) => {
    const randomHeight = Math.random() * (100 - 8) + 8;
    bar.style.height = `${randomHeight}px`;
    bar.style.opacity = randomHeight > 50 ? "1" : "0.5";
  });
}

function startVisualizer() {
  if (!animationInterval) {
    animationInterval = setInterval(moveBars, 120);
  }
}

function stopVisualizer() {
  if (animationInterval) {
    clearInterval(animationInterval);
    animationInterval = null;
  }
  bars.forEach((bar) => {
    bar.style.height = "8px";
    bar.style.opacity = "0.6";
  });
}

if (audio) {
  audio.addEventListener("play", startVisualizer);
  audio.addEventListener("pause", stopVisualizer);
  audio.addEventListener("ended", () => {stopVisualizer();nextSong();});
}

const playlist = [
  "audio/1.mp3",
  "audio/2.mp3",
  "audio/3.mp3",
  "audio/4.mp3",
  "audio/5.mp3",
];
let currentIndex = 0;

const player = document.getElementById("player");
const progressBar = document.getElementById("progress-bar");
const playPauseBtn = document.getElementById("playPauseBtn");
const ball = document.getElementById("musicBall");
const messageBalloon = document.getElementById("musicMessage");

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

/* ==========================================================================
   2. GALERIA E CARROSSEIS
   ========================================================================== */

let indexVideo = 0;
function moveVideo(direction) {
  const track = document.getElementById("track-video");
  const items = track.querySelectorAll(".carrossel-item");
  const total = items.length;
  indexVideo = (indexVideo + direction + total) % total;
  track.style.transform = `translateX(-${indexVideo * 100}%)`;
}

let indexFoto = 0;
function moveFoto(direction) {
  const track = document.getElementById("track-foto");
  const items = track.querySelectorAll(".carrossel-item");
  const total = items.length;

  indexFoto = (indexFoto + direction + total) % total;
  track.style.transform = `translateX(-${indexFoto * 100}%)`;
}

/* ==========================================================================
   3. AGENDA E MAPA
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".agenda-item");
  const mapFrame = document.getElementById("map-frame");

  if (buttons.length > 0 && mapFrame) {
    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        console.log("Botão clicado:", this.getAttribute("data-link"));
        buttons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");
        const newLink = this.getAttribute("data-link");
        mapFrame.src = newLink;
      });
    });
  } else {
    console.error("Erro: Botões ou Iframe não encontrados!");
  }
});

/* ==========================================================================
   4. COMPONENTES DE INTERFACE (BOTÕES, BALÕES, SCROLL)
   ========================================================================== */

function smoothScrollTo(targetId, duration = 1000) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const startPosition = window.pageYOffset;
  const targetPosition = target.offsetTop;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }
  requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    smoothScrollTo(targetId, 1000);
  });
});

const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

/* ==========================================================================
   5. OUTRAS FUNÇÕES E INICIALIZAÇÕES
   ========================================================================== */
