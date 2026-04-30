const playlist = ["audio/1.mp3", "audio/2.mp3", "audio/3.mp3", "audio/4.mp3", "audio/5.mp3"];

let currentIndex = 0;
const player = document.getElementById("player");
const progressBar = document.getElementById("progress-bar");
const playPauseBtn = document.getElementById("playPauseBtn");
const ball = document.getElementById("musicBall");
const playerContainer = document.getElementById("playerContainer");
const messageBalloon = document.getElementById("musicMessage");

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

// Atualiza barra de progresso
player.addEventListener("timeupdate", () => {
  const percent = (player.currentTime / player.duration) * 100;
  progressBar.style.width = percent + "%";
});

// Alterna ícone e animação da bolinha
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

    // Função de easing (easeInOutQuad)
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

// Aplica nos links da navbar
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1); // remove o "#"
    smoothScrollTo(targetId, 1000); // duração de 1 segundo
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

// 1. Seleção precisa dos elementos
const audio = document.querySelector('audio'); 
const bars = document.querySelectorAll('.bar');
let animationInterval = null; // Iniciamos como null para controle total

// 2. Função que gera o movimento
function moveBars() {
    bars.forEach(bar => {
        // Gera altura aleatória entre 8px e 80px conforme o novo tamanho que você pediu
        const randomHeight = Math.random() * (80 - 8) + 8;
        bar.style.height = `${randomHeight}px`;
        bar.style.opacity = randomHeight > 40 ? "1" : "0.6";
    });
}

// 3. Função para iniciar (Garante que não crie vários intervalos ao mesmo tempo)
function startVisualizer() {
    if (!animationInterval) { // Só inicia se não houver um rodando
        animationInterval = setInterval(moveBars, 120);
    }
}

// 4. Função para parar e resetar (Crucial para parar quando pausar)
function stopVisualizer() {
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null; // Limpa a variável
    }
    // Reseta todas as barras para o tamanho inicial (organização visual)
    bars.forEach(bar => {
        bar.style.height = '8px';
        bar.style.opacity = "0.6";
    });
}

// 5. Verificação de segurança e Listeners
if (audio) {
    audio.addEventListener('play', startVisualizer);
    audio.addEventListener('pause', stopVisualizer);
    audio.addEventListener('ended', stopVisualizer); // Para quando a música acabar
} else {
    console.error("Elemento de áudio não encontrado! Verifique a tag <audio> no seu HTML.");
}