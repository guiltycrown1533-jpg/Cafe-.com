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

  /*player de musica */
  Amplitude.init({
    songs: [
      {
        name: "Minha Primeira Música",
        artist: "Artista Exemplo",
        url: "audio/1.mp3",
        cover_art_url: "img/capa2.jpg",
      },
      {
        name: "Segunda Faixa",
        artist: "Outro Artista",
        url: "audio/2.mp3",
        cover_art_url: "img/capa2.jpg",
      },
    ],
  });
});
