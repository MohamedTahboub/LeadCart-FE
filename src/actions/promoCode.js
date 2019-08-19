import {
  PROMO_CODE_ACTIVATE,
  ACTIVATE_AGENCY_CODE,
  ACTIVATE_AGENCY_CODE_SUCCESS,
  ACTIVATE_AGENCY_CODE_FAILED,
  GET_ACTIVATED_AGENCY_CODES_NUMBERS,
  CHECK_PROMO_CODE,
  CHECK_PROMO_CODE_SUCCESS,
  CHECK_PROMO_CODE_FAILED
} from '../constantsTypes';


export const activatePromoCode = (code) => ({
  type: PROMO_CODE_ACTIVATE,
  payload: code
});

export const activateAgencyCode = (code) => ({
  type: ACTIVATE_AGENCY_CODE,
  payload: code
});

export const activateAgencyCodeSuccess = (message) => ({
  type: ACTIVATE_AGENCY_CODE_SUCCESS,
  payload: message
});

export const activateAgencyCodeFailed = (message) => ({
  type: ACTIVATE_AGENCY_CODE_FAILED,
  payload: message
});

export const getActivatedPromoCodesNumber = (codes) => ({
  type: GET_ACTIVATED_AGENCY_CODES_NUMBERS,
  payload: codes
});


export const checkPromoCode = (promoCode, meta) => ({
  type: CHECK_PROMO_CODE,
  payload: promoCode,
  meta
});
export const checkPromoCodeSuccess = (promoCode) => ({
  type: CHECK_PROMO_CODE_SUCCESS,
  payload: promoCode
});
export const checkPromoCodeFailed = (message) => ({
  type: CHECK_PROMO_CODE_FAILED,
  payload: message
});

