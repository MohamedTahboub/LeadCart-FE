import {
  NEW_PRODUCT_INVALID_FORM,
  SIGN_UP_INVALID_FIELDS,
  LOGIN_INVALID_FIELDS,
  PRODUCT_CREATION_FAILED
} from 'constantsTypes';

const initialState = {
  newProduct: {},
  signup: {},
  login: {}
  // whatever state a user holds
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_UP_INVALID_FIELDS: return { ...state, signup: payload };
    case LOGIN_INVALID_FIELDS: return { ...state, login: payload };
    case NEW_PRODUCT_INVALID_FORM:
      return {
        ...state,
        newProduct: typeof payload === 'object' ? payload : { message: payload }
      };
    case PRODUCT_CREATION_FAILED:
      if (typeof payload !== 'object' && payload.includes('$url_1'))
        payload = 'The product URL already exist, it should be unique'
      return {
        ...state,
        newProduct: typeof payload === 'object' ? payload : { message: payload }
      };
    default: return initialState;
  }
};
