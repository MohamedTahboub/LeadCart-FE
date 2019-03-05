import {
  ENABLE_EMAIL_FOOTER,
  ENABLE_EMAIL_FOOTER_SUCCESS,
  ENABLE_EMAIL_FOOTER_FAILED,
  ADD_EMAIL_SOURCE,
  ADD_EMAIL_SOURCE_SUCCESS,
  ADD_EMAIL_SOURCE_FAILED,
} from 'constantsTypes';


export const enableEmailFooter = (details) => ({
  type: ENABLE_EMAIL_FOOTER,
  payload: details
});
export const enableEmailFooterSuccess = (details) => ({
  type: ENABLE_EMAIL_FOOTER_SUCCESS,
  payload: details
});
export const enableEmailFooterFailed = (details) => ({
  type: ENABLE_EMAIL_FOOTER_FAILED,
  payload: details
});

export const addEmailSource = (email) => ({
  type: ADD_EMAIL_SOURCE,
  payload: email
});
export const addEmailSourceSuccess = (email) => ({
  type: ADD_EMAIL_SOURCE_SUCCESS,
  payload: email
});
export const addEmailSourceFailed = (message) => ({
  type: ADD_EMAIL_SOURCE_FAILED,
  payload: message
});

