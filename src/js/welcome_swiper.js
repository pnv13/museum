const CURRENT_SLIDE = document.querySelector('.welcome__current-slide');

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,

  pagination: {
    el: '.welcome__content-slider-control__pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.welcome__content-slider-control__arrow-right',
    prevEl: '.welcome__content-slider-control__arrow-left',
  },
});
swiper.on('slideChange', function () {
  CURRENT_SLIDE.innerHTML = '0' + (swiper.realIndex + 1);
});