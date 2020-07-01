import { redeemPromoCodeFailed, redeemPromoCodeSuccess } from '../../../actions/redemption';
import { REDEEM_PROMO_CODE } from '../../../constantsTypes';
import { apiRequest } from '../../../actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  const { payload, meta = {}, type } = action;
  if (type !== REDEEM_PROMO_CODE) return next(action);


  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: payload,
      uri: '/api/users/promo-code/redeem',
      contentType: 'json'
    },

    onSuccess: (data) => {
      if (meta.onSuccess) meta.onSuccess(data);
      return redeemPromoCodeSuccess(data);
    },

    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return redeemPromoCodeFailed({});
    }
  }));
};
