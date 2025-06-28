document.addEventListener('DOMContentLoaded', () => {
  const slideContainer = document.querySelector('.testimonial-slide');
  // Uppdaterad sökväg så den hämtar filen i roten, inte "/data"
  fetch('testimonials.html')
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
  let current = 0, interval;

  // Placera första slide synlig, övriga utanför till höger
  slides.forEach((slide, i) => {
    Object.assign(slide.style, {
      position:   'absolute',
      top:        '5%',
      left:       '0',
      width:      '100%',
      transition: 'transform 0.5s ease, opacity 0.5s ease',
      transform:  i === 0 ? 'translateX(0)' : 'translateX(100%)',
      opacity:    i === 0 ? '1' : '0'
    });
  });

  function showForward(nextIndex) {
    if (nextIndex === current) return;
    const outgoing = slides[current], incoming = slides[nextIndex];
    incoming.style.transition = 'none';
    incoming.style.transform  = 'translateX(100%)';
    incoming.style.opacity    = '1';
    incoming.offsetHeight; // tvinga reflow

    incoming.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    incoming.style.transform  = 'translateX(0)';
    outgoing.style.transform  = 'translateX(-100%)';
    outgoing.style.opacity    = '0';

    setTimeout(() => {
      Object.assign(outgoing.style, {
        transition: 'none',
        transform:  'translateX(100%)',
        opacity:    '0'
      });
      outgoing.offsetHeight;
      outgoing.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    }, 500);

    current = nextIndex;
  }

  function showBackward(prevIndex) {
    if (prevIndex === current) return;
    const outgoing = slides[current], incoming = slides[prevIndex];
    incoming.style.transition = 'none';
    incoming.style.transform  = 'translateX(-100%)';
    incoming.style.opacity    = '1';
    incoming.offsetHeight;

    incoming.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    incoming.style.transform  = 'translateX(0)';
    outgoing.style.transform  = 'translateX(100%)';
    outgoing.style.opacity    = '0';

    setTimeout(() => {
      Object.assign(outgoing.style, {
        transition: 'none',
        transform:  'translateX(-100%)',
        opacity:    '0'
      });
      outgoing.offsetHeight;
      outgoing.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    }, 500);

    current = prevIndex;
  }

  function next() { showForward((current + 1) % slides.length); }
  function prev() { showBackward((current - 1 + slides.length) % slides.length); }

  leftBtn.addEventListener('click', () => {
    clearInterval(interval); prev(); interval = setInterval(next, 10000);
  });
  rightBtn.addEventListener('click', () => {
    clearInterval(interval); next(); interval = setInterval(next, 10000);
  });

  interval = setInterval(next, 10000);
}
