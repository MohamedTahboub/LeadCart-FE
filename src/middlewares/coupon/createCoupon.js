import { CREATE_NEW_COUPON } from 'constantsTypes';
import {
  createNewCouponSuccess,
  createNewCouponFailed
} from 'actions/coupon';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CREATE_NEW_COUPON) return next(action);

  const { payload, meta = {} } = action;
  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: payload,
      uri: '/api/coupon',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return createNewCouponSuccess(args);
    },
    onFailed: (args) => {
      if (meta.onFailed) meta.onFailed(args);
      return createNewCouponFailed(args);
    }
  }));
};

