import {
  ACTIVAT_PAYMENT,
  ACTIVAT_PAYMENT_SUCCESS,
  ACTIVAT_PAYMENT_FAILD
} from 'constantsTypes';

export const activatPaymentMethod = (type) => ({
  type: ACTIVAT_PAYMENT,
  payload: type
});
export const activatPaymentMethodSuccess = (payment) => ({
  type: ACTIVAT_PAYMENT_SUCCESS,
  payload: payment
});
export const activatPaymentMethodFaild = (message) => ({
  type: ACTIVAT_PAYMENT_FAILD,
  payload: message
});
