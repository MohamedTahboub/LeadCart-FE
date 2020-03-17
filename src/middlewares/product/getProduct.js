import { GET_PRODUCT_DETAILS } from 'constantsTypes';
import { getProductSuccess, getProductFailed } from 'actions/product';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== GET_PRODUCT_DETAILS) return next(action);


  const getSuccess = ({ products }) => {
    const payload = products.filter(({ url }) => url === action.payload)[0] || {};
    return getProductSuccess(payload);
  };

  dispatch(apiRequest({
    options: {
      method: 'get',
      uri: '/api/brands/products',
      contentType: 'json'
    },
    onSuccess: getSuccess,
    onFailed: getProductFailed
  }));
};

