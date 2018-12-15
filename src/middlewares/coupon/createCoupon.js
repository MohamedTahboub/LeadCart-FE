import { CREATE_NEW_COUPON } from 'constantsTypes';
import {
  changeCouponStateSuccess,
  changeCouponStateFaild
} from 'actions/coupon';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CREATE_NEW_COUPON) return next(action);

  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: action.payload,
      uri: '/api/coupon',
      contentType: 'json'
    },
    onSuccess: changeCouponStateSuccess,
    onFaild: changeCouponStateFaild
  }));
};

