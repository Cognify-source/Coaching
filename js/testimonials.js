document.addEventListener('DOMContentLoaded', () => {
  const slideContainer = document.querySelector('.testimonial-slide');
  if (!slideContainer) {
    console.error('testimonial-slide container hittades inte!');
    return;
  }

  fetch('./data/testimonials.html')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Kunne inte hämta testimonials.html – status ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      console.log('Testimonials HTML inläst:', html);
      slideContainer.innerHTML = html;
      initTestimonialsSlider();
    })
    .catch(err => {
      console.error('Fel vid inläsning av testimonials:', err);
    });
});

function initTestimonialsSlider() {
  const slides = Array.from(document.querySelectorAll('.testimonial'));
  if (slides.length === 0) {
    console.warn('Inga .testimonial-element att visa!');
    return;
  }

  let current = 0;
  const leftBtn  = document.querySelector('.left-arrow');
  const rightBtn = document.querySelector('.right-arrow');

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.style.opacity   = i === idx ? '1' : '0';
      slide.style.transform = i === idx
        ? 'translateX(0)'
        : (i < idx ? 'translateX(-100%)' : 'translateX(100%)');
    });
  }

  showSlide(current);
  let interval = setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 10000);

  function restartAuto() {
    clearInterval(interval);
    interval = setInterval(() => {
      current = (current + 1) % slides.length;
      showSlide(current);
    }, 10000);
  }

  leftBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
    restartAuto();
  });

  rightBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
    restartAuto();
  });
}
