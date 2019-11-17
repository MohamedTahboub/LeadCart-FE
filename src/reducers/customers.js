import {
  GET_CUSTOMERS,
  ORDER_REFUND_SUCCESS,
} from '../constantsTypes';

const initState = {
  list: []
};
export default (state = initState, { type, payload }) => {
  switch (type) {
  case GET_CUSTOMERS:
    return {
      ...state,
      list: payload
    };
  // case ORDER_REFUND_SUCCESS:


  //   return {
  //     ...state,
  //     list: state.list.map((customer) => {
  //       customer.orders.map((order) => {
  //         if (order._id !== payload.orderId) return order;

  //         const { paymentType } = order.payment;

  //         if (paymentType === 'Onetime') order.paymentRefunded = true;
  //         else order.subscriptionCanceled = true;

  //         if (payload.target === 'offer') order.offerPaymentRefunded = true;


  //         return order;
  //       });
  //       return customer;
  //     })
  //   };
  default: return state;
  }
};
