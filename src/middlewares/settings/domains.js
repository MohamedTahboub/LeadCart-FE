import {
  UPDATE_MARKETPLACE_DOMAINS
} from 'constantsTypes';

import {
  updateMarketPlaceDomainsSuccess,
  updateMarketPlaceDomainsFailed,
} from 'actions/settings';

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => async (action) => {
  if (action.type !== UPDATE_MARKETPLACE_DOMAINS) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'POST',
      uri: '/api/users/marketplace/domain',
      body: payload,
      contentType: 'json'
    },
    onSuccess: () => {
      meta.onSuccess && meta.onSuccess(payload);
      return updateMarketPlaceDomainsSuccess(action.payload);
    },
    onFailed: (message) => {
      meta.onFailed && meta.onFailed(message);
      return updateMarketPlaceDomainsFailed(message);
    }
  }));
};
