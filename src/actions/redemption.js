import {
  REDEEM_PROMO_CODE,
  REDEEM_PROMO_CODE_FAILED,
  REDEEM_PROMO_CODE_SUCCESS
} from '../constantsTypes';


export const redeemPromoCode = (code, meta) => ({
  type: REDEEM_PROMO_CODE,
  payload: code,
  meta
});

export const redeemPromoCodeSuccess = (promoCode) => ({
  type: REDEEM_PROMO_CODE_SUCCESS,
  payload: promoCode
});

export const redeemPromoCodeFailed = (message) => ({
  type: REDEEM_PROMO_CODE_FAILED,
  payload: message
});

