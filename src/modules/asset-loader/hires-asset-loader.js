import { getSectionById, updateSectionData } from './loader-data';
import breakpoints from '../../utils/breakpoints';
import { isBrowser } from '../../utils/browser-utils';

const getNextAssetInQueue = (data) => (
  data.find((asset) => !asset.isLoaded)
);

const getAssetsLoaded = (data) => (
  data
    .filter((asset) => asset.isLoaded)
    .length
);

const hiresAssetLoader = (data, onComplete) => {
  const sectionId = data.id;
  const assetCt = data.hiResAsssets.length;
  if (assetCt === 0 || !isBrowser()) {
    onComplete();
    return;
  }
  const { innerWidth } = window;
  const minWidth = breakpoints.find((item) => item.label === 'md');
  if (innerWidth < minWidth.value) {
    return;
  }

  const update = () => {
    const section = getSectionById(sectionId);
    const { hiResAsssets } = section;
    if (getAssetsLoaded(hiResAsssets) === hiResAsssets.length) {
      onComplete();
      return;
    }
    const asset = getNextAssetInQueue(hiResAsssets);
    const img = asset.element;
    img.src = img.getAttribute('data-hires-src');
    img.addEventListener('load', () => {
      asset.isLoaded = true;
      updateSectionData({
        id: sectionId,
        hiResAsssets,
      });
      update();
    });
  };

  update();
};

export default hiresAssetLoader;
