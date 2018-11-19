import { GET_USER_PRODUCTS } from 'constantsTypes';
import { getUserProductsSuccess, getUserProductsFaild } from 'actions/products';
import { apiRequest } from 'actions/apiRequest';


export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== GET_USER_PRODUCTS) return next(action);

  console.log(action.type);
  dispatch(apiRequest({
    options: {
      method: 'get',
      uri: '/api/products',
      contentType: 'json'
    },
    onSuccess: getUserProductsSuccess,
    onFaild: getUserProductsFaild
  }));
};
