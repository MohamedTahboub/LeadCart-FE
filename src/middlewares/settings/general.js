import { UPDATE_MARKETPLACE_SETTINGS } from 'constantsTypes';
import {
  updateMarketPlaceSettingsFailed,
  updateMarketPlaceSettingsSuccess
} from 'actions/settings';

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch, getState }) => (next) => async (action) => {
  if (action.type !== UPDATE_MARKETPLACE_SETTINGS) return next(action);

  const { user: { user: { activeBrand } } } = getState();

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
      return updateMarketPlaceSettingsSuccess({ ...action.payload, activeBrand });
    },
    onFailed: (message) => {
      meta.onFailed && meta.onFailed(message);
      return updateMarketPlaceSettingsFailed(message);
    }
  }));
};
