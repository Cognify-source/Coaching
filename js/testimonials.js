document.addEventListener('DOMContentLoaded', () => {
  const slideContainer = document.querySelector('.testimonial-slide');
  fetch('data/testimonials.html')
    .then(resp => resp.text())
    .then(html => {
      slideContainer.innerHTML = html;
      initTestimonialsSlider();
    })
    .catch(err => console.error('Error loading testimonials:', err));
});

function initTestimonialsSlider() {
  const slides = Array.from(document.querySelectorAll('.testimonial'));
  let current = 0;
  const leftBtn  = document.querySelector('.left-arrow');
  const rightBtn = document.querySelector('.right-arrow');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = (i === index ? '1' : '0');
      slide.style.transform = (i === index
        ? 'translateX(0)' 
        : (i < index ? 'translateX(-100%)' : 'translateX(100%)'));
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
