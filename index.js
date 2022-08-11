import './style.css';
('use strict');

/* DOM practice */
// const message = document.createElement('div'); /* create dom */
// message.classList.add('cookie-message'); /* add class */
// message.textContent = 'we use cookie for improved'
// message.innerHTML =
//   'we use cookie for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it! </button>';
// const header = document.querySelector('header');
// header.prepend(message); /* add dom */
// header.append(message);
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove(); /* remvoe dom */
//   });
// style
// message.style.background = '#37383d';
// message.style.width = '120%';

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height =
// Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

///////////////////////////////////////

// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelectorAll('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//scroll to

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log('Current scroll (X/Y):', window.pageXOffset, pageYOffset);

  // console.log(
  //   'heig/width viewport:',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
  // scroll end
});

// Event Delegation Nav
/* document.querySelector('.nav__links').addEventListener('click', function (e) {
    console.log('e', e);
  }); */

// const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.hightlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.parentElement.children);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// [...h1.parentElement.children].forEach(function (el) {
//   console.log(el);

//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

/* tab Impliment */

tabsContainer.forEach((t) =>
  t.addEventListener('click', (e) => {
    const clicked = e.target.closest('.operations__tab');
    if (!clicked) return;
    tabs.forEach((t) => t.classList.remove('operations__tab--active'));
    tabsContent.forEach((t) =>
      t.classList.remove('operations__content--active')
    );
    clicked.classList.add('operations__tab--active');
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active');
  })
);

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;

    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

/*
 **  Intersection Observor
 **
 **
 */

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: [0, 0.2],
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

/*
 **  Reveal Elements on Scroll
 **
 **
 */

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.5,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

/*
 **  Lazy loading Images
 **
 **
 */

const imageTarget = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  observer.unobserve(entry.target);
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imageTarget.forEach(function (el) {
  imgObserver.observe(el);
});

/*
 **  Sliders Demo Impliment
 **
 **
 */

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let curSlide = 0;
const maxSlide = slides.length;
/* 
const slider = document.querySelector('.slider');
slider.style.transform = 'scale(0.4) translateX(-800px)';
slider.style.overflow = 'visible'; */

slides.forEach((s, i) => {
  s.style.transform = `translateX(${100 * i}%)`;
});

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

goToSlide(0);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) curSlide = 0;
  else curSlide++;
  goToSlide(curSlide);
};

const preSlide = function () {
  if (curSlide === 0) curSlide = maxSlide - 1;
  else curSlide--;
  goToSlide(curSlide);
};

btnLeft.addEventListener('click', preSlide);
btnRight.addEventListener('click', nextSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') preSlide();
  e.code === 'ArrowRight' && nextSlide();
});

/*
 **  dots Implement
 **
 **
 */
const dotContainer = document.querySelector('.dots');
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

// dot deligation

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
  }
});
