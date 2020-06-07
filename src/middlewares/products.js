import { GET_USER_PRODUCTS } from 'constantsTypes';
import { getUserProductsSuccess, getUserProductsFailed } from 'actions/products';
import { apiRequest } from 'actions/apiRequest';


export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== GET_USER_PRODUCTS) return next(action);

  dispatch(apiRequest({
    options: {
      method: 'get',
      uri: '/api/brands/products',
      contentType: 'json'
    },
    onSuccess: getUserProductsSuccess,
    onFailed: getUserProductsFailed
  }));
};
