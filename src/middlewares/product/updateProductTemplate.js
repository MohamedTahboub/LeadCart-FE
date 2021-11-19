
import { UPDATE_PRODUCT_TEMPLATE } from 'constantsTypes';
import { apiRequest } from 'actions/apiRequest';
import {
  updateProductTemplateFailed,
  updateProductTemplateSuccess
} from 'actions/product';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== UPDATE_PRODUCT_TEMPLATE) return next(action);

  const { meta: { onSuccess, onFailed } = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'put',
      body: action.payload,
      uri: '/api/brands/products/template',
      contentType: 'json'
    },
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
      return updateProductTemplateSuccess(data);
    },
    onFailed: (data) => {
      onFailed && onFailed(data);
      return updateProductTemplateFailed(data);
    }
  }));
};
