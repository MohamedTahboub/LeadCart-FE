import {
  ORDER_REFUND,
  ORDER_REFUND_SUCCESS,
  ORDER_REFUND_FAILED,
} from 'constantsTypes';

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
