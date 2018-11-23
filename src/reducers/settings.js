import {
  SETTINGS_GENERAL_FIELD_UPDATE,
  SAVE_USER_GENERAL_SETTINGS_SUCCESS,
  SAVE_USER_GENERAL_SETTINGS_FAILD
} from 'constantsTypes';


const initialState = {
  generalModel: {
    name: '',
    country: 'United State',
    currency: 'USD',
    darkLogo: 'empty',
    downloadButtonText: 'Download Now',
    lightLogo: 'empty',
    productExpirationDays: 7 * 24,
    timeZone: '+2 GMT',
    errors: {},
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case SETTINGS_GENERAL_FIELD_UPDATE: return { ...state, generalModel: { ...state.generalModel, errors: {}, [payload.name]: payload.value } };
  case SAVE_USER_GENERAL_SETTINGS_SUCCESS: return { ...state };
  case SAVE_USER_GENERAL_SETTINGS_FAILD:
    return {
      ...state,
      generalModel: {
        ...state.generalModel,
        errors: typeof payload === 'object' ? payload : { message: payload }
      }
    };

  default: return state;
  }
};
