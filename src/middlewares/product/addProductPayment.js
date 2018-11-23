import { ADD_PRODUCT_PAYMENT_METHOD } from 'constantsTypes';
import { addProductPaymentMethodSuccess, addProductPaymentMethodFaild } from 'actions/product';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== ADD_PRODUCT_PAYMENT_METHOD) return next(action);


  dispatch(apiRequest({
    options: {
      method: 'PUT',
      body: [action.payload],
      uri: '/api/products/payment',
      contentType: 'json'
    },
    onSuccess: addProductPaymentMethodSuccess,
    onFaild: addProductPaymentMethodFaild
  }));
  // restore the application stored data in the loaclStorage
};
