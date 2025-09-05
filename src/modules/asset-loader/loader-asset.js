import breakpoints from '../../utils/breakpoints';
import { getBrowserWindowDims } from '../../utils/browser-utils';

export default class LoaderAsset {
  constructor(options) {
    this.element = options.element;
    this.id = options.id;
    this.isLoaded = options.isLoaded;
    this.loadStarted = options.loadStarted;
    this.preload = options.preload;
  }

  loadImg(onComplete) {
    const div = this.element;
    if (div === null) {
      return;
    }
    const img = document.createElement('img');
    const dataSection = div.getAttribute('data-section');
    const src = div.getAttribute('data-src');
    const hiResSrc = div.getAttribute('data-hires-src');
    const minWidth = breakpoints.find((item) => item.label === 'md').value;
    const that = this;
    const onLoadComplete = () => {
      that.isLoaded = true;
      if (onComplete) {
        onComplete();
      }
      img.removeEventListener('load', onLoadComplete);
    };
    img.setAttribute('data-section', dataSection);
    if (hiResSrc && getBrowserWindowDims().width > minWidth) {
      img.src = hiResSrc;
    } else {
      img.src = src;
    }
    img.alt = div.getAttribute('data-alt');
    img.className = 'site-asset';
    div.parentNode.appendChild(img);
    div.parentNode.removeChild(div);
    this.loadStarted = true;
    img.addEventListener('load', onLoadComplete);
  }
}
