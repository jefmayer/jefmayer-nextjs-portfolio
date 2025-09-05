import LoaderAsset from './loader-asset';
import getSectionComponentMap from '../../components/sections/section-manifest';

let siteData = [];

const initLoaderData = (data) => {
  // Remove section's data if not in manifest
  const sections = data.filter(section => (
    getSectionComponentMap().find(item => item.id === section.id)
  ));
  siteData = sections.map((section) => (
    section.assets.map((element) => new LoaderAsset({
      element: document.querySelector(`.${element.id} .add-site-img`),
      isLoaded: false,
      loadStarted: false,
      preload: element.preload,
    }))
  ))
  .reduce((a, b) => a.concat(b), []);
};

const getPreloadAssetData = () => (
  siteData.filter((asset) => asset.preload)
);

const getMainAssetData = () => (
  siteData.filter((asset) => !asset.preload)
);

export {
  getMainAssetData,
  getPreloadAssetData,
  initLoaderData,
};
