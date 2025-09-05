import LoaderAsset from './loader-asset';
import getSectionComponentMap from '../../components/sections/section-manifest';

let siteData = [];

const getLoaderData = () => (
  siteData
);

const initLoaderData = (data) => {
  // Remove section's data if not in manifest
  const sections = data.filter(section => (
    getSectionComponentMap().find(item => item.id === section.id)
  ));
  siteData = {
    isLoadComplete: false,
    sections: sections.map((section) => ({
      ...section,
      assets: section.assets.map((element) => (new LoaderAsset({
        element: document.querySelector(`.${element.id} .add-site-img`),
        isLoaded: false,
        loadStarted: false,
        preload: element.preload,
      }))),
    })),
  };
};

const updateLoaderData = (options) => {
  Object.entries(options).forEach((arr) => {
    const [prop, value] = arr;
    siteData[prop] = value;
  });
};

const updateSectionData = (options) => {
  const { id } = options;
  // Updates only selected section data
  const section = siteData.sections.find((s) => s.id === id);
  if (section) {
    Object.entries(options).forEach((arr) => {
      const [prop, value] = arr;
      section[prop] = value;
    });
  }
};

const getSectionById = (id) => (
  siteData.sections.find((section) => section.id === id)
);

const getPreloadAssetData = () => (
  siteData.sections
    .map((section) => section.assets)
    .reduce((a, b) => a.concat(b), [])
    .filter((asset) => asset.preload)
);

const getMainAssetData = () => (
  siteData.sections
    .map((section) => section.assets)
    .reduce((a, b) => a.concat(b), [])
    .filter((asset) => !asset.preload)
);

export {
  getMainAssetData,
  getPreloadAssetData,
  getSectionById,
  getLoaderData,
  initLoaderData,
  updateSectionData,
  updateLoaderData,
};
