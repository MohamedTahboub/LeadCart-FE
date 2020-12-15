
import {
  addOfflinePaymentMethodFailed,
  addOfflinePaymentMethodSuccess
} from '../../actions/integrations';
import { apiRequest } from '../../actions/apiRequest';
import { ADD_OFFLINE_PAYMENT_METHOD } from '../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== ADD_OFFLINE_PAYMENT_METHOD) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: payload,
      uri: '/api/brands/integrations/offline-payments',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return addOfflinePaymentMethodSuccess(args);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return addOfflinePaymentMethodFailed(message);
    }
  }));
};
