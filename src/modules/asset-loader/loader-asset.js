import breakpoints from '../../utils/breakpoints';
import { isBrowser } from '../../utils/browser-utils';

export default class LoaderAsset {
  constructor(options) {
    this.element = options.element;
    this.id = options.id;
    this.isLoaded = options.isLoaded;
    this.loadStarted = options.loadStarted;
    this.preload = options.preload;
  }

  getBreakpointLabel() {
    if (!isBrowser()) {
      return '';
    }
    const { innerWidth } = window;
    const div = this.element;
    let attrLabel = 'data-src';
    if (!div) {
      return attrLabel;
    } 
    // Only those breakpoints under the window width
    const arr = breakpoints.filter((item) => item.value <= innerWidth);
    arr.reverse();
    // Then starting w/ the widest width, see what attributes that image has
    arr.forEach((item) => {
      const { label } = item;
      if (div.getAttribute(`data-${label}-src`) !== null && attrLabel === 'data-src') {
        attrLabel = `data-${label}-src`;
      }
    });
    return attrLabel;
  }

  loadImg(onComplete) {
    const div = this.element;
    // console.log(this.id);
    if (!div) {
      this.isLoaded = true;
      if (onComplete) {
        onComplete();
      } else {
        onLoadComplete();
      }
      return;
    }
    const img = document.createElement('img');
    const srcAttr = this.getBreakpointLabel();
    const dataSection = div.getAttribute('data-section');
    const hiResSrc = div.getAttribute('data-hires-src');
    const that = this;
    const onLoadComplete = () => {
      that.isLoaded = true;
      if (onComplete) {
        onComplete();
      }
      img.removeEventListener('load', onLoadComplete);
    };
    if (hiResSrc !== null) {
      img.setAttribute('data-hires-src', hiResSrc);
    }
    img.setAttribute('data-section', dataSection);
    img.src = div.getAttribute(srcAttr);
    img.alt = div.getAttribute('data-alt');
    img.className = 'site-asset';
    div.parentNode.appendChild(img);
    div.parentNode.removeChild(div);
    // Load image
    this.loadStarted = true;
    img.addEventListener('load', onLoadComplete);
  }
}
