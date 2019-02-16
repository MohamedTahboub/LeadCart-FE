import {
  SAVE_USER_GENERAL_SETTINGS,
  SAVE_USER_GENERAL_SETTINGS_SUCCESS,
  SAVE_USER_GENERAL_SETTINGS_FAILED,
  SETTINGS_GENERAL_FIELD_UPDATE
} from 'constantsTypes';


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
