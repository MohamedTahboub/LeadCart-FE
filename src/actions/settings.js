import {
  SAVE_USER_GENERAL_SETTINGS,
  SAVE_USER_GENERAL_SETTINGS_SUCCESS,
  SAVE_USER_GENERAL_SETTINGS_FAILED,
  SETTINGS_GENERAL_FIELD_UPDATE,
  CONNECT_WITH_PAYPAL,
  CONNECT_WITH_PAYPAL_SUCCESS,
  CONNECT_WITH_PAYPAL_FAILED,
  UPDATE_MARKETPLACE_SETTINGS
} from 'constantsTypes';

export const updateMarketPlaceSettings = (settings) => ({
  type: UPDATE_MARKETPLACE_SETTINGS,
  payload: settings
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
export const connectWithPaypalSuccess = (message) => ({
  type: CONNECT_WITH_PAYPAL_SUCCESS,
  payload: message
});
export const connectWithPaypalFailed = (message) => ({
  type: CONNECT_WITH_PAYPAL_FAILED,
  payload: message
});
