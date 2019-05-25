import { CREATE_NEW_PRODUCT } from 'constantsTypes';
import { productCreated, productCreatingFailed } from 'actions/product';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== CREATE_NEW_PRODUCT) return next(action);

  const { payload: product, meta: { onSuccess, onFailed } = {} } = action;


  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: product,
      uri: '/api/products',
      contentType: 'json'
    },
    onSuccess: (data) => {
      onSuccess(data);
      return productCreated(data);
    },
    onFailed: (message) => {
      onFailed(message);
      return productCreatingFailed(message);
    }
  }));
  // restore the application stored data in the loaclStorage
};
