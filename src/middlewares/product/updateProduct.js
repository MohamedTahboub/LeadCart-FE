
import { UPDATE_PRODUCT } from 'constantsTypes';
import { productUpdatedFailed, productUpdatedSuccessfully } from 'actions/product';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== UPDATE_PRODUCT) return next(action);

  const { meta: { onSuccess, onFailed } = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'put',
      body: action.payload,
      uri: '/api/brands/products',
      contentType: 'json'
    },
    onSuccess: (data) => {
      onSuccess(data);
      return productUpdatedSuccessfully({ id: action.payload?.productId, ...data });
    },
    onFailed: (data) => {
      onFailed(data);
      return productUpdatedFailed(data);
    }
  }));
};
