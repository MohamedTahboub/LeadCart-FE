
import {
  updateOfflinePaymentMethodFailed,
  updateOfflinePaymentMethodSuccess
} from '../../actions/integrations';
import { apiRequest } from '../../actions/apiRequest';
import { UPDATE_OFFLINE_PAYMENT_METHOD } from '../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== UPDATE_OFFLINE_PAYMENT_METHOD) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'PUT',
      body: payload,
      uri: '/api/brands/integrations/offline-payments',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return updateOfflinePaymentMethodSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return updateOfflinePaymentMethodFailed(message);
    }
  }));
};
