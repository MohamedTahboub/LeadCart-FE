import { ORDER_REFUND } from 'constantsTypes';

import {
  orderRefundFailed,
  orderRefundSuccess
} from 'actions/customers';

import { apiRequest } from 'actions/apiRequest';
import store from 'store';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== ORDER_REFUND) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: payload,
      uri: '/api/brands/orders/refund',
      contentType: 'json'
    },
    onSuccess: (data) => {
      if (meta.onSuccess) meta.onSuccess(data);
      const { orders } = store.getState();
      payload.orders = orders;
      return orderRefundSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return orderRefundFailed(message);
    }
  }));
};

