import {
  GET_CUSTOMERS_ACTIVITIES
} from 'constantsTypes';

const initalState = {
  orders: []
};

export default (state = initalState, { type, payload }) => {
  switch (type) {
  case GET_CUSTOMERS_ACTIVITIES:
    return {
      ...state,
      orders: payload.orders
    };
  default: return state;
  }
};
