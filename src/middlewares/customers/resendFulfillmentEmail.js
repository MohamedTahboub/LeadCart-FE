import { RESEND_FULFILLMENT_EMAIL} from '../../constantsTypes';

import {
  resendFulfillmentEmailSuccess,
  resendFulfillmentEmailFailed,
} from '../../actions/customer';

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== RESEND_FULFILLMENT_EMAIL) return next(action);

  const { payload, meta = {} } = action;


  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: payload,
      uri: '/api/orders/fulfillment',
      contentType: 'json'
    },
    onSuccess: (data) => {
      if (meta.onSuccess) meta.onSuccess(data);
      return resendFulfillmentEmailSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return resendFulfillmentEmailFailed(message);
    }
  }));
};

