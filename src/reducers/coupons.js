import {
  CREATE_NEW_COUPON_SUCCESS,
  CREATE_NEW_COUPON_FAILD,
  GET_COUPONS_LIST
} from 'constantsTypes';

const initailState = {
  coupons: [],
  errors: {}
};

export default (state = initailState, { type, payload }) => {
  switch (type) {
  case GET_COUPONS_LIST:
    return {
      ...state,
      coupons: payload
    };
  case CREATE_NEW_COUPON_SUCCESS:
    return {
      ...state,
      coupons: [
        ...state.coupons,
        payload
      ]
    };
  case CREATE_NEW_COUPON_FAILD:
    return {
      ...state,
      errors: typeof payload === 'object' ? payload : { message: payload }
    };
  default: return state;
  }
};
