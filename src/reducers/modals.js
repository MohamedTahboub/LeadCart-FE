import { TOGGLE_CREATE_PRODUCT_MODALE } from 'constantsTypes';


const initialState = {
  product: {
    isVisible: false
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case TOGGLE_CREATE_PRODUCT_MODALE: return { ...state, product: { ...state.product, isVisible: !state.product.isVisible } };
  default: return state;
  }
};
