import {
  CREATE_NEW_COUPON,
  CREATE_NEW_COUPON_SUCCESS,
  CREATE_NEW_COUPON_FAILED,
  GET_COUPONS_LIST,
  CHANGE_COUPON_STATE,
  CHANGE_COUPON_STATE_SUCCESS,
  CHANGE_COUPON_STATE_FAILED,
  RESET_COUPON_MODALE
} from 'constantsTypes';

export const getCouponsList = (coupon) => ({
  type: GET_COUPONS_LIST,
  payload: coupon
});
export const createNewCoupon = (coupon) => ({
  type: CREATE_NEW_COUPON,
  payload: coupon
});
export const createNewCouponSuccess = (coupon) => ({
  type: CREATE_NEW_COUPON_SUCCESS,
  payload: coupon
});
export const createNewCouponFailed = (coupon) => ({
  type: CREATE_NEW_COUPON_FAILED,
  payload: coupon
});

export const changeCouponState = (coupon) => ({
  type: CHANGE_COUPON_STATE,
  payload: coupon
});
export const changeCouponStateSuccess = (coupon) => ({
  type: CHANGE_COUPON_STATE_SUCCESS,
  payload: coupon
});
export const changeCouponStateFailed = (coupon) => ({
  type: CHANGE_COUPON_STATE_FAILED,
  payload: coupon
});


export const resetCouponModale = () => ({
  type: RESET_COUPON_MODALE
});

