const PLAYER = document.querySelector('.video__section_player');
const VIDEO = document.querySelector('.video__section_player-mainVideo');
const MAIN_BTN = document.querySelector('.video-section__main-btn');
const PANEL_PLAY_BTN = document.querySelector('.panel-playBtn');
const PANEL_AUDIO_BTN = document.querySelector('.panel-audioBtn');
const PANEL_FULLSCREEN_BTN = document.querySelector('.panel-fullscreenBtn');
const PANEL_VIDEO_PROGRESS = document.querySelector('.video__section_player-panel_video-length');
const PANEL_AUDIO_PROGRESS = document.querySelector('.video__section_player-panel_sound');
const VIDEO_SPEED = document.querySelector('.video-section__video-speed');

let mouseMove = false;
VIDEO.volume = 0.5;
let stack = [];

function playVideo() {
  if (VIDEO.paused) {
    VIDEO.play();
    MAIN_BTN.classList.add('active');
    PANEL_PLAY_BTN.firstElementChild.classList.value = 'fas fa-pause';
  } else {
    VIDEO.pause();
    MAIN_BTN.classList.remove('active');
    PANEL_PLAY_BTN.firstElementChild.classList.value = 'fas fa-play';
  }
}

function videoTimeUpdate() {
  const PERCENTAGE = (VIDEO.currentTime / VIDEO.duration) * 100;
  PANEL_VIDEO_PROGRESS.style.background = `linear-gradient(to right, #710707 0%, #710707 ${PERCENTAGE}%, #C4C4C4 ${PERCENTAGE}%, #C4C4C4 100%)`;
  if (PERCENTAGE === 100) {
    PANEL_PLAY_BTN.firstElementChild.classList.value = 'fas fa-play';
    MAIN_BTN.classList.remove('active');
  }
  if (VIDEO.currentTime > 0) {
    PANEL_VIDEO_PROGRESS.value = PERCENTAGE;
  } else {
    PANEL_VIDEO_PROGRESS.value = 0;
  }
}

function videoScrollEvent(e) {
  const VALUE = Math.round(+PANEL_VIDEO_PROGRESS.value);
  const CURRENT_TIME = (e.offsetX / PANEL_VIDEO_PROGRESS.offsetWidth) * VIDEO.duration;
  PANEL_VIDEO_PROGRESS.style.background = `linear-gradient(to right, #710707 0%, #710707 ${VALUE}%, #C4C4C4 ${VALUE}%, #C4C4C4 100%)`;
  VIDEO.currentTime = CURRENT_TIME;
}

function audioPrevState() {
  const VALUE = Math.floor(+stack[1] * 100);
  VIDEO.volume = +stack[1];
  PANEL_AUDIO_PROGRESS.value = +stack[1];
  PANEL_AUDIO_PROGRESS.style.background = `linear-gradient(to right, #710707 0%, #710707 ${VALUE}%, #C4C4C4 ${VALUE}%, #C4C4C4 100%)`;
}

function clickAudioBtn() {
  stack.push(VIDEO.volume);
  stack.push(PANEL_AUDIO_PROGRESS.value);
  if (VIDEO.volume > 0) {
    PANEL_AUDIO_BTN.firstElementChild.classList.value = 'fas fa-volume-mute';
    VIDEO.volume = 0;
    PANEL_AUDIO_PROGRESS.value = 0;
    PANEL_AUDIO_PROGRESS.style.background = `linear-gradient(to right, #710707 0%, #710707 0%, #C4C4C4 0%, #C4C4C4 100%)`;
  } else if (+stack[1] >= 0.5 && VIDEO.volume === 0) {
    PANEL_AUDIO_BTN.firstElementChild.classList.value = 'fas fa-volume-up';
    audioPrevState();
  } else if (+stack[1] < 0.5 && +stack[1] > 0) {
    PANEL_AUDIO_BTN.firstElementChild.classList.value = 'fas fa-volume-down';
    audioPrevState();
  }
}

