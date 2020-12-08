
import { UPDATE_PRODUCT } from 'constantsTypes';
import { productUpdatedFailed, productUpdatedSuccessfully } from 'actions/product';
import { apiRequest } from 'actions/apiRequest';

// import * as modles from '../helpers/models';
// import modeler from '../helpers/modeler';

export default ({ dispatch, getState }) => (next) => (action) => {
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
      return productUpdatedSuccessfully(data);
    },
    onFailed: (data) => {
      onFailed(data);
      return productUpdatedFailed(data);
    }
  }));
  // restore the application stored data in the loaclStorage
};
