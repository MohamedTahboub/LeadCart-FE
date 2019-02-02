import {
  createUpsellFailed,
  updateUpsellFailed
} from 'actions/upsells';

import { CREATE_UPSELL, UPDATE_UPSELL } from 'constantsTypes';


import { Rules, Vaidator } from '../helpers/validators';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CREATE_UPSELL && action.type !== UPDATE_UPSELL) return next(action);

  const upsell = action.payload;

  const rules = {
    name: [Rules.isRequired],
    upsellIntro: [Rules.isRequired],
    assets: [Rules.subdomain]
  };

  const isInvalid = Vaidator(upsell, rules);

  if (isInvalid && action.type === CREATE_UPSELL) dispatch(createUpsellFailed(isInvalid));
  if (isInvalid && action.type === UPDATE_UPSELL) dispatch(updateUpsellFailed(isInvalid));

  else next(action);
};

