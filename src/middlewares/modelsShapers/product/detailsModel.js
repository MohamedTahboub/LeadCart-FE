import { UPDATE_PRODUCT_DETAILS } from 'constantsTypes';
import modeler from '../../helpers/modeler';
import { product } from '../../helpers/models';

export default ({ getState }) => (next) => (action) => {
  if (action.type !== UPDATE_PRODUCT_DETAILS) return next(action);

  const { product: { _id: productId, details } } = getState();


  action.payload = { productId, details: modeler(details, product) };
  next(action);
};
