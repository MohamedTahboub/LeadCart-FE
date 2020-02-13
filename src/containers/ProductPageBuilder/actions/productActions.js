import * as types from './actionsTypes';

export const onSectionSetting = ({ state = {}, dispatch }) => (section) => {
  dispatch({
    type: types.SECTION_SETTING,
    payload: section
  });
};
