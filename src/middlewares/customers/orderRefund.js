import { ORDER_REFUND } from 'constantsTypes';

import {
  orderRefundSuccess,
  orderRefundFailed
} from 'actions/emails';

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== ORDER_REFUND) return next(action);

  const { payload, meta = {} } = action;


  dispatch(apiRequest({
    options: {
      method: 'PUT',
      body: payload,
      uri: '/api/orders/refund',
      contentType: 'json'
    },
    onSuccess: (data) => {
      if (meta.onSuccess) meta.onSuccess(data);
      return orderRefundSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return orderRefundFailed(message);
    }
  }));
};

