
import { CHECK_PROMO_CODE } from '../../constantsTypes';
import { apiRequest } from '../../actions/apiRequest';
import {
    checkPromoCodeSuccess,
    checkPromoCodeFailed,
} from '../../actions/promoCode';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CHECK_PROMO_CODE) return next(action);

  const { payload, meta = {} } = action;
  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: payload,
      uri: '/api/promo-code/check',
      contentType: 'json'
    },
    onSuccess: (arg) => {
      if (meta.onSuccess) meta.onSuccess(arg);
      return checkPromoCodeSuccess(arg);
    },
    onFailed: (arg) => {
      if (meta.onFailed) meta.onFailed(arg);
      return checkPromoCodeFailed(arg);
    }

  }));
};
