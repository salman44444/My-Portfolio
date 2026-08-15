const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const year = document.querySelector('#year');

year.textContent = new Date().getFullYear();

const syncHeader = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 16);
};

syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
  });
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((element) => element.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

  reveals.forEach((element) => observer.observe(element));
}

const imageTriggers = [...document.querySelectorAll('.image-open')];
const lightbox = document.querySelector('.image-lightbox');
const lightboxImage = lightbox.querySelector('.lightbox-image');
const lightboxCaption = lightbox.querySelector('#lightbox-caption');
const lightboxCount = lightbox.querySelector('.lightbox-count');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const lightboxPrevious = lightbox.querySelector('.lightbox-prev');
const lightboxNext = lightbox.querySelector('.lightbox-next');
let activeImage = 0;

const showLightboxImage = (index) => {
  activeImage = (index + imageTriggers.length) % imageTriggers.length;
  const trigger = imageTriggers[activeImage];
  const sourceImage = trigger.querySelector('img');
  lightboxImage.src = sourceImage.currentSrc || sourceImage.src;
  lightboxImage.alt = sourceImage.alt;
  lightboxCaption.textContent = trigger.dataset.lightboxCaption || sourceImage.alt;
  lightboxCount.textContent = `${String(activeImage + 1).padStart(2, '0')} / ${String(imageTriggers.length).padStart(2, '0')}`;
};

imageTriggers.forEach((trigger, index) => {
  trigger.addEventListener('click', () => {
    showLightboxImage(index);
    lightbox.showModal();
    document.documentElement.classList.add('lightbox-open');
  });
});

lightboxPrevious.addEventListener('click', () => showLightboxImage(activeImage - 1));
lightboxNext.addEventListener('click', () => showLightboxImage(activeImage + 1));
lightboxClose.addEventListener('click', () => lightbox.close());

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

lightbox.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') showLightboxImage(activeImage - 1);
  if (event.key === 'ArrowRight') showLightboxImage(activeImage + 1);
});

lightbox.addEventListener('close', () => {
  document.documentElement.classList.remove('lightbox-open');
  lightboxImage.removeAttribute('src');
});
