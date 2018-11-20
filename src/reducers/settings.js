import {
  SETTINGS_GENRAL_FIELD_UPDATE,
  SAVE_USER_GENRAL_SETTINGS_SUCCESS,
  SAVE_USER_GENRAL_SETTINGS_FAILD
} from 'constantsTypes';


const initialState = {
  genralModel: {
    errors: {},
    eee: 'ddd'
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case SETTINGS_GENRAL_FIELD_UPDATE: return { ...state, genralModel: { ...state.genralModel, errors: {}, [payload.name]: payload.value } };
  case SAVE_USER_GENRAL_SETTINGS_SUCCESS: return { ...state };
  case SAVE_USER_GENRAL_SETTINGS_FAILD:
    return {
      ...state,
      genralModel: {
        ...state.genralModel,
        errors: typeof payload === 'object' ? payload : { message: payload }
      }
    };

  default: return state;
  }
};
