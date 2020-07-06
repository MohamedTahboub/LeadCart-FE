import {
  GET_CUSTOMERS,
  ORDER_REFUND,
  ORDER_REFUND_FAILED,
  ORDER_REFUND_SUCCESS,
  RESEND_FULFILLMENT_EMAIL,
  RESEND_FULFILLMENT_EMAIL_FAILED,
  RESEND_FULFILLMENT_EMAIL_SUCCESS,
  RESEND_RECEIPT_EMAIL,
  RESEND_RECEIPT_EMAIL_FAILED,
  RESEND_RECEIPT_EMAIL_SUCCESS
} from 'constantsTypes';


export const getCustomers = (customers) => ({
  type: GET_CUSTOMERS,
  payload: customers
});

export const orderRefund = (order, meta) => ({
  type: ORDER_REFUND,
  payload: order,
  meta
});
export const orderRefundSuccess = (order) => ({
  type: ORDER_REFUND_SUCCESS,
  payload: order
});
export const orderRefundFailed = (message) => ({
  type: ORDER_REFUND_FAILED,
  payload: message
});

export const resendReceiptEmail = (order, meta) => ({
  type: RESEND_RECEIPT_EMAIL,
  payload: order,
  meta
});
export const resendReceiptEmailSuccess = (order) => ({
  type: RESEND_RECEIPT_EMAIL_SUCCESS,
  payload: order
});
export const resendReceiptEmailFailed = (message) => ({
  type: RESEND_RECEIPT_EMAIL_FAILED,
  payload: message
});

export const resendFulfillmentEmail = (order, meta) => ({
  type: RESEND_FULFILLMENT_EMAIL,
  payload: order,
  meta
});
export const resendFulfillmentEmailSuccess = (order) => ({
  type: RESEND_FULFILLMENT_EMAIL_SUCCESS,
  payload: order
});
export const resendFulfillmentEmailFailed = (message) => ({
  type: RESEND_FULFILLMENT_EMAIL_FAILED,
  payload: message
});
