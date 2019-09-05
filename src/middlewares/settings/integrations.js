import { CONNECT_WITH_PAYPAL } from 'constantsTypes';
import { connectWithPaypalSuccess, connectWithPaypalFailed } from 'actions/settings';

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CONNECT_WITH_PAYPAL) return next(action);

  const { payload, meta = {} } = action;
  dispatch(apiRequest({
    options: {
      method: 'POST',
      uri: '/api/paypal/auth',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (arg) => {
      if (meta.onSuccess) meta.onSuccess(arg);
      return connectWithPaypalSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return connectWithPaypalFailed(message);
    }
  }));
};
