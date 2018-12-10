import {
  GET_PRODUCT_SUCCESS,
  CHECKOUT_PAGE_FIELD_UPDATE,
  CHECKOUT_PAGE_INVALID_FIELDS
} from 'constantsTypes';

const initialState = {
  completed: false,
  error: {}
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_PRODUCT_SUCCESS: return { ...state, ...payload.checkoutPage };
  case CHECKOUT_PAGE_FIELD_UPDATE: return { ...state, [payload.name]: payload.value };
  case CHECKOUT_PAGE_INVALID_FIELDS: return {
    ...state,
    error: typeof payload === 'string' ? { message: payload } : payload
  };
  default: return state;
  }
};
