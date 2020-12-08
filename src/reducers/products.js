import {
  DELETE_USER_PRODUCT_FAILED,
  DELETE_USER_PRODUCT_SUCCESS,
  GET_USER_PRODUCTS_FAILED,
  GET_USER_PRODUCTS_SUCCESS,
  PRODUCT_CREATED_SUCCESSFULLY,
  UPDATE_PRODUCT_SUCCESS
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
  case PRODUCT_CREATED_SUCCESSFULLY: return { ...state, products: [{ ...payload, _id: payload.id || payload._id }, ...state.products] };
  case UPDATE_PRODUCT_SUCCESS:
    return {
      ...state,
      products: state.products
        .map((product) => {
          if (product._id === payload.id) return { ...product, ...payload };
          return product;
        })
    };
  default: return state;
  }
};

