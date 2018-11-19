import {
  SAVE_USER_GENRAL_SETTINGS,
  SAVE_USER_GENRAL_SETTINGS_SUCCESS,
  SAVE_USER_GENRAL_SETTINGS_FAILD,
  SETTINGS_GENRAL_FIELD_UPDATE
} from 'constantsTypes';


export const onUserGenralSettingsFieldUpdate = (field) => ({
  type: SETTINGS_GENRAL_FIELD_UPDATE,
  payload: field
});

export const saveUserGenralSettings = (settings) => ({
  type: SAVE_USER_GENRAL_SETTINGS,
  payload: settings
});

export const saveUserGenralSettingsSuccess = (message) => ({
  type: SAVE_USER_GENRAL_SETTINGS_SUCCESS,
  payload: message
});

export const saveUserGenralSettingsFaild = (message) => ({
  type: SAVE_USER_GENRAL_SETTINGS_FAILD,
  payload: message
});
