/* eslint-disable default-param-last */
import { combineReducers } from 'redux';
import {
  ASSET_LOAD_COMPLETE,
  ASSET_LOAD_PERCENTAGE,
  ASSET_PRELOAD_PERCENTAGE,
  ASSET_PRELOAD_COMPLETE,
  RECEIVE_SITE_DATA,
  REQUEST_SITE_DATA,
  HIDE_MENU,
  SET_ACTIVE_SECTION,
  SHOW_MENU,
} from '../actions';

const siteData = (state = {
  items: [],
}, action) => {
  switch (action.type) {
    case REQUEST_SITE_DATA:
      return {
        ...state,
      };
    case RECEIVE_SITE_DATA:
      return {
        ...state,
        items: action.data.sections.map((section) => ({
          ...section,
          assets: section.assets.map((asset) => ({
            ...asset,
            sectionId: section.id,
          })),
        })),
      };
    default:
      return state;
  }
};

const menu = (state = {
  isOpen: false,
}, action) => {
  switch (action.type) {
    case SHOW_MENU:
      return {
        ...state,
        isOpen: true,
      };
    case HIDE_MENU:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};

export const activeSection = (state = {
  id: '',
}, action) => {
  switch (action.type) {
    case SET_ACTIVE_SECTION:
      return {
        ...state,
        id: action.id,
      };
    default:
      return state;
  }
};

export const assetLoadStatus = (state = {
  assetLoadComplete: false,
  assetLoadPercentage: 0,
  assetPreloadComplete: false,
  assetPreloadPercentage: 0,
}, action) => {
  switch (action.type) {
    case ASSET_PRELOAD_COMPLETE:
      return {
        ...state,
        assetPreloadComplete: true,
      };
    case ASSET_LOAD_COMPLETE:
      return {
        ...state,
        assetLoadComplete: true,
      };
    case ASSET_LOAD_PERCENTAGE:
      return {
        ...state,
        assetLoadPercentage: action.value,
      };
    case ASSET_PRELOAD_PERCENTAGE:
      return {
        ...state,
        assetPreloadPercentage: action.value,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  activeSection,
  assetLoadStatus,
  menu,
  siteData,
});

export default rootReducer;
/* eslint-enable default-param-last */
