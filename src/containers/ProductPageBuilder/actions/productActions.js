import ids from 'shortid';
import * as immutable from 'object-path-immutable';

import sectionsTemplates from 'data/productSectionsTemplates';
import { isFunction } from 'libs/checks';
import * as types from './actionsTypes';

const sectionThatHaveSettings = [
  'button',
  'bumpOffer',
  'testimonialsSection',
  'featuresSection',
  'guaranteeWidget',
  'countDownWidget',
  'progressbarWidget',
  'figure',
  'pageSetting',
  'staticSectionSetting'
];

export const updateState = ({ dispatch }) => (subState) => {
  dispatch({
    type: types.UPDATE_STATE,
    payload: subState
  });
};

export const onProductFieldChange = ({ state = {}, dispatch }) => (filed) => {
  let { name, value } = filed || {};

  if (name.includes('.')) {
    const [key, nestedKey] = name.split('.');
    const nestedValue = { [nestedKey]: value };
    name = key;
    value = { ...state.product[key], ...nestedValue };
  }

  dispatch({
    type: types.PRODUCT_FIELD_CHANGE,
    payload: {
      ...state.product,
      [name]: value
    }
  });
};

export const onSectionSetting = ({ dispatch }) => (section) => {
  dispatch({
    type: types.SECTION_SETTING,
    payload: section
  });
};
export const onSectionDelete = ({ state: { modals: { sectionSetting } = {} }, dispatch }) => (sectionId) => {
  dispatch({
    type: types.DELETE_PRODUCT_SECTION,
    payload: sectionId
  });

  sectionSetting && sectionSetting.id === sectionId && dispatch({
    type: types.TOGGLE_SECTION_SETTINGS_SIDEBAR,
    payload: false
  });
};


export const toggleSectionSettingModal = ({ state, dispatch }) => (section = {}) => {
  const { modals: { sectionSetting } = {} } = state;

  if (!sectionThatHaveSettings.includes(section.type)) return;

  const opened = !!sectionSetting;
  const {
    id: sectionSettingId,
    type: sectionSettingType
  } = sectionSetting || {};

  const sameSection = section.id
    ? section.id === sectionSettingId
    : section.type === sectionSettingType;


  let newSettingsState;
  if (opened && sameSection)
    newSettingsState = false;
  else
    newSettingsState = section;

  dispatch({
    type: types.TOGGLE_SECTION_SETTINGS_SIDEBAR,
    payload: newSettingsState
  });
};


export const addNewSection = ({ state, dispatch }) => (sectionType, postEffect) => {
  const section = sectionsTemplates[sectionType];

  if (!section) return;

  section.id = ids.generate();
  if (!state.product.sections) section.order = 0;
  else section.order = state.product.sections.length;


  dispatch({
    type: types.ADD_NEW_SECTION,
    payload: section
  });
  setTimeout(() => {
    if (isFunction(postEffect)) postEffect(section);
  }, 100);
};


export const updateDisplayMode = ({ dispatch }) => (mode) => {
  dispatch({
    type: types.UPDATE_DISPLAY_MODE,
    payload: mode
  });
};


export const onSectionSettingChange = ({ dispatch }) => ({ section, field: { name, value } = {} }) => {
  const sectionUpdated = immutable.set(section, name, value);
  dispatch({
    type: types.UPDATE_SECTION_SETTINGS,
    payload: sectionUpdated
  });
};


export const updateProductSection = ({ dispatch }) => (section) => {
  dispatch({
    type: types.UPDATE_PRODUCT_SECTION,
    payload: section
  });
};


export const onSectionFieldChange = ({ state: { modals: { sectionSetting = {} } = {} }, dispatch }) => (section) => {
  if (sectionSetting.id === section.id) {
    dispatch({
      type: types.UPDATE_SECTION_SETTINGS,
      payload: section
    });
  } else {
    dispatch({
      type: types.UPDATE_PRODUCT_SECTION,
      payload: section
    });
  }
};

