import {
  ADD_OFFLINE_PAYMENT_METHOD,
  ADD_OFFLINE_PAYMENT_METHOD_FAILED,
  ADD_OFFLINE_PAYMENT_METHOD_SUCCESS,
  CHECK_INTEGRATION_SUPPORT,
  CHECK_INTEGRATION_SUPPORT_FAILED,
  CHECK_INTEGRATION_SUPPORT_SUCCESS,
  CONNECT_INTEGRATION_SERVICE,
  CONNECT_INTEGRATION_SERVICE_FAILED,
  CONNECT_INTEGRATION_SERVICE_SUCCESS,
  DISCONNECT_INTEGRATION_SERVICE,
  DISCONNECT_INTEGRATION_SERVICE_FAILED,
  DISCONNECT_INTEGRATION_SERVICE_SUCCESS,
  GET_INTEGRATION_ACTION_REQUIREMENT,
  GET_INTEGRATION_ACTION_REQUIREMENT_FAILED,
  GET_INTEGRATION_ACTION_REQUIREMENT_SUCCESS,
  GET_USER_INTEGRATION,
  SEND_TWILIO_TEST_SMS,
  SEND_TWILIO_TEST_SMS_FAILED,
  SEND_TWILIO_TEST_SMS_SUCCESS,
  SEND_WEBHOOK_TEST_PAYLOAD,
  SEND_WEBHOOK_TEST_PAYLOAD_FAILED,
  SEND_WEBHOOK_TEST_PAYLOAD_SUCCESS,
  UPDATE_OFFLINE_PAYMENT_METHOD,
  UPDATE_OFFLINE_PAYMENT_METHOD_FAILED,
  UPDATE_OFFLINE_PAYMENT_METHOD_SUCCESS
} from '../constantsTypes';

export const getUserIntegration = (integrations) => ({
  type: GET_USER_INTEGRATION,
  payload: integrations
});
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

export const sendWebhookTestPayload = (service, meta) => ({
  type: SEND_WEBHOOK_TEST_PAYLOAD,
  payload: service,
  meta
});
export const sendWebhookTestPayloadSuccess = (service) => ({
  type: SEND_WEBHOOK_TEST_PAYLOAD_SUCCESS,
  payload: service
});
export const sendWebhookTestPayloadFailed = (message) => ({
  type: SEND_WEBHOOK_TEST_PAYLOAD_FAILED,
  payload: message
});


export const sendTwilioTestSMS = (details, meta) => ({
  type: SEND_TWILIO_TEST_SMS,
  payload: details,
  meta
});
export const sendTwilioTestSMSSuccess = (details) => ({
  type: SEND_TWILIO_TEST_SMS_SUCCESS,
  payload: details
});
export const sendTwilioTestSMSFailed = (message) => ({
  type: SEND_TWILIO_TEST_SMS_FAILED,
  payload: message
});


export const addOfflinePaymentMethod = (service, meta) => ({
  type: ADD_OFFLINE_PAYMENT_METHOD,
  payload: service,
  meta
});
export const addOfflinePaymentMethodSuccess = (service) => ({
  type: ADD_OFFLINE_PAYMENT_METHOD_SUCCESS,
  payload: service
});
export const addOfflinePaymentMethodFailed = (message) => ({
  type: ADD_OFFLINE_PAYMENT_METHOD_FAILED,
  payload: message
});

export const updateOfflinePaymentMethod = (service, meta) => ({
  type: UPDATE_OFFLINE_PAYMENT_METHOD,
  payload: service,
  meta
});
export const updateOfflinePaymentMethodSuccess = (service) => ({
  type: UPDATE_OFFLINE_PAYMENT_METHOD_SUCCESS,
  payload: service
});
export const updateOfflinePaymentMethodFailed = (message) => ({
  type: UPDATE_OFFLINE_PAYMENT_METHOD_FAILED,
  payload: message
});

