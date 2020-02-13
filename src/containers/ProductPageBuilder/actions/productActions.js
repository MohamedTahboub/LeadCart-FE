import sectionsTemplates from 'data/productSectionsTemplates';
import ids from 'shortid';
import * as types from './actionsTypes';

export const onProductFieldChange = ({ state = {}, dispatch }) => (payload) => {
  dispatch({
    type: types.PRODUCT_FIELD_CHANGE,
    payload: {
      ...state,
      product: {
        ...state.product,
        ...payload
      }
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

  section.id = ids.generate();
  section.order = state.product.sections.length;

  console.log(section);
  dispatch({
    type: types.ADD_NEW_SECTION,
    payload: section
  });
};
