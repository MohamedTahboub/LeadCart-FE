import {
  GET_CUSTOMERS,
  ORDER_REFUND_SUCCESS
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
  case ORDER_REFUND_SUCCESS:
    return {
      ...state,
      list: state.list.map((customer) => {
        const matched = customer.orders.find((order) => order === payload.orderId);

        if (matched) {
          return {
            ...customer,
            lifeTimeCharges: payload.refundedAmount
          };
        }

        return customer;
      })
    };
  default: return state;
  }
};
