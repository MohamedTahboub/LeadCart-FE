import { CHANGE_COUPON_STATE } from 'constantsTypes';

import {
  changeCouponStateSuccess,
  changeCouponStateFailed
} from 'actions/coupon';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CHANGE_COUPON_STATE) return next(action);

  dispatch(apiRequest({
    options: {
      method: 'PUT',
      body: action.payload,
      uri: '/api/coupon',
      contentType: 'json'
    },
    onSuccess: changeCouponStateSuccess.bind(this, action.payload),
    onFailed: changeCouponStateFailed
  }));
};

