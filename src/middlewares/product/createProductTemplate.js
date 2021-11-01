
import { CREATE_PRODUCT_TEMPLATE } from 'constantsTypes';
import { apiRequest } from 'actions/apiRequest';
import {
  createProductTemplateFailed,
  createProductTemplateSuccess
} from 'actions/product';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CREATE_PRODUCT_TEMPLATE) return next(action);

  const { meta: { onSuccess, onFailed } = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'post',
      body: action.payload,
      uri: '/api/brands/products/template',
      contentType: 'json'
    },
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
      return createProductTemplateSuccess(data);
    },
    onFailed: (data) => {
      onFailed && onFailed(data);
      return createProductTemplateFailed(data);
    }
  }));
};
