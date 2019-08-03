import {
  GET_USER_PAYMENTS_METHODS,
  ACTIVATE_PAYMENT,
  ACTIVATE_PAYMENT_SUCCESS,
  ACTIVATE_PAYMENT_FAILED
} from 'constantsTypes';

export const getUserPaymentMethods = (mehtods) => ({
  type: GET_USER_PAYMENTS_METHODS,
  payload: mehtods
});
export const activatPaymentMethod = (type) => ({
  type: ACTIVATE_PAYMENT,
  payload: type
});
export const activatPaymentMethodSuccess = (payment) => ({
  type: ACTIVATE_PAYMENT_SUCCESS,
  payload: payment
});
export const activatPaymentMethodFailed = (message) => ({
  type: ACTIVATE_PAYMENT_FAILED,
  payload: message
});