function audioScrollEvent(e) {
  if (e === 'ArrowUp') PANEL_AUDIO_PROGRESS.value = +PANEL_AUDIO_PROGRESS.value + 0.03;
  if (e === 'ArrowDown') PANEL_AUDIO_PROGRESS.value = +PANEL_AUDIO_PROGRESS.value - 0.03;
  const VALUE = Math.floor(+PANEL_AUDIO_PROGRESS.value * 100);
  PANEL_AUDIO_PROGRESS.style.background = `linear-gradient(to right, #710707 0%, #710707 ${VALUE}%, #C4C4C4 ${VALUE}%, #C4C4C4 100%)`;
  VIDEO.volume = +PANEL_AUDIO_PROGRESS.value;
  stack[1] = VIDEO.volume;
  VALUE >= 50
    ? (PANEL_AUDIO_BTN.firstElementChild.classList.value = 'fas fa-volume-up')
    : (PANEL_AUDIO_BTN.firstElementChild.classList.value = 'fas fa-volume-down');
  if (VALUE === 0) PANEL_AUDIO_BTN.firstElementChild.classList.value = 'fas fa-volume-mute';
}

function toggleScreen() {
  console.log(PANEL_FULLSCREEN_BTN.firstElementChild);
  if (document.fullscreenElement === null) {
    PLAYER.requestFullscreen();
    VIDEO.classList.add('active');
    PANEL_FULLSCREEN_BTN.firstElementChild.classList.value = 'fas fa-compress';
  } else {
    document.exitFullscreen();
    VIDEO.classList.remove('active');
    PANEL_FULLSCREEN_BTN.firstElementChild.classList.value = 'fas fa-expand';
  }
}

function showVideoSpeed() {
  VIDEO_SPEED.classList.add('active');
  VIDEO_SPEED.innerHTML = VIDEO.playbackRate + 'x';
  setTimeout(() => {
    VIDEO_SPEED.classList.remove('active');
  }, 500);
}

function activeButtons(e) {
  if (e.code === 'Space') {
    e.preventDefault();
    playVideo();
  }
  if (e.code === 'KeyM') {
    e.preventDefault();
    clickAudioBtn();
  }
  if (e.code === 'KeyF') {
    e.preventDefault();
    toggleScreen();
  }
  if (e.code === 'ArrowRight') VIDEO.currentTime += 5;
  if (e.code === 'ArrowLeft') VIDEO.currentTime -= 5;
  if (e.code === 'ArrowUp') {
    e.preventDefault();
    audioScrollEvent(e.code);
  }
  if (e.code === 'ArrowDown') {
    e.preventDefault();
    audioScrollEvent(e.code);
  }
  if (e.shiftKey && e.code === 'Comma') {
    e.preventDefault();
    VIDEO.playbackRate > 0.25 ? (VIDEO.playbackRate -= 0.25) : VIDEO.playbackRate;
    showVideoSpeed();
  }
  if (e.shiftKey && e.code === 'Period') {
    e.preventDefault();
    VIDEO.playbackRate < 2 ? (VIDEO.playbackRate += 0.25) : VIDEO.playbackRate;
    showVideoSpeed();
  }
}

VIDEO.addEventListener('click', playVideo);
VIDEO.addEventListener('timeupdate', videoTimeUpdate);
MAIN_BTN.addEventListener('click', playVideo);

PANEL_PLAY_BTN.addEventListener('click', playVideo);

PANEL_VIDEO_PROGRESS.addEventListener('click', videoScrollEvent);
PANEL_VIDEO_PROGRESS.addEventListener('mousemove', e => mouseMove && videoScrollEvent(e));
PANEL_VIDEO_PROGRESS.addEventListener('mousedown', () => (mouseMove = true));
PANEL_VIDEO_PROGRESS.addEventListener('mouseup', () => (mouseMove = false));

PANEL_AUDIO_BTN.addEventListener('click', clickAudioBtn);
PANEL_AUDIO_PROGRESS.addEventListener('input', audioScrollEvent);

PANEL_FULLSCREEN_BTN.addEventListener('click', toggleScreen);
VIDEO.addEventListener('dblclick', toggleScreen);

document.addEventListener('keydown', e => activeButtons(e));
