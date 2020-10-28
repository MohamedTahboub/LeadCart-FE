import {
  DELETE_TAX,
  DELETE_TAX_FAILED,
  DELETE_TAX_SUCCESS
} from '../constantsTypes';


export const deleteTax = (code, meta) => ({
  type: DELETE_TAX,
  payload: code,
  meta
});

export const deleteTaxSuccess = (promoCode) => ({
  type: DELETE_TAX_SUCCESS,
  payload: promoCode
});

export const deleteTaxFailed = (message) => ({
  type: DELETE_TAX_FAILED,
  payload: message
});

