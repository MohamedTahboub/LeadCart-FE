import {
  SAVE_USER_GENERAL_SETTINGS,
  SAVE_USER_GENERAL_SETTINGS_SUCCESS,
  SAVE_USER_GENERAL_SETTINGS_FAILED,
  SETTINGS_GENERAL_FIELD_UPDATE,
  CONNECT_WITH_PAYPAL,
  CONNECT_WITH_PAYPAL_SUCCESS,
  CONNECT_WITH_PAYPAL_FAILED,
  UPDATE_MARKETPLACE_SETTINGS,
  UPDATE_MARKETPLACE_SETTINGS_SUCCESS,
  UPDATE_MARKETPLACE_SETTINGS_FAILED,
  CONNECT_MARKETPLACE_DOMAIN,
  CONNECT_MARKETPLACE_DOMAIN_SUCCESS,
  CONNECT_MARKETPLACE_DOMAIN_FAILED,
  VERIFY_MARKETPLACE_DOMAIN,
  VERIFY_MARKETPLACE_DOMAIN_SUCCESS,
  VERIFY_MARKETPLACE_DOMAIN_FAILED,
  TOGGLE_MARKETPLACE_DOMAIN_CONNECTION,
  TOGGLE_MARKETPLACE_DOMAIN_CONNECTION_SUCCESS,
  TOGGLE_MARKETPLACE_DOMAIN_CONNECTION_FAILED,
  DELETE_MARKETPLACE_DOMAIN,
  DELETE_MARKETPLACE_DOMAIN_SUCCESS,
  DELETE_MARKETPLACE_DOMAIN_FAILED,
} from 'constantsTypes';

export const updateMarketPlaceSettings = (settings, meta) => ({
  type: UPDATE_MARKETPLACE_SETTINGS,
  payload: settings,
  meta
});
export const updateMarketPlaceSettingsSuccess = (settings) => ({
  type: UPDATE_MARKETPLACE_SETTINGS_SUCCESS,
  payload: settings
});
export const updateMarketPlaceSettingsFailed = (message) => ({
  type: UPDATE_MARKETPLACE_SETTINGS_FAILED,
  payload: message
});

export const onUserGeneralSettingsFieldUpdate = (field) => ({
  type: SETTINGS_GENERAL_FIELD_UPDATE,
  payload: field
});

export const saveUserGeneralSettings = (settings) => ({
  type: SAVE_USER_GENERAL_SETTINGS,
  payload: settings
});

export const saveUserGeneralSettingsSuccess = (message) => ({
  type: SAVE_USER_GENERAL_SETTINGS_SUCCESS,
  payload: message
});

export const saveUserGeneralSettingsFailed = (message) => ({
  type: SAVE_USER_GENERAL_SETTINGS_FAILED,
  payload: message
});


/* Setting - Integrations - Payment Gateway */

export const connectWithPaypal = (appCredit, meta) => ({
  type: CONNECT_WITH_PAYPAL,
  payload: appCredit,
  meta
});
export const connectWithPaypalSuccess = (data) => ({
  type: CONNECT_WITH_PAYPAL_SUCCESS,
  payload: data
});
export const connectWithPaypalFailed = (message) => ({
  type: CONNECT_WITH_PAYPAL_FAILED,
  payload: message
});


export const connectMarketPlaceDomain = (domain, meta) => ({
  type: CONNECT_MARKETPLACE_DOMAIN,
  payload: domain,
  meta
});
export const connectMarketPlaceDomainSuccess = (domain) => ({
  type: CONNECT_MARKETPLACE_DOMAIN_SUCCESS,
  payload: domain
});
export const connectMarketPlaceDomainFailed = (message) => ({
  type: CONNECT_MARKETPLACE_DOMAIN_FAILED,
  payload: message
});

export const verifyMarketPlaceDomain = (domain, meta) => ({
  type: VERIFY_MARKETPLACE_DOMAIN,
  payload: domain,
  meta
});
export const verifyMarketPlaceDomainSuccess = (records) => ({
  type: VERIFY_MARKETPLACE_DOMAIN_SUCCESS,
  payload: records
});
export const verifyMarketPlaceDomainFailed = (message) => ({
  type: VERIFY_MARKETPLACE_DOMAIN_FAILED,
  payload: message
});

export const toggleMarketPlaceDomainConnection = (domain, meta) => ({
  type: TOGGLE_MARKETPLACE_DOMAIN_CONNECTION,
  payload: domain,
  meta
});
export const toggleMarketPlaceDomainConnectionSuccess = (domain) => ({
  type: TOGGLE_MARKETPLACE_DOMAIN_CONNECTION_SUCCESS,
  payload: domain
});
export const toggleMarketPlaceDomainConnectionFailed = (message) => ({
  type: TOGGLE_MARKETPLACE_DOMAIN_CONNECTION_FAILED,
  payload: message
});

export const deleteMarketPlaceDomain = (domain, meta) => ({
  type: DELETE_MARKETPLACE_DOMAIN,
  payload: domain,
  meta
});
export const deleteMarketPlaceDomainSuccess = (domain) => ({
  type: DELETE_MARKETPLACE_DOMAIN_SUCCESS,
  payload: domain
});
export const deleteMarketPlaceDomainFailed = (message) => ({
  type: DELETE_MARKETPLACE_DOMAIN_FAILED,
  payload: message
});
