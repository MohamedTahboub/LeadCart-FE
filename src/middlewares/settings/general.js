import { SAVE_USER_GENERAL_SETTINGS } from 'constantsTypes';
import { saveUserGeneralSettingsSuccess, saveUserGeneralSettingsFaild } from 'actions/settings';

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== SAVE_USER_GENERAL_SETTINGS) return next(action);


  dispatch(apiRequest({
    options: {
      method: 'PUT',
      uri: '/api/users/marketplace',
      body: action.payload,
      contentType: 'json'
    },
    onSuccess: saveUserGeneralSettingsSuccess,
    onFaild: saveUserGeneralSettingsFaild
  }));
};
