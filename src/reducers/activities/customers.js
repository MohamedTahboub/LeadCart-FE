import {
  GET_CUSTOMERS_LIST
} from 'constantsTypes';

const initalState = {
  customers: []
};

export default (state = initalState, { type, payload }) => {
  switch (type) {
  case GET_CUSTOMERS_LIST:
    return { customers: payload || [] };

  default: return state;
  }
};
