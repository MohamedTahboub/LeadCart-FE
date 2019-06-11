import {
  CREATE_NEW_COUPON_SUCCESS,
  CREATE_NEW_COUPON_FAILED,
  GET_COUPONS_LIST,
  CHANGE_COUPON_STATE_SUCCESS,
  CHANGE_COUPON_STATE_FAILED,
  RESET_COUPON_MODALE,
  DELETE_COUPON_SUCCESS,
  DELETE_COUPON_FAILED,
  EDIT_COUPON_SUCCESS
} from 'constantsTypes';

const initailState = {
  created: false,
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
      created: true,
      coupons: [
        ...state.coupons,
        payload
      ]
    };
  case CHANGE_COUPON_STATE_SUCCESS:
    return {
      ...state,
      coupons: state.coupons.map((c) => (c._id === payload.couponId ? { ...c, active: payload.active } : c))
    };

  case CHANGE_COUPON_STATE_FAILED:
    return {
      ...state,
      errors: typeof payload === 'object' ? payload : {
        message: payload.includes('E11000') ? 'This coupon code already exist, try another' : payload
      }
    };
  case EDIT_COUPON_SUCCESS:
    console.log('payload', payload);
    return {
      ...state,
      coupons: state.coupons.map((c) => (c._id === payload.couponId ? { ...c, ...payload.details } : c))
    };
  case CREATE_NEW_COUPON_FAILED:
    return {
      ...state,
      errors: typeof payload === 'object' ? payload : {
        message: payload.includes('E11000') ? 'This coupon code already exist, try another' : payload
      }
    };
  case RESET_COUPON_MODALE:
    return {
      ...initailState,
      coupons: state.coupons
    };
  case DELETE_COUPON_SUCCESS:
    return {
      ...state,
      coupons: state.coupons.filter(({ _id }) => _id !== payload.couponId)
    };
  default: return state;
  }
};
