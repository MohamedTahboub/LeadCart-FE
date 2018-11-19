import { CREATE_NEW_PRODUCT } from 'constantsTypes';
import { productCreated, productCreatingFaild } from 'actions/product';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== CREATE_NEW_PRODUCT) return next(action);

  const { product: { newProductHolder: product } } = getState();

  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: product,
      uri: '/api/products',
      contentType: 'json'
    },
    onSuccess: productCreated,
    onFaild: productCreatingFaild
  }));
  // restore the application stored data in the loaclStorage
};
