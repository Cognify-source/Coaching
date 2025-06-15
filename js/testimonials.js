const slides   = document.querySelectorAll('.testimonial');
const prevBtn  = document.querySelector('.left-arrow');
const nextBtn  = document.querySelector('.right-arrow');

const displayTime    = 10000;  // 10s visningstid
const transitionTime = 600;    // 0.6s animation
let currentIndex = 0;
let autoTimer;

// Initiera slides
slides.forEach((slide, i) => {
  slide.style.transform  = 'translateX(0) translateY(-50%)';
  slide.style.opacity    = i === 0 ? '1' : '0';
  slide.style.display    = i === 0 ? 'block' : 'none';
  slide.style.transition = 'none';
});

// Visa slide med riktad in/ut-animation
function showSlide(nextIndex) {
  if (nextIndex === currentIndex) return;
  const outgoing = slides[currentIndex];
  const incoming = slides[nextIndex];

  // Utgående åt vänster
  outgoing.style.transition = `transform ${transitionTime}ms ease, opacity ${transitionTime}ms ease`;
  outgoing.style.transform  = 'translateX(-100%) translateY(-50%)';
  outgoing.style.opacity    = '0';

  // Förbered inkommande från höger
  incoming.style.transition = 'none';
  incoming.style.transform  = 'translateX(100%) translateY(-50%)';
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

  currentIndex = nextIndex;
}

function nextSlide() {
  showSlide((currentIndex + 1) % slides.length);
}
function prevSlide() {
  showSlide((currentIndex - 1 + slides.length) % slides.length);
}

// Automatisk loop
function startAuto() {
  autoTimer = setInterval(nextSlide, displayTime + transitionTime);
}
function stopAuto() {
  clearInterval(autoTimer);
}

// Event på pilar
prevBtn.addEventListener('click', () => { stopAuto(); prevSlide(); startAuto(); });
nextBtn.addEventListener('click', () => { stopAuto(); nextSlide(); startAuto(); });

// Starta slidern
startAuto();
