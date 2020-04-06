import {
  UPDATE_MARKETPLACE_SETTINGS
} from 'constantsTypes';
import {
  updateMarketPlaceSettingsSuccess,
  updateMarketPlaceSettingsFailed,
} from 'actions/settings';

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => async (action) => {
  if (action.type !== UPDATE_MARKETPLACE_SETTINGS) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'PUT',
      uri: '/api/brands/marketplace',
      body: payload,
      contentType: 'json'
    },
    onSuccess: () => {
      meta.onSuccess && meta.onSuccess(payload);
      return updateMarketPlaceSettingsSuccess(action.payload);
    },
    onFailed: (message) => {
      meta.onFailed && meta.onFailed(message);
      return updateMarketPlaceSettingsFailed(message);
    }
  }));
};
