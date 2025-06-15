const slideContainer = document.querySelector('.testimonial-slide');
const slides = Array.from(slideContainer.children);
const prevBtn = document.querySelector('.left-arrow');
const nextBtn = document.querySelector('.right-arrow');

let currentIndex = 0;
const slideCount = slides.length;
const displayTime = 10000; // 10 s i mitten
const transitionTime = 600; // ms för övergång

// Flytta till given slide
function goToSlide(idx) {
  slideContainer.style.transform = `translateX(-${idx * 100}%)`;
  currentIndex = idx;
}

// Starta automatisk loop
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

// Initiering
goToSlide(0);
startAuto();
