const imgAddresses = [
  'assets/img/galery1.webp',
  'assets/img/galery2.webp',
  'assets/img/galery3.webp',
  'assets/img/galery4.webp',
  'assets/img/galery5.webp',
  'assets/img/galery6.webp',
  'assets/img/galery7.webp',
  'assets/img/galery8.webp',
  'assets/img/galery9.webp',
  'assets/img/galery10.webp',
  'assets/img/galery11.webp',
  'assets/img/galery12.webp',
  'assets/img/galery13.webp',
  'assets/img/galery14.webp',
  'assets/img/galery15.webp',
];

const randomGallery = arr => {
  const pictureInnerContainer = document.querySelector('.gallery-picture-inner-container');
  arr = arr.sort(() => Math.random() - 0.5);
  arr.map(item => {
    const img = `<img src=${item} class="element-animation" alt="galleryIMG">`;
    pictureInnerContainer.innerHTML += img;
  });
};
randomGallery(imgAddresses);

const galleryImages = document.querySelectorAll('.element-animation');
let checker;

const options = { threshold: 0.1 };

function onEntry(entry) {
  entry.forEach(change => {
    if (window.pageYOffset > 5800) change.target.classList.add('active');
    if (change.isIntersecting) {
      change.target.classList.add('active');
    } else {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset + document.documentElement.clientHeight / 2 <= 3700) {
          change.target.classList.remove('active');
        }
      });
    }
  });
}

const galleryObserver = new IntersectionObserver(onEntry, options);
galleryImages.forEach(elem => galleryObserver.observe(elem));
