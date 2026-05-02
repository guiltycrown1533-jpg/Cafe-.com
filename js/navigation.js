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