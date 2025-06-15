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

  // Förbered slides: första synlig, resten utanför till höger
  slides.forEach((slide, i) => {
    slide.style.position = 'absolute';
    slide.style.top      = '0';
    slide.style.left     = '0';
    slide.style.width    = '100%';
    slide.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    if (i === 0) {
      slide.style.transform = 'translateX(0)';
      slide.style.opacity   = '1';
    } else {
      slide.style.transform = 'translateX(100%)';
      slide.style.opacity   = '0';
    }
  });

  function showSlide(newIndex, direction = 'forward') {
    if (newIndex === current) return;
    const outgoing = slides[current];
    const incoming = slides[newIndex];

    // Placera incoming utanför vyn åt rätt håll
    incoming.style.transform = direction === 'forward'
      ? 'translateX(100%)'
      : 'translateX(-100%)';
    incoming.style.opacity = '1';

    // Tvinga fram stil-uppdatering innan animation
    incoming.getBoundingClientRect();

    // Animera in och ut
    incoming.style.transform = 'translateX(0)';
    outgoing.style.transform = direction === 'forward'
      ? 'translateX(-100%)'
      : 'translateX(100%)';
    outgoing.style.opacity = '0';

    current = newIndex;
  }

  function next() {
    const nextIndex = (current + 1) % slides.length;
    showSlide(nextIndex, 'forward');
  }

  function prev() {
    const prevIndex = (current - 1 + slides.length) % slides.length;
    showSlide(prevIndex, 'backward');
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

  // Starta auto­scroll
  interval = setInterval(next, 10000);
}
