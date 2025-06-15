// Hämta slidern och pilarna
const slideContainer = document.querySelector('.testimonial-slide');
const slides = Array.from(slideContainer.children);
const prevBtn = document.querySelector('.left-arrow');
const nextBtn = document.querySelector('.right-arrow');

let currentIndex = 0;
const slideCount = slides.length;
const displayTime = 10000;  // 10 sekunder i vila
const transitionTime = 600; // 0.6 sek för transform-övergången

// Flytta slidern till angiven index
function goToSlide(idx) {
  slideContainer.style.transform = `translateX(-${idx * 100}%)`;
  currentIndex = idx;
}

// Starta automatisk loop
let autoTimer;
function startAuto() {
  autoTimer = setInterval(() => {
    const nextIndex = (currentIndex + 1) % slideCount;
    goToSlide(nextIndex);
  }, displayTime + transitionTime);
}

// Stoppa automatisk loop
function stopAuto() {
  clearInterval(autoTimer);
}

// Manuella knappar
prevBtn.addEventListener('click', () => {
  stopAuto();
  const prevIndex = (currentIndex - 1 + slideCount) % slideCount;
  goToSlide(prevIndex);
  startAuto();
});
nextBtn.addEventListener('click', () => {
  stopAuto();
  const nextIndex = (currentIndex + 1) % slideCount;
  goToSlide(nextIndex);
  startAuto();
});

// Initiera slidern
goToSlide(0);
startAuto();
