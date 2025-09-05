import {
  getLoaderData,
  updateSectionData,
  updateLoaderData,
} from './loader-data';

const callbacks = {
  onLoadComplete: null,
  onLoadUpdate: null,
  onPreloadComplete: null,
  onPreloadUpdate: null,
};

const preloadAssetData = [];
const mainAssetData = [];

const isSectionAssetLoadComplete = (data, id) => (
  data
    .find((section) => section.id === id)
    .assets.filter((asset) => !asset.isLoaded)
    .length === 0
);

const getNextAssetInQueue = () => {
  let asset = preloadAssetData.find((asset) => !asset.isLoaded && !asset.loadStarted);
  if (asset) {
    return asset;
  }
  asset = mainAssetData.find((asset) => !asset.isLoaded && !asset.loadStarted);
  if (asset) {
    return asset;
  }
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
  preloadAssetData.push(...options.preloadAssetData);
  mainAssetData.push(...options.mainAssetData);
  console.log(preloadAssetData);
  console.log(mainAssetData);
  // Simulated multi-threaded loader
  update();
  update();
  update();
};

export {
  initAssetPreloader,
};
