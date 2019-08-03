import {
  ACTIVATE_PAYMENT_SUCCESS,
  ACTIVATE_PAYMENT_FAILED,
  GET_USER_PAYMENTS_METHODS,
  CONNECT_WITH_PAYPAL_SUCCESS
} from 'constantsTypes';


const initialState = {
  methods: [],
  errors: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_PAYMENTS_METHODS: return { methods: [...payload] };
    case ACTIVATE_PAYMENT_SUCCESS: return { ...state, [payload]: { isActive: true } };
    case CONNECT_WITH_PAYPAL_SUCCESS: return {
      ...state,
      methods: [
        ...state.methods,
        { name: 'Paypal', handler: payload.cred }
      ]
    }
    case ACTIVATE_PAYMENT_FAILED: return { ...state, [payload.type]: { error: payload.message } };
    default: return state;
  }
};
