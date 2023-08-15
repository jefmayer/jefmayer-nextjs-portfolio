const getImageDataById = (id, data) => {
  const { assets } = data;
  return assets.find((asset) => asset.id === id);
};

const getSectionById = (id, data) => (
  data.find((section) => section.id === id)
);

const getSectionIdFromClassNames = (classNames) => {
  const key = 'project-animation-';
  let sectionId = '';
  classNames.split(' ').forEach((selector) => {
    if (selector.indexOf(key) !== -1) {
      const startAt = selector.lastIndexOf('-') + 1;
      sectionId = selector.substr(startAt);
    }
  });
  return sectionId;
};

export {
  getImageDataById,
  getSectionById,
  getSectionIdFromClassNames,
};
