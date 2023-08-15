import LoaderAsset from './loader-asset';

let siteData = [];

const getLoaderData = () => (
  siteData
);

const initLoaderData = (data) => {
  siteData = {
    isLoadComplete: false,
    sections: data.map((section) => ({
      ...section,
      allHiResAssetsLoaded: false,
      allInitialAssetsLoaded: false,
      assets: section.assets.map((element) => (new LoaderAsset({
        element: document.querySelector(`.${element.id} .add-site-img`),
        id: element.id,
        isLoaded: false,
        loadStarted: false,
        preload: element.preload,
      }))),
      hiResAsssets: [],
      isActive: false,
    })),
    selectedSection: '',
  };
  // console.log(siteData);
};

const updateLoaderData = (options) => {
  Object.entries(options).forEach((arr) => {
    const [prop, value] = arr;
    siteData[prop] = value;
  });
  // console.log(siteData);
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
    // console.log(siteData);
  }
};

const getSectionById = (id) => (
  siteData.sections.find((section) => section.id === id)
);

const getActiveSectionId = () => (
  siteData.sections.find((section) => section.isActive)
);

export {
  getActiveSectionId,
  getSectionById,
  getLoaderData,
  initLoaderData,
  updateSectionData,
  updateLoaderData,
};
