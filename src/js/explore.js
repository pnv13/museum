function initComparisons() {
  const OVERLAY = document.getElementsByClassName('img-comp-overlay');
  for (let i = 0; i < OVERLAY.length; i++) {
    compareImages(OVERLAY[i]);
  }
  function compareImages(img) {
    let slider,
      clicked = 0,
      w,
      h;
    w = img.offsetWidth;
    h = img.offsetHeight;
    img.style.width = w / 2 + 80 + 'px';
    slider = document.createElement('DIV');
    slider.setAttribute('class', 'explore-slider-scroll');
    img.parentElement.insertBefore(slider, img);
    slider.style.top = 0;
    slider.style.left = w / 2 + 80 - slider.offsetWidth / 2 + 'px';
    slider.addEventListener('mousedown', slideReady);
    window.addEventListener('mouseup', slideFinish);
    slider.addEventListener('touchstart', slideReady);
    window.addEventListener('touchstop', slideFinish);
    function slideReady(e) {
      e.preventDefault();
      clicked = 1;
      window.addEventListener('mousemove', slideMove);
      window.addEventListener('touchmove', slideMove);
    }
    function slideFinish() {
      clicked = 0;
    }
    function slideMove(e) {
      if (clicked == 0) return false;
      let pos = getCursorPos(e);
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      slide(pos);
    }
    function getCursorPos(e) {
      let a,
        x = 0;
      e = e || window.event;
      a = img.getBoundingClientRect();
      x = e.pageX - a.left;
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      img.style.width = x + 'px';
      slider.style.left = img.offsetWidth - slider.offsetWidth / 2 + 'px';
    }
  }
}
initComparisons();
