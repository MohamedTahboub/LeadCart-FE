
import { UPDATE_PRODUCT_CHECKOUT_TEMPLATE } from 'constantsTypes';
import { updateProductCheckoutDesignFaild } from 'actions/product';

import { Rules, Vaidator } from '../helpers/validators';

export default ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== UPDATE_PRODUCT_CHECKOUT_TEMPLATE) return next(action);

  const { product: { checkout } } = getState();

  const rules = {
    logo: [Rules.isRequired],
    presetColors: [Rules.isRequired],
    bulletPointImage: [Rules.isRequired],
    bulletPoints: [Rules.isArray],
    checkoutButtonText: [Rules.isRequired],
    customContent: [Rules.isRequired],
    guaranteeTitle: [Rules.isRequired],
    guaranteeText: [Rules.isRequired],
    template: [Rules.isRequired],
    // termsAndConditions: [Rules.isObject],
    testimonials: [Rules.isArray],
    bulletPointsTitle: [Rules.isRequired],
  };

  const isInvalid = Vaidator(checkout, rules);

  if (isInvalid) dispatch(updateProductCheckoutDesignFaild(isInvalid));
  else next(action);
};

