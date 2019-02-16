import {
  GET_CUSTOMERS_ACTIVITIES
} from 'constantsTypes';

const initalState = {
  subscriptions: []
};

export default (state = initalState, { type, payload }) => {
  switch (type) {
  case GET_CUSTOMERS_ACTIVITIES:
    return {
      ...state,
      subscriptions: payload.subscriptions
    };
  default: return state;
  }
};

