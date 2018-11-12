import {
  ACTIVAT_PAYMENT_SUCCESS, ACTIVAT_PAYMENT_FAILD
} from 'constantsTypes';


const initialState = {
  stripe: {
    isActive: false
  },
  paypal: {
    isActive: false
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case ACTIVAT_PAYMENT_SUCCESS: return { ...state, [payload]: { isActive: true } };
  case ACTIVAT_PAYMENT_FAILD: return { ...state, [payload.type]: { error: payload.message } };
  default: return state;
  }
};
