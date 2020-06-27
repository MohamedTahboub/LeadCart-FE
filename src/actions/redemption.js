import {
  CHECK_REDEEM_FAILED,
  CHECK_REDEEM_SUCCESS,
  REDEEM_PROMO_CODE
} from '../constantsTypes';


export const redeemPromoCode = (code, meta) => ({
  type: REDEEM_PROMO_CODE,
  payload: code,
  meta
});

export const checkRedeemSuccess = (promoCode) => ({
  type: CHECK_REDEEM_SUCCESS,
  payload: promoCode
});

export const checkRedeemFailed = (message) => ({
  type: CHECK_REDEEM_FAILED,
  payload: message
});

