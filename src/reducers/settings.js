import {
  SETTINGS_GENERAL_FIELD_UPDATE,
  SAVE_USER_GENERAL_SETTINGS_SUCCESS,
  SAVE_USER_GENERAL_SETTINGS_FAILED,
  CONNECT_WITH_PAYPAL_SUCCESS,
  CONNECT_WITH_PAYPAL_FAILED,
  UPDATE_MARKETPLACE_SETTINGS_SUCCESS,
  VERIFY_MARKETPLACE_DOMAIN_SUCCESS,
  TOGGLE_MARKETPLACE_DOMAIN_CONNECTION_SUCCESS,
  DELETE_MARKETPLACE_DOMAIN_SUCCESS,
  CONNECT_MARKETPLACE_DOMAIN_SUCCESS
} from '../constantsTypes';


const initialState = {
  generalModel: {
    errors: {},
    layout: {},
    domains: []
  },
  integrations: {
    errors: {}
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case SETTINGS_GENERAL_FIELD_UPDATE: return { ...state, generalModel: { ...state.generalModel, errors: {}, [payload.name]: payload.value } };
  case SAVE_USER_GENERAL_SETTINGS_SUCCESS: return { ...state };
  case UPDATE_MARKETPLACE_SETTINGS_SUCCESS:
    return {
      ...state,
      generalModel: {
        ...state.generalModel,
        ...payload
      }
    };

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
  case CONNECT_MARKETPLACE_DOMAIN_SUCCESS:
    return {
      ...state,
      generalModel: {
        ...state.generalModel,
        domains: [...state.generalModel.domains, { ...payload, connected: true }]
      }
    };
  case VERIFY_MARKETPLACE_DOMAIN_SUCCESS:
    return {
      ...state,
      generalModel: {
        ...state.generalModel,
        domains: state.generalModel.domains.map((domain) => {
          if (domain.domain === payload.domain) return ({ ...domain, verified: true });
          return domain;
        })
      }
    };
  case TOGGLE_MARKETPLACE_DOMAIN_CONNECTION_SUCCESS:
    return {
      ...state,
      generalModel: {
        ...state.generalModel,
        domains: state.generalModel.domains.map((domain) => {
          if (domain.domain === payload.domain) return ({ ...domain, connected: !domain.connected });
          return domain;
        })
      }
    };
  case DELETE_MARKETPLACE_DOMAIN_SUCCESS:
    return {
      ...state,
      generalModel: {
        ...state.generalModel,
        domains: state.generalModel.domains.filter(({ domain }) => domain !== payload.domain)
      }
    };
  default: return state;
  }
};
