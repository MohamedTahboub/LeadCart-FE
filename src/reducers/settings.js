import {
  SETTINGS_GENERAL_FIELD_UPDATE,
  SAVE_USER_GENERAL_SETTINGS_SUCCESS,
  SAVE_USER_GENERAL_SETTINGS_FAILED,
  CONNECT_WITH_PAYPAL_SUCCESS,
  CONNECT_WITH_PAYPAL_FAILED
} from 'constantsTypes';


const initialState = {
  generalModel: {
    name: 'Leadcart',
    country: 'United States',
    currency: 'USD',
    darkLogo: '',
    lightLogo: '',
    timeZone: '(GMT-06:00) Central America',
    errors: {},
  },
  integrations: {
    errors: {}
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case SETTINGS_GENERAL_FIELD_UPDATE: return { ...state, generalModel: { ...state.generalModel, errors: {}, [payload.name]: payload.value } };
  case SAVE_USER_GENERAL_SETTINGS_SUCCESS: return { ...state };
  case SAVE_USER_GENERAL_SETTINGS_FAILED:
    return {
      ...state,
      generalModel: {
        ...state.generalModel,
        errors: typeof payload === 'object' ? payload : { message: payload }
      }
    };
  case CONNECT_WITH_PAYPAL_SUCCESS:
    return {
      ...state,
      integrations: {
        ...state.integrations,
        paypal: true
      }
    };
  case CONNECT_WITH_PAYPAL_FAILED:
    return {
      ...state,
      integrations: {
        ...state.integrations,
        paypal: false,
        errors: {
          ...state.integrations.errors.paypal,
          paypal: payload
        }
      }
    };
  default: return state;
  }
};
