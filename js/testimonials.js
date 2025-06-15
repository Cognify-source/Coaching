const slides = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.left-arrow');
const nextBtn = document.querySelector('.right-arrow');

const displayTime = 10000;   // 10 s visningstid
const transitionTime = 600;  // 0.6 s för animation
let currentIndex = 0;
let autoTimer;

// Förbered slides: placera absolut och visa bara första
slides.forEach((slide, i) => {
  slide.style.opacity = i === 0 ? '1' : '0';
  slide.style.display = i === 0 ? 'block' : 'none';
  slide.style.transform = 'translateX(0)';
});

// Visa slide n med riktad animation in/ut
function showSlide(nextIndex) {
  if (nextIndex === currentIndex) return;

  const outgoing = slides[currentIndex];
  const incoming = slides[nextIndex];

  // Animera utgående slide åt vänster
  outgoing.style.transition = `transform ${transitionTime}ms ease, opacity ${transitionTime}ms ease`;
  outgoing.style.transform = 'translateX(-100%)';
  outgoing.style.opacity = '0';

  // Förbered inkommande slide utanför högerkanten
  incoming.style.transition = 'none';
  incoming.style.transform = 'translateX(100%)';
  incoming.style.opacity = '1';
  incoming.style.display = 'block';

  // Tvinga reflow så att transition kan köras
  void incoming.offsetWidth;

  // Animera inkommande slide in mot mitten
  incoming.style.transition = `transform ${transitionTime}ms ease`;
  incoming.style.transform = 'translateX(0)';

  // Efter animation, göm utgående helt och återställ dess position
  setTimeout(() => {
    outgoing.style.display = 'none';
    outgoing.style.transform = 'translateX(0)';
    outgoing.style.transition = 'none';
  }, transitionTime);

  currentIndex = nextIndex;
}

// Nästa/prev helpers
function nextSlide() {
  showSlide((currentIndex + 1) % slides.length);
}
function prevSlide() {
  // Animera utgående åt höger, inkommande från vänster
  const outgoing = slides[currentIndex];
  const incomingIndex = (currentIndex - 1 + slides.length) % slides.length;
  const incoming = slides[incomingIndex];

  outgoing.style.transition = `transform ${transitionTime}ms ease, opacity ${transitionTime}ms ease`;
  outgoing.style.transform = 'translateX(100%)';
  outgoing.style.opacity = '0';

  incoming.style.transition = 'none';
  incoming.style.transform = 'translateX(-100%)';
  incoming.style.opacity = '1';
  incoming.style.display = 'block';

  void incoming.offsetWidth;

  incoming.style.transition = `transform ${transitionTime}ms ease`;
  incoming.style.transform = 'translateX(0)';

  setTimeout(() => {
    outgoing.style.display = 'none';
    outgoing.style.transform = 'translateX(0)';
    outgoing.style.transition = 'none';
  }, transitionTime);

  currentIndex = incomingIndex;
}

// Automatisk loop
function startAuto() {
  autoTimer = setInterval(nextSlide, displayTime + transitionTime);
}
function stopAuto() {
  clearInterval(autoTimer);
}

// Event listeners på pilar
prevBtn.addEventListener('click', () => {
  stopAuto();
  prevSlide();
  startAuto();
});
nextBtn.addEventListener('click', () => {
  stopAuto();
  nextSlide();
  startAuto();
});

// Starta allt
startAuto();
