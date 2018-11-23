import {
  CREATE_NEW_COUPON,
  CREATE_NEW_COUPON_SUCCESS,
  CREATE_NEW_COUPON_FAILD,
  GET_COUPONS_LIST
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
export const createNewCouponFaild = (coupon) => ({
  type: CREATE_NEW_COUPON_FAILD,
  payload: coupon
});
