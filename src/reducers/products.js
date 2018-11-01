import { GET_USER_PRODUCTS } from 'constantsTypes';


const initialState = {
  products: [],
  errors: ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_USER_PRODUCTS: return { ...state, products: payload };
  default: return state;
  }
};

