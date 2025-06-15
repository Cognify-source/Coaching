const slideContainer = document.querySelector('.testimonial-slide');
const slides = Array.from(slideContainer.children);
const prevBtn = document.querySelector('.left-arrow');
const nextBtn = document.querySelector('.right-arrow');

let currentIndex = 0;
const slideCount = slides.length;
const displayTime = 10000;  // 10 sekunder i vila
const transitionTime = 600; // 0.6 sek för själva övergången

// Flytta till vald slide
function goToSlide(idx) {
  slideContainer.style.transition = `transform ${transitionTime}ms ease`;
  slideContainer.style.transform = `translateX(-${idx * 100}%)`;
  currentIndex = idx;
}

// Automatisk loop
let autoTimer;
function startAuto() {
  autoTimer = setInterval(() => {
    let nextIndex = (currentIndex + 1) % slideCount;
    goToSlide(nextIndex);
  }, displayTime + transitionTime);
}
function stopAuto() {
  clearInterval(autoTimer);
}

// Manuell navigering
prevBtn.addEventListener('click', () => {
  stopAuto();
  let prevIndex = (currentIndex - 1 + slideCount) % slideCount;
  goToSlide(prevIndex);
  startAuto();
});
nextBtn.addEventListener('click', () => {
  stopAuto();
  let nextIndex = (currentIndex + 1) % slideCount;
  goToSlide(nextIndex);
  startAuto();
});

// Initiera
goToSlide(0);
startAuto();
