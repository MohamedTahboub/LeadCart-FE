
import {
  GET_PRODUCT_SUCCESS,
  PRODUCT_BUMPOFFER_FIELD_UPDATE,
  UPDATE_PRODUCT_SUCCESS
} from 'constantsTypes';

const initialState = {
  completed: false,
  error: {}
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_PRODUCT_SUCCESS: return { ...state, ...payload.offer };
  case UPDATE_PRODUCT_SUCCESS: return { ...state, ...payload.offer };
  case PRODUCT_BUMPOFFER_FIELD_UPDATE: return { ...state, [payload.name]: payload.value };
    //   case CHECKOUT_PAGE_INVALID_FIELDS: return {
    //     ...state,
    //     error: typeof payload === 'string' ? { message: payload } : payload
    //   };
  default: return state;
  }
};

