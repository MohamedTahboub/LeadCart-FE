import { SAVE_USER_GENRAL_SETTINGS } from 'constantsTypes';
import { saveUserGenralSettingsSuccess, saveUserGenralSettingsFaild } from 'actions/settings';

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== SAVE_USER_GENRAL_SETTINGS) return next(action);


  dispatch(apiRequest({
    options: {
      method: 'PUT',
      uri: '/api/users/marketplace',
      body: action.payload,
      contentType: 'json'
    },
    onSuccess: saveUserGenralSettingsSuccess,
    onFaild: saveUserGenralSettingsFaild
  }));
};
