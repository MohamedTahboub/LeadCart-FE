import { UPDATE_PRODUCT_CHECKOUT_TEMPLATE } from 'constantsTypes';
import modeler from '../../helpers/modeler';
import { checkoutDesign } from '../../helpers/models';

export default ({ getState }) => (next) => (action) => {
  if (action.type !== UPDATE_PRODUCT_CHECKOUT_TEMPLATE) return next(action);

  const { product: { _id: productId, checkout } } = getState();


  action.payload = { productId, checkoutDetails: modeler(checkout, checkoutDesign) };
  next(action);
};
