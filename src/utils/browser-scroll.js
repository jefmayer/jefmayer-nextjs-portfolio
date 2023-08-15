import { isBrowser } from './browser-utils';

const disableScroll = () => {
  const html = document.querySelector('html');
  const sectionLoader = document.querySelector('.section-loader-animation');
  html.classList.add('noscroll');
  sectionLoader.classList.add('animate-in');
  setTimeout(() => {
    sectionLoader.classList.add('animate-loop');
  }, 300);
};

const enableScroll = () => {
  const html = document.querySelector('html');
  const sectionLoader = document.querySelector('.section-loader-animation');
  html.classList.remove('noscroll');
  sectionLoader.classList.remove('animate-in');
  sectionLoader.classList.remove('animate-loop');
};

const getSceneOffsetPos = (sceneName) => {
  if (isBrowser()) {
    return document.querySelector(`.project-details-${sceneName}`).offsetTop - (window.innerHeight - document.querySelector(`.project-details-${sceneName}`).offsetHeight);
  }
  return 0;
};

const scrollToPosition = (pos) => {
  if (isBrowser()) {
    window.scrollTo({
      top: pos,
      behavior: 'smooth',
    });
  }
};

let observer = null;

const getScrollObserver = () => (
  observer
);

const initScrollObserver = (options) => {
  const { onUpdate } = options;
  const observerOptions = { threshold: 0.5 };
  const observerHandler = (entries) => {
    entries.forEach((entry) => {
      if (onUpdate) {
        const { target } = entry;
        const { className } = target;
        onUpdate(className, entry.isIntersecting);
      }
    });
  };
  if (isBrowser()) {
    observer = new IntersectionObserver(observerHandler, observerOptions);
  }
};

export {
  disableScroll,
  enableScroll,
  getSceneOffsetPos,
  getScrollObserver,
  initScrollObserver,
  scrollToPosition,
};
