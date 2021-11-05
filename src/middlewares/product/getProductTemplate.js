
import { GET_PRODUCT_TEMPLATE_DETAILS } from 'constantsTypes';
import { getProductTemplateDetailsFailed, getProductTemplateDetailsSuccess } from 'actions/product';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== GET_PRODUCT_TEMPLATE_DETAILS) return next(action);

  const { payload: { productId = '' } = {}, meta: { onSuccess, onFailed } = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'get',
      uri: `/api/brands/products/template/${productId}`,
      contentType: 'json'
    },
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
      return getProductTemplateDetailsSuccess(data);
    },
    onFailed: (data) => {
      onFailed && onFailed(data);
      return getProductTemplateDetailsFailed(data);
    }
  }));
};
