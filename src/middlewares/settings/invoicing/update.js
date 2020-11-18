import { UPDATE_INVOICING_DETAILS } from 'constantsTypes';
import { updateInvoicingDetailsFailed, updateInvoicingDetailsSuccess } from 'actions/invoicing';

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== UPDATE_INVOICING_DETAILS) return next(action);

  const { payload, meta = {} } = action;
  dispatch(apiRequest({
    options: {
      method: 'PUT',
      uri: '/api/brands/invoices',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (arg) => {
      if (meta.onSuccess) meta.onSuccess(arg);
      return updateInvoicingDetailsSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return updateInvoicingDetailsFailed(message);
    }
  }));
};
