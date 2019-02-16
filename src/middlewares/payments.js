import { ACTIVAT_PAYMENT } from 'constantsTypes';
import { activatPaymentMethodSuccess, activatPaymentMethodFailed } from 'actions/payments';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== ACTIVAT_PAYMENT) return next(action);

  const { type, code } = action.payload;


  dispatch(apiRequest({
    options: {
      method: 'post',
      uri: `/api/${type}/auth`,
      body: { code },
      contentType: 'json',
    },
    onSuccess: activatPaymentMethodSuccess.bind(this, type),
    onFailed: (message) => activatPaymentMethodFailed({ type, message })
  }));
};
