import {
  CONNECT_MARKETPLACE_DOMAIN
} from 'constantsTypes';

import {
  connectMarketPlaceDomainSuccess,
  connectMarketPlaceDomainFailed,
} from 'actions/settings';

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => async (action) => {
  if (action.type !== CONNECT_MARKETPLACE_DOMAIN) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'POST',
      uri: '/api/brands/marketplace/domains/connect',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (args) => {
      meta.onSuccess && meta.onSuccess(args);
      return connectMarketPlaceDomainSuccess(action.payload);
    },
    onFailed: (message) => {
      meta.onFailed && meta.onFailed(message);
      return connectMarketPlaceDomainFailed(message);
    }
  }));
};
