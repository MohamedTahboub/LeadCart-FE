import { GENERATE_SAMPLE_INVOICE } from 'constantsTypes';
import { generateSampleInvoiceFailed, generateSampleInvoiceSuccess } from 'actions/invoicing';

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== GENERATE_SAMPLE_INVOICE) return next(action);

  const { payload, meta = {} } = action;
  dispatch(apiRequest({
    options: {
      method: 'POST',
      uri: '/api/brands/invoices/generate/sample',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (arg) => {
      if (meta.onSuccess) meta.onSuccess(arg);
      return generateSampleInvoiceSuccess(arg);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return generateSampleInvoiceFailed(message);
    }
  }));
};
