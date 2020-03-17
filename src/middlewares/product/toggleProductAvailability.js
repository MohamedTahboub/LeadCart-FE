

import { TOGGLE_PRODUCT_AVAILABILITY } from 'constantsTypes';
import { toggleProductAvailabilitySuccess, toggleProductAvailabilityFailed } from 'actions/product';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== TOGGLE_PRODUCT_AVAILABILITY) return next(action);
  const { id: productId, available } = action.payload;
  const payload = {
    productId,
    available: !available
  };
  dispatch(apiRequest({
    options: {
      method: 'put',
      body: payload,
      uri: '/api/brands/products/availability',
      contentType: 'json'
    },
    onSuccess: toggleProductAvailabilitySuccess.bind(this, { productId, available }),
    onFailed: toggleProductAvailabilityFailed
  }));
  // restore the application stored data in the loaclStorage
};
