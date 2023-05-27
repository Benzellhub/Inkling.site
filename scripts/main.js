import '../styles/modern-normalize.css';
import '../styles/header.css';
import '../styles/footer.css';
import '../styles/util.css';

const slides = document.querySelectorAll('.slide');
const btns = document.querySelectorAll('.slider__btn');
let currentSlide = 1;

let manualNav = function (manual) {
  slides.forEach(slide => {
    slide.classList.remove('active');

    btns.forEach(btn => {
      btn.classList.remove('active');
    });
  });
  slides[manual].classList.add('active');
  btns[manual].classList.add('active');
};

btns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    manualNav(i);
    currentSlide = i;
  });
});

const repeat = function (acticeClass) {
  let active = document.getElementsByClassName('active');
  let i = 1;

  const repeater = () => {
    setTimeout(function () {
      [...active].forEach(activeSlide => {
        activeSlide.classList.remove('active');
      });

      slides[i].classList.add('active');
      btns[i].classList.add('active');
      i += 1;

      if (slides.length == i) {
        i = 0;
      }
      if (i >= slides.length) {
        return;
      }
      repeater();
    }, 5000);
  };
  repeater();
};
repeat();

const productContainers1 = document.querySelectorAll('.promo');
const nxtBtn1 = document.querySelectorAll('.bundle_nxt_btn');
const preBtn1 = document.querySelectorAll('.bundle_pre_btn');

productContainers1.forEach((item, i) => {
  let containerDimensions1 = item.getBoundingClientRect();
  let containerWidth1 = containerDimensions1.width;

  nxtBtn1[i].addEventListener('click', () => {
    item.scrollLeft += containerWidth1;
  });

  preBtn1[i].addEventListener('click', () => {
    item.scrollLeft -= containerWidth1;
  });
});

const cartPg = document.querySelector('.cart');
const headerBtn = document.querySelector('.menu__button');
const mobileNav = document.querySelector('.mobile__nav');
const mobileLinks = document.querySelectorAll('.mobile__link');
let isMobileNavOpen = false;

cartPg.addEventListener('click', () => {
  location.href = '../cart/index.html';
});

headerBtn.addEventListener('click', () => {
  isMobileNavOpen = !isMobileNavOpen;
  if (isMobileNavOpen) {
    mobileNav.style.display = 'flex';
    document.body.style.overflowY = 'hidden';
  } else {
    mobileNav.style.display = 'none';
    document.body.style.overflowY = 'auto';
  }
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    isMobileNavOpen = false;
    mobileNav.style.display = 'none';
    document.body.style.overflowY = 'auto';
  });
});

const backToTopButton = document.querySelector('#back-to-top-btn');

window.addEventListener('scroll', scrollFunction);

function scrollFunction() {
  if (window.pageYOffset > 300) {
    if (!backToTopButton.classList.contains('btnEntrance')) {
      backToTopButton.classList.remove('btnExit');
      backToTopButton.classList.add('btnEntrance');
      backToTopButton.style.display = 'block';
    }
  } else if (backToTopButton.classList.contains('btnEntrance')) {
    backToTopButton.classList.remove('btnEntrance');
    backToTopButton.classList.add('btnExit');
    setTimeout(function () {
      backToTopButton.style.display = 'none';
    }, 250);
  }
}

backToTopButton.addEventListener('click', smoothScrollBackToTop);

function smoothScrollBackToTop() {
  const targetPosition = 0;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 750;
  let start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(
      0,
      easeInOutCubic(progress, startPosition, distance, duration)
    );
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
}
