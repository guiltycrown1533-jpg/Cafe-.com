const audio = document.querySelector('audio'); 
const bars = document.querySelectorAll('.bar');
let animationInterval = null;

function moveBars() {
    bars.forEach(bar => {
        const randomHeight = Math.random() * (80 - 8) + 8;
        bar.style.height = `${randomHeight}px`;
        bar.style.opacity = randomHeight > 40 ? "1" : "0.6";
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
    bars.forEach(bar => {
        bar.style.height = '8px';
        bar.style.opacity = "0.6";
    });
}

if (audio) {
    audio.addEventListener('play', startVisualizer);
    audio.addEventListener('pause', stopVisualizer);
    audio.addEventListener('ended', stopVisualizer);
}