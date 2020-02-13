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
