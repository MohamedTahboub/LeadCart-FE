import {
  PROMO_CODE_ACTIVATE,
  ACTIVATE_AGENCY_CODE,
  ACTIVATE_AGENCY_CODE_SUCCESS,
  ACTIVATE_AGENCY_CODE_FAILD
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
export const activateAgencyCodeFaild = (message) => ({
  type: ACTIVATE_AGENCY_CODE_FAILD,
  payload: message
});
