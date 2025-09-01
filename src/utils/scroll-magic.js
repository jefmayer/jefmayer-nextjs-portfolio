// import ScrollMagic from 'scrollmagic';
import { TweenLite, TimelineLite, gsap } from 'gsap';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';
import { isBrowser } from './browser-utils';

let controller = null;

const initScrollMagicController = () => {
  gsap.config({ nullTargetWarn: false });
  if (typeof window === 'undefined') return;
    (async () => {
      const mod = await import('scrollmagic');
      const ScrollMagic = mod.default ?? mod;
      gsap.config({ nullTargetWarn: false });
      ScrollMagicPluginGsap(ScrollMagic, TweenLite, TimelineLite);
      TweenLite.defaultOverwrite = false;
      controller = new ScrollMagic.Controller();
    })();
  
};

const getScrollMagicController = () => (
  controller
);

export {
  getScrollMagicController,
  initScrollMagicController,
};
