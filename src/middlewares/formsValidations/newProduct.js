import { newProductInvalidFields } from 'actions/product';

import { CREATE_NEW_PRODUCT } from 'constantsTypes';

import { Rules, Vaidator } from '../helpers/validators';

export default ({ dispatch , getState }) => (next) => (action) => {
  if (action.type !== CREATE_NEW_PRODUCT) return next(action);

  const { product: { newProductHolder: product } } = getState();
  const rules = {
    name: [Rules.isRequired],
    description: [Rules.isRequired],
    url: [Rules.subdomain]
  };

  const isInvalid = Vaidator(product, rules);

  if (isInvalid) dispatch(newProductInvalidFields(isInvalid));
  else next(action);
};

