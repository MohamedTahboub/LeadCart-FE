
import {
  removeOfflinePaymentMethodFailed,
  removeOfflinePaymentMethodSuccess
} from '../../actions/integrations';
import { apiRequest } from '../../actions/apiRequest';
import { REMOVE_OFFLINE_PAYMENT_METHOD } from '../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== REMOVE_OFFLINE_PAYMENT_METHOD) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'DELETE',
      body: { integrationId: payload.integrationId },
      uri: '/api/brands/integrations/offline-payments/disconnect',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return removeOfflinePaymentMethodSuccess(payload);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return removeOfflinePaymentMethodFailed(message);
    }
  }));
};
