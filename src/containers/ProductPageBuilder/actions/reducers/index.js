import * as types from '../actionsTypes';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case types.SECTION_SETTING:
    return state;

  default: return state;
  }
};
