import {
  ADD_OFFLINE_PAYMENT_METHOD_SUCCESS,
  CONNECT_INTEGRATION_SERVICE_SUCCESS,
  DISCONNECT_INTEGRATION_SERVICE_SUCCESS,
  GET_USER_INTEGRATION,
  REMOVE_OFFLINE_PAYMENT_METHOD_SUCCESS,
  UPDATE_OFFLINE_PAYMENT_METHOD_SUCCESS
} from '../constantsTypes';


const initialState = [];


export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_USER_INTEGRATION:
    return payload;
  case CONNECT_INTEGRATION_SERVICE_SUCCESS:
    return [...state, { ...payload, connected: true }];
  case DISCONNECT_INTEGRATION_SERVICE_SUCCESS:
    return state.map((integration) => {
      if ((integration.id || integration._id) === payload.integrationId) return { ...integration, connected: false };
      return integration;
    });
  case ADD_OFFLINE_PAYMENT_METHOD_SUCCESS:
    return state.map((integration) => {
      if (integration.key === payload.key)
        return { ...integration, ...payload };
      return integration;
    });
  case UPDATE_OFFLINE_PAYMENT_METHOD_SUCCESS:
    return state.map((integration) => {
      if (integration._id === payload.integrationId)
        return { ...integration, ...payload.details };
      return integration;
    });
  case REMOVE_OFFLINE_PAYMENT_METHOD_SUCCESS:
    return state.filter((integration) => integration._id !== payload.integrationId);
  default: return state;
  }
};

