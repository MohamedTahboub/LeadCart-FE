import { CREATE_NEW_PRODUCT } from 'constantsTypes';
import { productCreated, productCreatingFailed } from 'actions/product';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== CREATE_NEW_PRODUCT) return next(action);

  const { product: { newProduct } } = getState();
  delete newProduct.isAproductCreated;
  delete newProduct.errors;
  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: newProduct,
      uri: '/api/products',
      contentType: 'json'
    },
    onSuccess: productCreated,
    onFailed: productCreatingFailed
  }));
  // restore the application stored data in the loaclStorage
};
