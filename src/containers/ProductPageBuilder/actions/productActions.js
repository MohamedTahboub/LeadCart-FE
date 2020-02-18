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
  dispatch({
    type: types.PRODUCT_FIELD_CHANGE,
    payload: {
      ...state.product,
      [filed.name]: filed.value
    }
  });
};

export const onSectionSetting = ({ state = {}, dispatch }) => (section) => {
  dispatch({
    type: types.SECTION_SETTING,
    payload: section
  });
};


export const toggleSectionSettingModal = ({ state, dispatch }) => (sectionId) => {
  const { modals: { sectionSetting: currentSectionId } = {} } = state;

  // eslint-disable-next-line
  const toggledSection = currentSectionId
    ? currentSectionId === sectionId
      ? undefined
      : sectionId
    : sectionId;

  dispatch({
    type: types.TOGGLE_SECTION_SETTINGS_SIDEBAR,
    payload: toggledSection
  });
};


export const addNewSection = ({ state, dispatch }) => (sectionType) => {
  const section = sectionsTemplates[sectionType];

  if (!section) return;

  section.id = ids.generate();
  section.order = state.product.sections.length;

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
