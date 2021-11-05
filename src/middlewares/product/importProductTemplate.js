
import { IMPORT_PRODUCT_TEMPLATE } from 'constantsTypes';
import { importProductTemplateFailed, importProductTemplateSuccess } from 'actions/product';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== IMPORT_PRODUCT_TEMPLATE) return next(action);

  const { meta: { onSuccess, onFailed } = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'put',
      body: action.payload,
      uri: '/api/brands/products/template/import',
      contentType: 'json'
    },
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
      return importProductTemplateSuccess(data);
    },
    onFailed: (data) => {
      onFailed && onFailed(data);
      return importProductTemplateFailed(data);
    }
  }));
};
