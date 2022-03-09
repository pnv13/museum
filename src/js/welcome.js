const headerBurger = document.querySelector('.header__burger');
const headerBurgerExitBtn = document.querySelector('.header__burger-exitBtn');
const burgerMenu = document.querySelector('.welcome__section-burgerMenu');
const welcomeContent = document.querySelector('.welcome__content ');
const burgerLinks = document.querySelectorAll('.welcome__section-burgerMenu > ul > li > a');
const welcomeSlider = document.querySelector('.welcome__content-slider');

function openBurgerMenu() {
  if (document.body.clientWidth <= 1024 && document.body.clientWidth > 768) {
    headerBurger.classList.add('active');
    welcomeContent.classList.add('active');
    burgerMenu.classList.add('active');
    headerBurgerExitBtn.classList.add('active');
  } else if (document.body.clientWidth <= 768 && document.body.clientWidth > 420) {
    headerBurger.classList.add('active');
    welcomeContent.classList.add('active');
    burgerMenu.classList.add('active');
    headerBurgerExitBtn.classList.add('active');
    welcomeSlider.classList.add('active');
  } else if (document.body.clientWidth <= 420) {
    headerBurger.classList.add('active');
    welcomeContent.classList.add('active');
    burgerMenu.classList.add('active');
    headerBurgerExitBtn.classList.add('active');
    welcomeSlider.classList.add('active');
  }
}

function closeBurgerMenu() {
  headerBurgerExitBtn.classList.remove('active');
  burgerMenu.classList.remove('active');
  welcomeContent.classList.remove('active');
  headerBurger.classList.remove('active');
  welcomeSlider.classList.remove('active');
}

headerBurgerExitBtn.addEventListener('click', closeBurgerMenu);

burgerLinks.forEach(link => link.addEventListener('click', closeBurgerMenu));

window.addEventListener('click', e => {
  if (document.body.clientWidth <= 1024) {
    if (e.target === headerBurger) {
      openBurgerMenu();
    } else if (e.target === burgerMenu) {
      openBurgerMenu();
    } else {
      closeBurgerMenu();
    }
  }
});
window.addEventListener('resize', () => {
  if (document.body.clientWidth > 1024) {
    closeBurgerMenu();
  }
});