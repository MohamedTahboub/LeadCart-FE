import { SAVE_USER_GENERAL_SETTINGS } from 'constantsTypes';
import {
  saveUserGeneralSettingsSuccess,
  saveUserGeneralSettingsFailed,
  updateMarketPlaceSettings
} from 'actions/settings';

import { generalSettingSchema } from 'libs/validation'

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch, getState }) => (next) => async (action) => {
  if (action.type !== SAVE_USER_GENERAL_SETTINGS) return next(action);

  const { settings: { generalModel } } = getState();

  const { isValid, value, errors } = await generalSettingSchema(generalModel)

  if (!isValid)
    return dispatch(saveUserGeneralSettingsFailed(errors));


  dispatch(apiRequest({
    options: {
      method: 'PUT',
      uri: '/api/users/marketplace',
      body: value,
      contentType: 'json'
    },
    onSuccess: () => {
      dispatch(updateMarketPlaceSettings(value))
      return saveUserGeneralSettingsSuccess(value)
    },
    onFailed: saveUserGeneralSettingsFailed
  }));
};
