import {
  GET_ORDERS_LIST
} from 'constantsTypes';

const initalState = {
  orders: []
};

export default (state = initalState, { type, payload }) => {
  switch (type) {
  case GET_ORDERS_LIST:
    return { orders: payload || [] };

  default: return state;
  }
};
