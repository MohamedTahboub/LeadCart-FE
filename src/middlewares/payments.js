import { ACTIVATE_PAYMENT } from 'constantsTypes';
import { activatPaymentMethodSuccess, activatPaymentMethodFailed } from 'actions/payments';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== ACTIVATE_PAYMENT) return next(action);

  const { payload: { type, code } = {}, meta = {} } = action;


  dispatch(apiRequest({
    options: {
      method: 'post',
      uri: `/api/${type}/auth`,
      body: { code },
      contentType: 'json',
    },
    onSuccess: (arg) => {
      meta.onSuccess && meta.onSuccess(arg);
      return activatPaymentMethodSuccess(type);
    },
    onFailed: (message) => {
      meta.onFailed && meta.onFailed(message);
      return activatPaymentMethodFailed({ type, message });
    }
  }));
};
