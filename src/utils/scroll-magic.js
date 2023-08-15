import ScrollMagic from 'scrollmagic';
import { TweenLite, TimelineLite, gsap } from 'gsap';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';
import { isBrowser } from './browser-utils';

let controller = null;

const initScrollMagicController = () => {
  gsap.config({ nullTargetWarn: false });
  ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite);
  TweenLite.defaultOverwrite = false;
  if (isBrowser()) {
    controller = new ScrollMagic.Controller();
  }
};

const getScrollMagicController = () => (
  controller
);

export {
  getScrollMagicController,
  initScrollMagicController,
};
