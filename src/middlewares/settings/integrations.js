import { CONNECT_WITH_PAYPAL } from 'constantsTypes';
import { connectWithPaypalSuccess, connectWithPaypalFailed } from 'actions/settings';

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== CONNECT_WITH_PAYPAL) return next(action);


  dispatch(apiRequest({
    options: {
      method: 'POST',
      uri: '/api/paypal/auth',
      body: action.payload,
      contentType: 'json'
    },
    onSuccess: connectWithPaypalSuccess,
    onFailed: connectWithPaypalFailed
  }));
};
