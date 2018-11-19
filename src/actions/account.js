import {
  CHANGE_ACCOUNT_DETAILS,
  CHANGE_ACCOUNT_DETAILS_SUCCESS,
  CHANGE_ACCOUNT_DETAILS_FAILD,
  CHANGE_ACCOUNT_PASSWORD,
  CHANGE_ACCOUNT_PASSWORD_SUCCESS,
  CHANGE_ACCOUNT_PASSWORD_FAILD,
} from 'constantsTypes';


export const onChangeAccountDetails = (details) => ({
  type: CHANGE_ACCOUNT_DETAILS,
  payload: details
});
export const onChangeAccountDetailsSuccess = (message) => ({
  type: CHANGE_ACCOUNT_DETAILS_SUCCESS,
  payload: message
});
export const onChangeAccountDetailsFaild = (message) => ({
  type: CHANGE_ACCOUNT_DETAILS_FAILD,
  payload: message
});


export const onChangeAccounPassword = (pwds) => ({
  type: CHANGE_ACCOUNT_PASSWORD,
  payload: pwds
});

export const onChangeAccounPasswordSuccess = (message) => ({
  type: CHANGE_ACCOUNT_PASSWORD_SUCCESS,
  payload: message
});

export const onChangeAccounPasswordFaild = (message) => ({
  type: CHANGE_ACCOUNT_PASSWORD_FAILD,
  payload: message
});
