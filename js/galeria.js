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
