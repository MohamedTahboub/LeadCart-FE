import {
  GET_USER_PAYMENTS_METHODS,
  ACTIVAT_PAYMENT,
  ACTIVAT_PAYMENT_SUCCESS,
  ACTIVAT_PAYMENT_FAILED
} from 'constantsTypes';

export const getUserPaymentMethods = (mehtods) => ({
  type: GET_USER_PAYMENTS_METHODS,
  payload: mehtods
});
export const activatPaymentMethod = (type) => ({
  type: ACTIVAT_PAYMENT,
  payload: type
});
export const activatPaymentMethodSuccess = (payment) => ({
  type: ACTIVAT_PAYMENT_SUCCESS,
  payload: payment
});
export const activatPaymentMethodFailed = (message) => ({
  type: ACTIVAT_PAYMENT_FAILED,
  payload: message
});
