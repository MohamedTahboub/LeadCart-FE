import { DELETE_COUPON } from 'constantsTypes';

import {
  deleteCouponSuccess,
  deleteCouponFailed
} from 'actions/coupon';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== DELETE_COUPON) return next(action);

  const { payload, meta = {} } = action;
  dispatch(apiRequest({
    options: {
      method: 'DELETE',
      body: payload,
      uri: '/api/brands/coupon',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);

      return deleteCouponSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return deleteCouponFailed(message);
    }
  }));
};

