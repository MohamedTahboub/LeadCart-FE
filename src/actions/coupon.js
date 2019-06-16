import {
  CREATE_NEW_COUPON,
  CREATE_NEW_COUPON_SUCCESS,
  CREATE_NEW_COUPON_FAILED,
  GET_COUPONS_LIST,
  CHANGE_COUPON_STATE,
  CHANGE_COUPON_STATE_SUCCESS,
  CHANGE_COUPON_STATE_FAILED,
  RESET_COUPON_MODALE,
  DELETE_COUPON,
  DELETE_COUPON_SUCCESS,
  DELETE_COUPON_FAILED,
  EDIT_COUPON,
  EDIT_COUPON_SUCCESS,
  EDIT_COUPON_FAILED
} from 'constantsTypes';

export const getCouponsList = (coupon) => ({
  type: GET_COUPONS_LIST,
  payload: coupon
});

export const createNewCoupon = (coupon, meta) => ({
  type: CREATE_NEW_COUPON,
  payload: coupon,
  meta
});
export const createNewCouponSuccess = (coupon) => ({
  type: CREATE_NEW_COUPON_SUCCESS,
  payload: coupon
});
export const createNewCouponFailed = (coupon) => ({
  type: CREATE_NEW_COUPON_FAILED,
  payload: coupon
});


export const editCoupon = (coupon, meta) => ({
  type: EDIT_COUPON,
  payload: coupon,
  meta
});
export const editCouponSuccess = (coupon) => ({
  type: EDIT_COUPON_SUCCESS,
  payload: coupon
});
export const editCouponFailed = (message) => ({
  type: EDIT_COUPON_FAILED,
  payload: message
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


export const deleteCoupon = (id, meta) => ({
  type: DELETE_COUPON,
  payload: id,
  meta
});
export const deleteCouponSuccess = (coupon) => ({
  type: DELETE_COUPON_SUCCESS,
  payload: coupon
});
export const deleteCouponFailed = (message) => ({
  type: DELETE_COUPON_FAILED,
  payload: message
});

