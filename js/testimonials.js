const slides   = document.querySelectorAll('.testimonial');
const prevBtn  = document.querySelector('.left-arrow');
const nextBtn  = document.querySelector('.right-arrow');

const displayTime    = 10000;  // 10 s visningstid
const transitionTime = 600;    // 0.6 s animation
let currentIndex = 0;
let autoTimer;

// Initiera slides: visa bara första, placera dem vertikalt centrerade
slides.forEach((slide, i) => {
  slide.style.transform    = i === 0
    ? 'translateX(0) translateY(-50%)'
    : 'translateX(0) translateY(-50%)';
  slide.style.opacity      = i === 0 ? '1' : '0';
  slide.style.display      = i === 0 ? 'block' : 'none';
  slide.style.transition   = 'none';
});

// Riktad visningsfunktion
function showSlide(nextIndex) {
  if (nextIndex === currentIndex) return;

  const outgoing = slides[currentIndex];
  const incoming = slides[nextIndex];

  // Animera utgående åt vänster, behåll Y-centrering
  outgoing.style.transition = `transform ${transitionTime}ms ease, opacity ${transitionTime}ms ease`;
  outgoing.style.transform  = 'translateX(-100%) translateY(-50%)';
  outgoing.style.opacity    = '0';

  // Förbered inkommande utanför höger, också vertikalt centrerad
  incoming.style.transition = 'none';
  incoming.style.transform  = 'translateX(100%) translateY(-50%)';
  incoming.style.opacity    = '1';
  incoming.style.display    = 'block';

  // Tvinga reflow
  void incoming.offsetWidth;

  // Animera in mot mitten
  incoming.style.transition = `transform ${transitionTime}ms ease`;
  incoming.style.transform  = 'translateX(0) translateY(-50%)';

  // Efter animation: göm utgående och återställ dess position
  setTimeout(() => {
    outgoing.style.display    = 'none';
    outgoing.style.transform  = 'translateX(0) translateY(-50%)';
    outgoing.style.transition = 'none';
  }, transitionTime);

  currentIndex = nextIndex;
}

// Navigeringshjälpare
function nextSlide() {
  showSlide((currentIndex + 1) % slides.length);
}
function prevSlide() {
  // Animera utgående åt höger och inkommande från vänster
  const outgoing      = slides[currentIndex];
  const incomingIndex = (currentIndex - 1 + slides.length) % slides.length;
  const incoming      = slides[incomingIndex];

  outgoing.style.transition = `transform ${transitionTime}ms ease, opacity ${transitionTime}ms ease`;
  outgoing.style.transform  = 'translateX(100%) translateY(-50%)';
  outgoing.style.opacity    = '0';

  incoming.style.transition = 'none';
  incoming.style.transform  = 'translateX(-100%) translateY(-50%)';
  incoming.style.opacity    = '1';
  incoming.style.display    = 'block';

  void incoming.offsetWidth;

  incoming.style.transition = `transform ${transitionTime}ms ease`;
  incoming.style.transform  = 'translateX(0) translateY(-50%)';

  setTimeout(() => {
    outgoing.style.display    = 'none';
    outgoing.style.transform  = 'translateX(0) translateY(-50%)';
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

// Pilar
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

// Starta
startAuto();
