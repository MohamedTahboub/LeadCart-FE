import {
  GET_USER_PRODUCTS_SUCCESS,
  GET_USER_PRODUCTS_FAILED,
  DELETE_USER_PRODUCT_SUCCESS,
  DELETE_USER_PRODUCT_FAILED
} from 'constantsTypes';


const initialState = {
  products: [],
  errors: ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_USER_PRODUCTS_SUCCESS: return { ...state, products: payload.products.reverse() };
  case GET_USER_PRODUCTS_FAILED: return { ...state, error: payload };
  case DELETE_USER_PRODUCT_SUCCESS: return { ...state, products: state.products.filter(({ _id }) => payload !== _id) };
  case DELETE_USER_PRODUCT_FAILED: return { ...state, error: payload };
  default: return state;
  }
};

