import {
  GET_SUBSCRIPTIONS_LIST
} from 'constantsTypes';

const initalState = {
  subscriptions: []
};

export default (state = initalState, { type, payload }) => {
  switch (type) {
  case GET_SUBSCRIPTIONS_LIST:
    return { subscriptions: payload || [] };

  default: return state;
  }
};

