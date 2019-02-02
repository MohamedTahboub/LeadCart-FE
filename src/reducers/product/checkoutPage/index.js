import {
  GET_PRODUCT_SUCCESS,
  PRODUCT_CHECKOUT_FIELD_UPDATE,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILED
} from 'constantsTypes';

const initialState = {
  completed: false,
  error: {}
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_PRODUCT_SUCCESS: return { ...state, ...payload.checkoutPage };
  case UPDATE_PRODUCT_FAILED:
    return {
      ...state,
      errors: typeof payload === 'string' ? {
        message: payload.includes('dup key') ? 'This product Url has been taken try another one Please' : payload
      } : payload
    };
  case UPDATE_PRODUCT_SUCCESS: return { ...state, ...payload.checkoutPage };
  case PRODUCT_CHECKOUT_FIELD_UPDATE: return { ...state, [payload.name]: payload.value };
    //   case CHECKOUT_PAGE_INVALID_FIELDS: return {
    //     ...state,
    //     error: typeof payload === 'string' ? { message: payload } : payload
    //   };
  default: return state;
  }
};
