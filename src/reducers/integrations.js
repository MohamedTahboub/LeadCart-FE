import {
  GET_USER_INTEGRATION,
  CONNECT_INTEGRATION_SERVICE_SUCCESS,
  DISCONNECT_INTEGRATION_SERVICE_SUCCESS,
  GET_INTEGRATION_ACTION_REQUIREMENT_SUCCESS
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
      if (integration.id === payload.integrationId) return { ...integration, connected: false };
      return integration;
    });
  default: return state;
  }
};

