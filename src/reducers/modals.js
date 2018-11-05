import { TOGGLE_CREATE_PRODUCT_MODALE } from 'constantsTypes';


const initialState = {
  product: {
    isVisable: false
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case TOGGLE_CREATE_PRODUCT_MODALE: return { ...state, product: { ...state.product, isVisable: !state.product.isVisable } };
  default: return state;
  }
};
