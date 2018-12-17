import {
  CREATE_NEW_COUPON_SUCCESS,
  CREATE_NEW_COUPON_FAILD,
  GET_COUPONS_LIST,
  CHANGE_COUPON_STATE_SUCCESS,
  CHANGE_COUPON_STATE_FAILD,
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
  case CHANGE_COUPON_STATE_SUCCESS:
    const r = {
      ...state,
      coupons: state.coupons.map((c) => (c._id === payload.couponId ? { ...c, active: payload.active } : c))
    };

    console.log(r);
    return r;
  case CHANGE_COUPON_STATE_FAILD:
    return {
      ...state,
      errors: typeof payload === 'object' ? payload : { message: payload }
    };
  case CREATE_NEW_COUPON_FAILD:
    return {
      ...state,
      errors: typeof payload === 'object' ? payload : { message: payload }
    };
  default: return state;
  }
};
