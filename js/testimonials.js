// js/testimonials.js
document.addEventListener('DOMContentLoaded', () => {
  const slideContainer = document.querySelector('.testimonial-slide');
  fetch('/data/testimonials.html')
    .then(resp => {
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      return resp.text();
    })
    .then(html => {
      slideContainer.innerHTML = html;
      initTestimonialsSlider();
    })
    .catch(err => console.error('Error loading testimonials:', err));
});

function initTestimonialsSlider() {
  const slides   = Array.from(document.querySelectorAll('.testimonial'));
  const leftBtn  = document.querySelector('.left-arrow');
  const rightBtn = document.querySelector('.right-arrow');
  let current = 0;
  let interval;

  // Grund-setup: första slide synlig, övriga placerade utanför till höger
  slides.forEach((slide, i) => {
    Object.assign(slide.style, {
      position:   'absolute',
      top:        '0',
      left:       '0',
      width:      '100%',
      transition: 'transform 0.5s ease, opacity 0.5s ease',
      transform:  i === 0 ? 'translateX(0)' : 'translateX(100%)',
      opacity:    i === 0 ? '1' : '0'
    });
  });

  function showForward(nextIndex) {
    if (nextIndex === current) return;
    const outgoing = slides[current];
    const incoming = slides[nextIndex];

    // 1) Placera incoming direkt utanför vyn till höger (utan transition)
    incoming.style.transition = 'none';
    incoming.style.transform  = 'translateX(100%)';
    incoming.style.opacity    = '1';

    // 2) Tvinga reflow
    incoming.offsetHeight;

    // 3) Återställ transition och animera in/ut
    incoming.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    incoming.style.transform  = 'translateX(0)';
    outgoing.style.transform  = 'translateX(-100%)';
    outgoing.style.opacity    = '0';

    // 4) Efter animationen, reset outgoing till 100% igen så den är redo nästa gång
    setTimeout(() => {
      outgoing.style.transition = 'none';
      outgoing.style.transform  = 'translateX(100%)';
      outgoing.style.opacity    = '0';
      // reflow och återställ transition
      outgoing.offsetHeight;
      outgoing.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    }, 500);

    current = nextIndex;
  }

  function showBackward(prevIndex) {
    if (prevIndex === current) return;
    const outgoing = slides[current];
    const incoming = slides[prevIndex];

    incoming.style.transition = 'none';
    incoming.style.transform  = 'translateX(-100%)';
    incoming.style.opacity    = '1';
    incoming.offsetHeight;
    incoming.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    incoming.style.transform  = 'translateX(0)';
    outgoing.style.transform  = 'translateX(100%)';
    outgoing.style.opacity    = '0';

    setTimeout(() => {
      outgoing.style.transition = 'none';
      outgoing.style.transform  = 'translateX(-100%)';
      outgoing.style.opacity    = '0';
      outgoing.offsetHeight;
      outgoing.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    }, 500);

    current = prevIndex;
  }

  function next() {
    const nextIndex = (current + 1) % slides.length;
    showForward(nextIndex);
  }

  function prev() {
    const prevIndex = (current - 1 + slides.length) % slides.length;
    showBackward(prevIndex);
  }

  leftBtn.addEventListener('click', () => {
    clearInterval(interval);
    prev();
    interval = setInterval(next, 10000);
  });
  rightBtn.addEventListener('click', () => {
    clearInterval(interval);
    next();
    interval = setInterval(next, 10000);
  });

  // Starta auto-scroll framåt
  interval = setInterval(next, 10000);
}
