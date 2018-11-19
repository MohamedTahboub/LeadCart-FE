import {
  PROMO_CODE_ACTIVATE,
  PROMO_CODE_ACTIVATE_SUCCESS,
  PROMO_CODE_ACTIVATE_FAILD
} from 'constantsTypes';


export const activatePromocode = (code) => ({
  type: PROMO_CODE_ACTIVATE,
  payload: code
});
export const activatePromocodeSuccess = (code) => ({
  type: PROMO_CODE_ACTIVATE_SUCCESS,
  payload: code
});
export const activatePromocodeFaild = (message) => ({
  type: PROMO_CODE_ACTIVATE_FAILD,
  payload: message
});
