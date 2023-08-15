export const ASSET_LOAD_COMPLETE = 'ASSET_LOAD_COMPLETE';
export const ASSET_LOAD_PERCENTAGE = 'ASSET_LOAD_PERCENTAGE';
export const ASSET_PRELOAD_COMPLETE = 'ASSET_PRELOAD_COMPLETE';
export const ASSET_PRELOAD_PERCENTAGE = 'ASSET_PRELOAD_PERCENTAGE';
export const HIDE_MENU = 'HIDE_MENU';
export const RECEIVE_SITE_DATA = 'RECEIVE_SITE_DATA';
export const REQUEST_SITE_DATA = 'REQUEST_SITE_DATA';
export const SET_ACTIVE_SECTION = 'SET_ACTIVE_SECTION';
export const SHOW_MENU = 'SHOW_MENU';

export const requestSiteData = () => ({
  type: REQUEST_SITE_DATA,
});

export const receiveSiteData = (data) => ({
  type: RECEIVE_SITE_DATA,
  data,
});

export const fetchSiteData = (file) => dispatch => { /* eslint-disable-line arrow-parens */
  dispatch(requestSiteData());
  return fetch(file)
    .then((response) => response.json())
    .then((json) => dispatch(receiveSiteData(json, file)));
};

export const showMenu = () => ({
  type: SHOW_MENU,
});

export const hideMenu = () => ({
  type: HIDE_MENU,
});

export const setActiveSection = (id) => ({
  type: SET_ACTIVE_SECTION,
  id,
});

export const setAssetLoadComplete = () => ({
  type: ASSET_LOAD_COMPLETE,
});

export const setAssetLoadPercentage = (value) => ({
  type: ASSET_LOAD_PERCENTAGE,
  value,
});

export const setAssetPreloadComplete = () => ({
  type: ASSET_PRELOAD_COMPLETE,
});

export const setAssetPreloadPercentage = (value) => ({
  type: ASSET_PRELOAD_PERCENTAGE,
  value,
});
