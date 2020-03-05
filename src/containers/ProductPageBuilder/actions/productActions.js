import sectionsTemplates from 'data/productSectionsTemplates';
import ids from 'shortid';
import * as types from './actionsTypes';


export const updateState = ({ state = {}, dispatch }) => (subState) => {
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

export const onSectionSetting = ({ state = {}, dispatch }) => (section) => {
  dispatch({
    type: types.SECTION_SETTING,
    payload: section
  });
};
export const onSectionDelete = ({ state = {}, dispatch }) => (sectionId) => {
  dispatch({
    type: types.DELETE_PRODUCT_SECTION,
    payload: sectionId
  });
};


export const toggleSectionSettingModal = ({ state, dispatch }) => (section) => {
  const { modals: { sectionSetting } = {} } = state;
  let open = !!sectionSetting;

  // modify this to more readable script -_-
  if (section && (
    section.type === 'staticSectionSetting'
    || section.type === 'pageSetting'
  )) {
    if (!open) open = section;
    else open = false;
  } else if (
    (sectionSetting && sectionSetting.id) === (section && section.id)
  ) {
    open = false;
  } else {
    open = section;
  }


  dispatch({
    type: types.TOGGLE_SECTION_SETTINGS_SIDEBAR,
    payload: open
  });
};


export const addNewSection = ({ state, dispatch }) => (sectionType) => {
  const section = sectionsTemplates[sectionType];

  if (!section) return;

  section.id = ids.generate();
  if (!state.product.sections) section.order = 0;
  else section.order = state.product.sections.length;


  dispatch({
    type: types.ADD_NEW_SECTION,
    payload: section
  });
};


export const updateDisplayMode = ({ state = {}, dispatch }) => (mode) => {
  dispatch({
    type: types.UPDATE_DISPLAY_MODE,
    payload: mode
  });
};


export const onSectionSettingChange = ({ state = {}, dispatch }) => ({ section, field: { name, value } = {} }) => {
  if (name.includes('.')) {
    const [key, nestedKey] = name.split('.');
    const nestedValue = { [nestedKey]: value };
    name = key;
    value = { ...section[key], ...nestedValue };
  }

  const newSection = {
    ...section,
    [name]: value
  };

  dispatch({
    type: types.UPDATE_SECTION_SETTINGS,
    payload: newSection
  });
};


export const updateProductSection = ({ state = {}, dispatch }) => (section) => {
  dispatch({
    type: types.UPDATE_PRODUCT_SECTION,
    payload: section
  });
};
