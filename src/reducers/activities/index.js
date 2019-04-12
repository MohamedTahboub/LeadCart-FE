import {
    GET_ACTIVITIES
  } from 'constantsTypes';
  
  const initalState = {
    orders: [],
    subscriptions: []
  };
  
  export default (state = initalState, { type, payload }) => {
    switch (type) {
      case GET_ACTIVITIES:
        return {
          ...state,
          orders: payload.orders,
          subscriptions: payload.subscriptions
        };
      default: return state;
    }
  };
  