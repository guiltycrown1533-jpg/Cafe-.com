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
