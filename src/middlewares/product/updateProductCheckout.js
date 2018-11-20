
import { UPDATE_PRODUCT_CHECKOUT_TEMPLATE } from 'constantsTypes';
import { updateProductCheckoutDesignFaild, updateProductCheckoutDesignSuccess } from 'actions/product';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== UPDATE_PRODUCT_CHECKOUT_TEMPLATE) return next(action);

  dispatch(apiRequest({
    options: {
      method: 'put',
      body: action.payload,
      uri: '/api/products/checkout',
      contentType: 'json'
    },
    onSuccess: updateProductCheckoutDesignSuccess,
    onFaild: updateProductCheckoutDesignFaild
  }));
  // restore the application stored data in the loaclStorage
};
