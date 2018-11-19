import { DELETE_USER_PRODUCT } from 'constantsTypes';
import { deleteProductSuccess, deleteProductFaild } from 'actions/product';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== DELETE_USER_PRODUCT) return next(action);


  dispatch(apiRequest({
    options: {
      method: 'delete',
      body: { productId: action.payload },
      uri: '/api/products',
      contentType: 'json'
    },
    onSuccess: deleteProductSuccess.bind(this, action.payload),
    onFaild: deleteProductFaild
  }));
  // restore the application stored data in the loaclStorage
};
