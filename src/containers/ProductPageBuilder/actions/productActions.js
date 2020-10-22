import ids from 'shortid';
import * as immutable from 'object-path-immutable';

import sectionsTemplates from 'data/productSectionsTemplates';
import { isFunction } from 'libs/checks';
import * as types from './actionsTypes';

const sectionThatHaveSettings = [
  'text',
  'heading',
  'button',
  'bumpOffer',
  'testimonialsSection',
  'featuresSection',
  'guaranteeWidget',
  'countDownWidget',
  'progressbarWidget',
  'figure',
  'pageSetting',
  'faqs',
  'checkoutSection'
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


export const addNewSection = ({ state, dispatch }) => ({ type: sectionType, parentZone = 'second-column' }, postEffect) => {
  const section = sectionsTemplates[sectionType];

  if (!section) return;
  console.log("Just beofre the update", parentZone)
  // if (!state.product.sections) section.order = 0;
  // else section.order = state.product.sections.length;


  dispatch({
    type: types.ADD_NEW_SECTION,
    payload: {
      ...section,
      id: ids.generate(),
      parentZone
    }
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


export const onSectionSettingChange = ({ dispatch }) => ({ section, field = {}, fields }) => {
  let sectionUpdated;
  if (fields) {
    fields.forEach((field) => {
      const { name, value } = field;
      sectionUpdated = immutable.set(sectionUpdated || section, name, value);
    });
  } else {
    const { name, value } = field;
    sectionUpdated = immutable.set(section, name, value);
  }
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

export const onTogglePricingOptionModal = ({ dispatch }) => () => {
  dispatch({ type: types.TOGGLE_PRODUCT_PRICING_MODAL });
};
export const addProductPriceOption = ({ dispatch }) => (pricingOption) => {
  dispatch({ type: types.ADD_PRODUCT_PRICING_OPTION, payload: pricingOption });
};
export const selectProductPriceOption = ({ dispatch }) => (id) => {
  dispatch({ type: types.SELECT_PRODUCT_PRICING_OPTION, payload: id });
};
export const editProductPriceOption = ({ dispatch }) => (pricingOption) => {
  dispatch({ type: types.EDIT_PRODUCT_PRICING_OPTION, payload: pricingOption });
};
export const deleteProductPriceOption = ({ dispatch }) => (id) => {
  dispatch({ type: types.DELETE_PRODUCT_PRICING_OPTION, payload: id });
};
