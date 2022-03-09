const VIDEO = document.querySelector('.video__section_player-mainVideo');
const MAIN_BTN = document.querySelector('.video-section__main-btn');
const PANEL_PLAY_BTN = document.querySelector('.panel-playBtn');
const PANEL_VIDEO_PROGRESS = document.querySelector('.video__section_player-panel_video-length');

const swiper = new Swiper('.swiperVideo', {
  direction: 'horizontal',
  slidesPerView: 3,
  spaceBetween: 42,
  loop: true,

  pagination: {
    el: '.video__section_video-slider-pagination-point',
    clickable: true,
  },

  navigation: {
    nextEl: '.video__section_video-slider-pagination_arrowRight',
    prevEl: '.video__section_video-slider-pagination_arrowLeft',
  },
});
swiper.on('slideChange', function () {
  VIDEO.src = `assets/video/video${swiper.realIndex}.mp4`;
  VIDEO.poster = `assets/img/videoPoster${swiper.realIndex}.webp`;
  PANEL_VIDEO_PROGRESS.style.background = `linear-gradient(to right, #710707 0%, #710707 0%, #C4C4C4 0%, #C4C4C4 100%)`;
  MAIN_BTN.classList.remove('active');
  PANEL_PLAY_BTN.firstElementChild.classList.value = 'fas fa-play';
});
