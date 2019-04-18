import { CONNECT_WITH_PAYPAL } from 'constantsTypes';
import { connectWithPaypalSuccess, connectWithPaypalFailed } from 'actions/settings';

import { apiRequest } from 'actions/apiRequest';
import { Meta } from 'antd/lib/list/Item';

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
      return connectWithPaypalSuccess(arg);
    },
    onFailed: (arg) => {
      if (meta.onFailed) meta.onFailed(arg);
      return connectWithPaypalFailed(arg);
    }
  }));
};
