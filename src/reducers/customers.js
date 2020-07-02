import {
  GET_CUSTOMERS,
  ORDER_REFUND_SUCCESS
} from '../constantsTypes';

const initState = { list: [] };
export default (state = initState, { type, payload }) => {
  switch (type) {
  case GET_CUSTOMERS:
    return {
      ...state,
      list: payload
    };
  case ORDER_REFUND_SUCCESS:
    return {
      ...state,
      list: state.list.map((customer) => {
        const refundedOrder = customer.orders.find((order) => order === payload.orderId);
        if (refundedOrder) {
          const lifeTimeCharges = payload.orders.reduce((lifeTimeCharges, order) => {
            if (order.customer.email === customer.email)
              return lifeTimeCharges + order.totalCharge;
            return lifeTimeCharges;
          }, 0).toString();
          return {
            ...customer,
            lifeTimeCharges
          };
        }

        return customer;
      })
    };
  default: return state;
  }
};
