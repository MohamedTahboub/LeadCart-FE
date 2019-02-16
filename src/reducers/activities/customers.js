import {
  GET_CUSTOMERS_ACTIVITIES
} from 'constantsTypes';

const initalState = {
  customers: []
};

export default (state = initalState, { type, payload }) => {
  switch (type) {
  case GET_CUSTOMERS_ACTIVITIES:
    return {
      ...state,
      customers: payload.customers
    };
  default: return state;
  }
};
