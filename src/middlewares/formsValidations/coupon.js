
import { createNewCouponFaild } from 'actions/promoCode';

import { CREATE_NEW_COUPON } from 'constantsTypes';

import { Rules, Vaidator } from '../helpers/validators';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CREATE_NEW_COUPON) return next(action);

  const rules = {
    code: [Rules.isRequired],
    type: [Rules.isRequired],
    forAll: [Rules.bool],
    productId: [Rules.url],
    amount: [Rules.isNumber]
  };
  const isInvalid = Vaidator(action.payload, rules);

  if (isInvalid) dispatch(createNewCouponFaild(isInvalid));
  else next(action);
};

