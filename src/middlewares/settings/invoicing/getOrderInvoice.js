import { GENERATE_ORDER_INVOICE } from 'constantsTypes';
import { generateOrderInvoiceFailed, generateOrderInvoiceSuccess } from 'actions/invoicing';

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== GENERATE_ORDER_INVOICE) return next(action);

  const { payload, meta = {} } = action;
  dispatch(apiRequest({
    options: {
      method: 'POST',
      uri: '/api/brands/invoices/generate',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (arg) => {
      if (meta.onSuccess) meta.onSuccess(arg);
      return generateOrderInvoiceSuccess(arg);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return generateOrderInvoiceFailed(message);
    }
  }));
};
