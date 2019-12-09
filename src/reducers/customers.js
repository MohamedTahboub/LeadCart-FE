import {
  GET_CUSTOMERS,
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
  default: return state;
  }
};
