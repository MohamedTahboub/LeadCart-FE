import {
  SETTINGS_GENERAL_FIELD_UPDATE,
  SAVE_USER_GENERAL_SETTINGS_SUCCESS,
  SAVE_USER_GENERAL_SETTINGS_FAILED,
  CONNECT_WITH_PAYPAL_SUCCESS,
  CONNECT_WITH_PAYPAL_FAILED,
  UPDATE_MARKETPLACE_SETTINGS
} from 'constantsTypes';


const initialState = {
  generalModel: {
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
    case UPDATE_MARKETPLACE_SETTINGS:
      return {
        ...state,
        generalModel: {
          ...state.generalModel,
          ...payload
        }
      }
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
