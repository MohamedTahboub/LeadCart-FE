import { RESEND_RECEIPT_EMAIL } from '../../constantsTypes';

import {
  resendReceiptEmailSuccess,
  resendReceiptEmailFailed,
} from '../../actions/customer';

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== RESEND_RECEIPT_EMAIL) return next(action);

  const { payload, meta = {} } = action;


  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: payload,
      uri: '/api/orders/receipt',
      contentType: 'json'
    },
    onSuccess: (data) => {
      if (meta.onSuccess) meta.onSuccess(data);
      return resendReceiptEmailSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return resendReceiptEmailFailed(message);
    }
  }));
};

