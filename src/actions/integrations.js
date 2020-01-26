import {
  CHECK_INTEGRATION_SUPPORT,
  CHECK_INTEGRATION_SUPPORT_SUCCESS,
  CHECK_INTEGRATION_SUPPORT_FAILED,
  CONNECT_INTEGRATION_SERVICE,
  CONNECT_INTEGRATION_SERVICE_SUCCESS,
  CONNECT_INTEGRATION_SERVICE_FAILED,
  DISCONNECT_INTEGRATION_SERVICE,
  DISCONNECT_INTEGRATION_SERVICE_SUCCESS,
  DISCONNECT_INTEGRATION_SERVICE_FAILED,
  GET_INTEGRATION_ACTION_REQUIREMENT,
  GET_INTEGRATION_ACTION_REQUIREMENT_SUCCESS,
  GET_INTEGRATION_ACTION_REQUIREMENT_FAILED,
} from 'constantsTypes';

export const checkIntegrationService = (service, meta) => ({
  type: CHECK_INTEGRATION_SUPPORT,
  payload: service,
  meta
});
export const checkIntegrationServiceSuccess = (service) => ({
  type: CHECK_INTEGRATION_SUPPORT_SUCCESS,
  payload: service
});
export const checkIntegrationServiceFailed = (message) => ({
  type: CHECK_INTEGRATION_SUPPORT_FAILED,
  payload: message
});

export const connectIntegrationService = (service, meta) => ({
  type: CONNECT_INTEGRATION_SERVICE,
  payload: service,
  meta
});
export const connectIntegrationServiceSuccess = (service) => ({
  type: CONNECT_INTEGRATION_SERVICE_SUCCESS,
  payload: service
});
export const connectIntegrationServiceFailed = (message) => ({
  type: CONNECT_INTEGRATION_SERVICE_FAILED,
  payload: message
});

export const disconnectIntegrationService = (service, meta) => ({
  type: DISCONNECT_INTEGRATION_SERVICE,
  payload: service,
  meta
});
export const disconnectIntegrationServiceSuccess = (service) => ({
  type: DISCONNECT_INTEGRATION_SERVICE_SUCCESS,
  payload: service
});
export const disconnectIntegrationServiceFailed = (message) => ({
  type: DISCONNECT_INTEGRATION_SERVICE_FAILED,
  payload: message
});


export const getIntegrationActionRequirement = (service, meta) => ({
  type: GET_INTEGRATION_ACTION_REQUIREMENT,
  payload: service,
  meta
});
export const getIntegrationActionRequirementSuccess = (service) => ({
  type: GET_INTEGRATION_ACTION_REQUIREMENT_SUCCESS,
  payload: service
});
export const getIntegrationActionRequirementFailed = (message) => ({
  type: GET_INTEGRATION_ACTION_REQUIREMENT_FAILED,
  payload: message
});

