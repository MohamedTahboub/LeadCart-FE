
import { UPDATE_PRODUCT_DETAILS } from 'constantsTypes';
import { productUpdatedSuccessfuly, productUpdatedFaild } from 'actions/product';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== UPDATE_PRODUCT_DETAILS) return next(action);

  const { product: { _id: productId, details } } = getState();
  delete details.errors;
  const product = { productId, details };
  dispatch(apiRequest({
    options: {
      method: 'put',
      body: product,
      uri: '/api/products',
      contentType: 'json'
    },
    onSuccess: productUpdatedSuccessfuly,
    onFaild: productUpdatedFaild
  }));
  // restore the application stored data in the loaclStorage
};
