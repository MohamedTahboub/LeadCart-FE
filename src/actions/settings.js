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
  UPDATE_MARKETPLACE_DOMAINS,
  UPDATE_MARKETPLACE_DOMAINS_SUCCESS,
  UPDATE_MARKETPLACE_DOMAINS_FAILED,
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

export const updateMarketPlaceDomains = (domains, meta) => ({
  type: UPDATE_MARKETPLACE_DOMAINS,
  payload: domains,
  meta
});
export const updateMarketPlaceDomainsSuccess = (domains) => ({
  type: UPDATE_MARKETPLACE_DOMAINS_SUCCESS,
  payload: domains
});
export const updateMarketPlaceDomainsFailed = (message) => ({
  type: UPDATE_MARKETPLACE_DOMAINS_FAILED,
  payload: message
});
