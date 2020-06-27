import { checkRedeemFailed, checkRedeemSuccess } from '../../../actions/redemption';
import { REDEEM_PROMO_CODE } from '../../../constantsTypes';
import { apiRequest } from '../../../actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  const { payload, meta = {}, type } = action;
  if (type !== REDEEM_PROMO_CODE) return next(action);

  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: payload,
      uri: '/users/redeem'
    },

    onSuccess: (data) => {
      if (meta.onSuccess) meta.onSuccess(data);
      return checkRedeemSuccess(data);
    },

    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return checkRedeemFailed(message);
    }
  }));
};
