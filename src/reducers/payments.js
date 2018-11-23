import {
  ACTIVAT_PAYMENT_SUCCESS, ACTIVAT_PAYMENT_FAILD, GET_USER_PAYMENTS_METHODS
} from 'constantsTypes';


const initialState = {
  methods: [],
  errors: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_USER_PAYMENTS_METHODS: return { methods: payload };
  case ACTIVAT_PAYMENT_SUCCESS: return { ...state, [payload]: { isActive: true } };
  case ACTIVAT_PAYMENT_FAILD: return { ...state, [payload.type]: { error: payload.message } };
  default: return state;
  }
};
