import {
  CHECK_INTEGRATION_SUPPORT,
  CONNECT_INTEGRATION_SERVICE,
  CONNECT_INTEGRATION_SERVICE_SUCCESS,
  CONNECT_INTEGRATION_SERVICE_FAILED,
} from 'constantsTypes';

export const checkIntegrationService = (service, meta) => ({
  type: CHECK_INTEGRATION_SUPPORT,
  payload: service,
  meta
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

