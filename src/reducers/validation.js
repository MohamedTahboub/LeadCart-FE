import {
  NEW_PRODUCT_INVALID_FORM,
  SIGN_UP_INVALID_FIELDS,
  LOGIN_INVALID_FIELDS,
  PRODUCT_CREATION_FAILD
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
    case PRODUCT_CREATION_FAILD:
      return {
        ...state,
        newProduct: typeof payload === 'object' ? payload : { message: payload }
      };
    default: return initialState;
  }
};
