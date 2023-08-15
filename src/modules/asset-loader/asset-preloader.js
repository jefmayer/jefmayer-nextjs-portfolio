import {
  disableScroll,
  enableScroll,
} from '../../utils/browser-scroll';
import {
  getActiveSectionId,
  getLoaderData,
  updateSectionData,
  updateLoaderData,
} from './loader-data';
import hiresAssetLoader from './hires-asset-loader';

const callbacks = {
  onLoadComplete: null,
  onLoadUpdate: null,
  onPreloadComplete: null,
  onPreloadUpdate: null,
};

const isSectionAssetLoadComplete = (data, id) => (
  data
    .find((section) => section.id === id)
    .assets.filter((asset) => !asset.isLoaded)
    .length === 0
);

// Add param to allow jumping the queue
const getNextAssetInQueue = () => {
  const data = getLoaderData();
  const { selectedSection, sections } = data;
  // If section specified, get that section's assets
  if (selectedSection !== '') {
    const nextAssetToLoad = sections.find((section) => section.id === selectedSection)
      .assets.find((asset) => !asset.isLoaded && !asset.loadStarted);
    // If there are still assets to load in that section, load,
    // otherwise return to load queue
    if (nextAssetToLoad) {
      return nextAssetToLoad;
    }
    // Reset selected section var
    updateLoaderData({ selectedSection: '' });
    enableScroll();
  }
  return sections
    .map((section) => section.assets)
    .reduce((a, b) => a.concat(b), [])
    .find((asset) => !asset.isLoaded && !asset.loadStarted);
};

const removeSectionEventHandlers = (assets) => {
  assets.forEach((asset) => {
    const { element } = asset;
    if (element) {
      element.removeEventListener('load', update); /* eslint-disable-line no-use-before-define */
    }
  });
};

const getAssetsLoaded = (data) => (
  data
    .map((section) => section.assets)
    .reduce((a, b) => a.concat(b), [])
    .filter((asset) => asset.isLoaded)
    .length
);

const getAssetsTotal = (data) => (
  data
    .map((section) => section.assets)
    .reduce((a, b) => a.concat(b), [])
    .length
);

const getPreloadAssetsLoaded = (data) => (
  data
    .map((section) => section.assets)
    .reduce((a, b) => a.concat(b), [])
    .filter((asset) => asset.preload && asset.isLoaded)
    .length
);

const getPreloadAssetsTotal = (data) => (
  data
    .map((section) => section.assets)
    .reduce((a, b) => a.concat(b), [])
    .filter((asset) => asset.preload)
    .length
);

const addHiResAssets = (data) => {
  const assetList = document.querySelectorAll('.site-asset');
  const hiResAsssets = [...assetList]
    .filter((asset) => asset.getAttribute('data-section') === data.id && asset.getAttribute('data-hires-src'))
    .map((element) => ({
      element,
      isLoaded: false,
    }));
  updateSectionData({
    id: data.id,
    hiResAsssets,
  });
};

const onLoadComplete = () => {
  updateLoaderData({ isLoadComplete: true });
  if (callbacks.onLoadComplete) {
    callbacks.onLoadComplete();
  }
};

const onPreloadComplete = () => {
  if (callbacks.onPreloadComplete) {
    callbacks.onPreloadComplete();
  }
};

const updateAssetPreloader = () => {
  const activeSection = getActiveSectionId();
  const data = getLoaderData();
  const { selectedSection } = data;
  if (!activeSection) {
    return;
  }
  if (
    (!activeSection.allPreloadAssetsLoaded && selectedSection === '')
    || (!activeSection.allPreloadAssetsLoaded && selectedSection === activeSection.id)
  ) {
    disableScroll();
  } else {
    enableScroll();
  }
};

const update = () => {
  const data = getLoaderData();
  const { sections } = data;
  const asset = getNextAssetInQueue();
  if (asset) {
    asset.loadImg(update);
  }
  const preloadAssetsLoaded = getPreloadAssetsLoaded(sections);
  const preloadAssetsTotal = getPreloadAssetsTotal(sections);
  const assetsLoaded = getAssetsLoaded(sections);
  const assetsTotal = getAssetsTotal(sections);
  // console.log(`${preloadAssetsLoaded} / ${preloadAssetsTotal}`);
  // console.log(`${assetsLoaded} / ${assetsTotal}`);
  // console.log(`${(assetsLoaded / assetsTotal) * 100}%`);
  const preloadPercLoaded = preloadAssetsLoaded / preloadAssetsTotal;
  const percLoaded = assetsLoaded / assetsTotal;
  if (callbacks.onPreloadUpdate) {
    callbacks.onPreloadUpdate(preloadPercLoaded);
  }
  if (callbacks.onLoadUpdate) {
    callbacks.onLoadUpdate(percLoaded);
  }
  // Check if all a section's image loads are complete
  sections.forEach((section, index) => {
    const isComplete = isSectionAssetLoadComplete(sections, section.id);
    if (isComplete && !section.allPreloadAssetsLoaded) {
      // console.log(`${section.id}, isComplete: ${isComplete}`);
      removeSectionEventHandlers(section.assets);
      updateSectionData({
        allPreloadAssetsLoaded: true,
        id: section.id,
      });
      addHiResAssets(section);
      // Start background load of hi-res image assets, if any
      hiresAssetLoader(section, () => {
        updateSectionData({
          allHiResAssetsLoaded: true,
          id: section.id,
        });
      });
      updateAssetPreloader();
      if (index === 0) {
        onPreloadComplete();
      }
    }
  });
  // Load is complete
  if (assetsLoaded === assetsTotal) {
    onLoadComplete();
  }
};

const initAssetPreloader = (options) => {
  callbacks.onLoadComplete = options.onLoadComplete;
  callbacks.onLoadUpdate = options.onLoadUpdate;
  callbacks.onPreloadComplete = options.onPreloadComplete;
  callbacks.onPreloadUpdate = options.onPreloadUpdate;
  // Multi-threaded loader
  update();
  update();
  update();
};

export {
  initAssetPreloader,
  updateAssetPreloader,
};
