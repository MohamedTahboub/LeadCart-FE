import modeler from '../../helpers/modeler';
import { checkoutPage } from '../../helpers/models';

export default ({ getState }) => (next) => (action) => {
  return next(action);

  const { product: { _id: productId, checkout } } = getState();


  action.payload = { productId, checkoutDetails: modeler(checkout, checkoutPage) };
  next(action);
};
