$(document).ready(function () {
  $(".btn").on("click", function (event) {
    event.preventDefault(); // evita o salto direto

    // pega o destino do link
    var target = $(this).attr("href");

    // anima a rolagem até o destino
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top,
      },
      1000,
    ); // 1000ms = 1 segundo de transição
  });
  // Link Voltar ao topo
  $(".back-top").on("click", function (event) {
    event.preventDefault();
    var target = $(this).attr("href");
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top,
      },
      1000,
    );
  });
  // Mostrar/esconder botão conforme rolagem
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $("#backToTop").fadeIn();
    } else {
      $("#backToTop").fadeOut();
    }
  });

  // Clique no botão volta ao topo suavemente
  $("#backToTop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
  });

  // player de musica
// Lista de músicas
const tracks = [
  { src: "audio/1.mp3", title: "Faixa 1 - ArlonCafe" },
  { src: "audio/2.mp3", title: "Faixa 2 - ArlonCafe" }
];

let currentTrack = 0;

// Pega os elementos do HTML
const audio = document.getElementById("audio");
const trackInfo = document.getElementById("track-info");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

// Carrega uma música
function loadTrack(index) {
  audio.src = tracks[index].src;
  trackInfo.textContent = tracks[index].title;
  audio.play();
}

// Atualiza barra de progresso
audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    progress.max = audio.duration;
    progress.value = audio.currentTime;
  }
});

// Controle da barra
progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
});

// Controle de volume
const volumeIcon = document.getElementById("volume-icon");

volume.addEventListener("input", () => {
  audio.volume = volume.value;

  if (audio.volume === 0) {
    volumeIcon.className = "fa-solid fa-volume-xmark"; // 🔇
  } else if (audio.volume < 0.5) {
    volumeIcon.className = "fa-solid fa-volume-low";   // 🔉
  } else {
    volumeIcon.className = "fa-solid fa-volume-high";  // 🔊
  }
});

// Botões
function togglePlay() {
  const playBtn = document.getElementById("play");

  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'; // muda para pausa
  } else {
    audio.pause();
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>'; // volta para play
  }
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
}

// Liga os botões
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);

// Inicializa com a primeira música
loadTrack(currentTrack);
// Atualiza o botão para mostrar "pause" porque a música está tocando
document.getElementById("play").innerHTML = '<i class="fa-solid fa-pause"></i>';
});