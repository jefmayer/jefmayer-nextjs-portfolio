import breakpoints from '../../utils/breakpoints';
import { getBrowserWindowDims } from '../../utils/browser-utils';

export default class LoaderAsset {
  constructor(options) {
    this.element = options.element;
    this.id = options.id;
    this.isLoaded = options.isLoaded;
    this.loadStarted = options.loadStarted;
    this.preload = options.preload;
    this.onload = () => {};
    this.onerror = () => {};
  }

  getUrl() {
    const div = this.element;
    if (div === null) {
      return '';
    }
    const minWidth = breakpoints.find((item) => item.label === 'md').value;
    const src = div.getAttribute('data-src');
    const hiResSrc = div.getAttribute('data-hires-src');
    if (hiResSrc && getBrowserWindowDims().width > minWidth) {
      return hiResSrc;
    }
    return src;
  }

  initLoad() {
    const div = this.element;
    if (div === null) {
      return;
    }
    const img = document.createElement('img');
    const dataSection = div.getAttribute('data-section');
    const that = this;
    img.setAttribute('data-section', dataSection);
    img.src = this.getUrl();
    img.alt = div.getAttribute('data-alt');
    img.className = 'site-asset';
    img.decoding = 'async';
    img.fetchPriority = 'low';
    div.parentNode.appendChild(img);
    div.parentNode.removeChild(div);
    this.loadStarted = true;
    img.onload = () => {
      that.isLoaded = true;
      that.onload();
    }
    img.onerror = () => {
      console.log(`Image fialed ${img.src}`);
      that.onerror();
    }
  }
}
