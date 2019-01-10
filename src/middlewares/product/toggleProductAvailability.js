

import { TOGGLE_PRODUCT_AVAILABILITY } from 'constantsTypes';
import { toggleProductAvailabilitySuccess, toggleProductAvailabilityFaild } from 'actions/product';
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
      uri: '/api/products/availability',
      contentType: 'json'
    },
    onSuccess: toggleProductAvailabilitySuccess.bind(this, { productId, available }),
    onFaild: toggleProductAvailabilityFaild
  }));
  // restore the application stored data in the loaclStorage
};
