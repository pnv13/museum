const ARROW_UP = document.querySelector('.arrowUp');

window.addEventListener('scroll', () => {
  window.pageYOffset > 800
    ? ARROW_UP.classList.add('active')
    : ARROW_UP.classList.remove('active');
});
