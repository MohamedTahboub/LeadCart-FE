import {
  GET_EMAIL_SETTINGS,
  UPDATE_EMAIL_FOOTER_SUCCESS
} from 'constantsTypes';

const initialState = {
  settings: {},
  errors: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_EMAIL_SETTINGS: return {
      ...state,
      settings: { ...state.settings, ...payload }
    };
    case UPDATE_EMAIL_FOOTER_SUCCESS: return {
      ...state,
      settings: { ...state.settings, ...payload }
    };
    default: return state;
  }
};
