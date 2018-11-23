
import { UPDATE_PRODUCT_DETAILS } from 'constantsTypes';
import { productUpdatedFaild } from 'actions/product';

import { Rules, Vaidator } from '../helpers/validators';

export default ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== UPDATE_PRODUCT_DETAILS) return next(action);

  const { product: { details } } = getState();

  const rules = {
    image: [Rules.url],
    description: [Rules.isRequired],
    name: [Rules.isRequired],
    url: [Rules.alphabet]
  };
  const isInvalid = Vaidator(details, rules);

  if (isInvalid) dispatch(productUpdatedFaild(isInvalid));
  else next(action);
};

