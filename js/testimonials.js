// Gör så att testimonials rullar mjukt när du scrollar
const container = document.querySelector('.testimonials-container');
container.addEventListener('wheel', (evt) => {
  evt.preventDefault();
  container.scrollLeft += evt.deltaY;
});
